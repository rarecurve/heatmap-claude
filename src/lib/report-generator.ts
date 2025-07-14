// src/lib/report-generator.ts

import { 
  ReportParams, 
  ReportData, 
  CompetitorResult, 
  CompetitorAnalysis, 
  GeographicAnalysis,
  GridZoneData,
  RevenueImpact,
  PsychologicalInsight,
  MarketData,
  BusinessInfo
} from '@/types';
import { SerpAPIService, GridCalculator } from './serpapi';

export class ReportGenerator {
  private serpApi: SerpAPIService;

  constructor(apiKey: string) {
    this.serpApi = new SerpAPIService(apiKey);
  }

  async generateReport(params: ReportParams): Promise<ReportData> {
    console.log(`🚀 Generating report for ${params.businessName}`);
    
    try {
      // 1. Geocode the business address to get coordinates
      const coordinates = await this.geocodeAddress(params.address);
      
      // 2. Generate 2x2 grid points for geographic analysis
      const gridPoints = GridCalculator.generateGridPoints(
        coordinates.lat, 
        coordinates.lng, 
        params.radius || 10
      );

      // 3. Generate search queries (2 keywords × 4 grid points = 8 searches)
      const searchQueries = GridCalculator.generateLocationQueries(
        params.keywords[0], // Use primary keyword
        params.address
      );

      // 4. Execute searches across all grid points
      const allCompetitors: CompetitorResult[] = [];
      let totalSearchCost = 0;

      for (const gridPoint of gridPoints) {
        for (const query of searchQueries) {
          try {
            const competitors = await this.serpApi.searchLocalBusinesses({
              keyword: query,
              location: params.address,
              gridPoint
            });
            
            allCompetitors.push(...competitors);
            totalSearchCost += 0.01; // $0.01 per search
            
            console.log(`✅ Search completed: ${query} in ${gridPoint.zone}`);
          } catch (error) {
            console.error(`❌ Search failed: ${query} in ${gridPoint.zone}`, error);
          }
        }
      }

      // 5. Process and analyze competitor data
      const competitorAnalysis = this.analyzeCompetitors(allCompetitors, params.businessName);
      
      // 6. Generate geographic analysis
      const geographicData = this.analyzeGeographicCoverage(allCompetitors, gridPoints, params.businessName);
      
      // 7. Calculate revenue impact
      const marketData: MarketData = {
        dailySearchVolume: 1247, // Default for HVAC - should be dynamic
        averageServiceValue: 650,
        conversionRate: 0.15,
        marketSize: 500000
      };
      
      const revenueImpact = this.calculateRevenueImpact(
        competitorAnalysis,
        geographicData,
        marketData
      );

      // 8. Generate psychological insights
      const psychologicalInsights = this.generatePsychologicalInsights(
        competitorAnalysis,
        revenueImpact,
        geographicData
      );

      // 9. Compile final report
      const businessInfo: BusinessInfo = {
        name: params.businessName,
        address: params.address,
        phone: params.phone,
        website: params.website,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        industry: params.industry,
        keywords: params.keywords
      };

      const reportData: ReportData = {
        businessInfo,
        competitorAnalysis,
        geographicData,
        revenueImpact,
        psychologicalInsights,
        marketData,
        generatedAt: new Date(),
        searchCost: totalSearchCost
      };

      console.log(`🎉 Report generated! Cost: $${totalSearchCost.toFixed(2)}`);
      return reportData;

    } catch (error) {
      console.error('Report generation failed:', error);
      throw error;
    }
  }

  private async geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    // Simple geocoding - in production, use Google Geocoding API
    // For now, return Phoenix coordinates as default
    return {
      lat: 33.4484,
      lng: -112.0740
    };
  }

  private analyzeCompetitors(
    allCompetitors: CompetitorResult[], 
    clientBusinessName: string
  ): CompetitorAnalysis[] {
    // Group competitors by name and analyze their market presence
    const competitorMap = new Map<string, CompetitorResult[]>();
    
    allCompetitors.forEach(competitor => {
      if (competitor.name.toLowerCase() !== clientBusinessName.toLowerCase()) {
        const existing = competitorMap.get(competitor.name) || [];
        existing.push(competitor);
        competitorMap.set(competitor.name, existing);
      }
    });

    const analysis: CompetitorAnalysis[] = [];

    competitorMap.forEach((results, name) => {
      const zones = results.map(r => r.zone);
      const avgRank = results.reduce((sum, r) => sum + r.rank, 0) / results.length;
      const bestResult = results[0]; // Take first result for main data

      const competitorAnalysis: CompetitorAnalysis = {
        name,
        phone: bestResult.phone,
        address: bestResult.address,
        rating: bestResult.rating,
        reviews: bestResult.reviews,
        dominanceScore: (zones.length / 4) * 100, // Percentage of zones dominated
        marketPresence: zones.length,
        estimatedDailyCalls: this.calculateDailyCalls(avgRank, zones.length),
        reviewAdvantage: false, // Will be calculated later
        geographicCoverage: zones,
        totalRevenue: 0 // Will be calculated later
      };

      analysis.push(competitorAnalysis);
    });

    // Sort by dominance score
    analysis.sort((a, b) => b.dominanceScore - a.dominanceScore);

    // Calculate revenue for each competitor
    analysis.forEach(competitor => {
      competitor.totalRevenue = competitor.estimatedDailyCalls * 650 * 30; // Daily calls × avg service × 30 days
    });

    return analysis.slice(0, 10); // Top 10 competitors
  }

  private calculateDailyCalls(avgRank: number, zoneCount: number): number {
    // Algorithm to estimate daily calls based on rank and zone coverage
    let callsPerZone = 0;
    
    if (avgRank <= 1) callsPerZone = 15;
    else if (avgRank <= 2) callsPerZone = 8;
    else if (avgRank <= 3) callsPerZone = 4;
    else callsPerZone = 2;

    return Math.round(callsPerZone * zoneCount);
  }

  private analyzeGeographicCoverage(
    allCompetitors: CompetitorResult[],
    gridPoints: import('@/types').GridPoint[],
    clientBusinessName: string
  ): GeographicAnalysis {
    const gridData: GridZoneData[] = [];
    let clientVisibleZones = 0;
    let competitorDominatedZones = 0;
    let opportunityZones = 0;

    gridPoints.forEach((point, index) => {
      const zoneCompetitors = allCompetitors.filter(c => c.zone === point.zone);
      const clientInZone = zoneCompetitors.find(c => 
        c.name.toLowerCase() === clientBusinessName.toLowerCase()
      );
      
      let status: 'client' | 'competitor' | 'opportunity' | 'empty' = 'empty';
      let topCompetitor: string | undefined;
      let clientRank: number | undefined;

      if (zoneCompetitors.length > 0) {
        const topResult = zoneCompetitors[0];
        
        if (clientInZone) {
          status = 'client';
          clientRank = clientInZone.rank;
          clientVisibleZones++;
        } else {
          status = 'competitor';
          topCompetitor = topResult.name;
          competitorDominatedZones++;
        }
      } else {
        status = 'opportunity';
        opportunityZones++;
      }

      gridData.push({
        zone: point.zone,
        position: { 
          row: index < 2 ? 0 : 1, 
          col: index % 2 
        },
        status,
        topCompetitor,
        clientRank,
        competitorRank: zoneCompetitors.length > 0 ? zoneCompetitors[0].rank : undefined
      });
    });

    return {
      totalZones: gridPoints.length,
      clientVisibleZones,
      competitorDominatedZones,
      opportunityZones,
      gridData
    };
  }

  private calculateRevenueImpact(
    competitors: CompetitorAnalysis[],
    geographicData: GeographicAnalysis,
    marketData: MarketData
