// src/lib/serpapi.ts - FIXED VERSION

import { SearchParams, CompetitorResult, SerpApiResponse, SearchResult } from '@/types';

export class SerpAPIService {
  private apiKey: string;
  private baseUrl = 'https://serpapi.com/search';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchLocalBusinesses(params: SearchParams): Promise<CompetitorResult[]> {
    try {
      const searchUrl = new URL(this.baseUrl);
      searchUrl.searchParams.append('api_key', this.apiKey);
      searchUrl.searchParams.append('engine', 'google');
      searchUrl.searchParams.append('q', params.keyword);
      searchUrl.searchParams.append('location', params.location);
      searchUrl.searchParams.append('ll', `@${params.gridPoint.lat},${params.gridPoint.lng},15.1z`);
      searchUrl.searchParams.append('type', 'search');
      searchUrl.searchParams.append('num', '10');
      searchUrl.searchParams.append('hl', 'en');
      searchUrl.searchParams.append('gl', 'us');

      console.log(`🔍 Searching: ${params.keyword} at ${params.gridPoint.zone}`);
      
      const response = await fetch(searchUrl.toString());
      
      if (!response.ok) {
        throw new Error(`SerpAPI request failed: ${response.status} ${response.statusText}`);
      }

      const data: any = await response.json();
      
      // Extract competitors from local results - FIXED STRUCTURE
      const competitors: CompetitorResult[] = [];
      
      // Handle the correct SerpAPI structure: local_results.places[]
      if (data.local_results && data.local_results.places) {
        data.local_results.places.forEach((result: any, index: number) => {
          competitors.push({
            name: result.title || 'Unknown Business',
            phone: result.phone || '',
            address: result.address || '',
            rating: result.rating || 0,
            reviews: result.reviews || 0,
            rank: result.position || (index + 1),
            website: result.website,
            place_id: result.place_id,
            zone: params.gridPoint.zone
          });
        });
      }

      // Also check organic results for additional competitors
      if (data.organic_results) {
        data.organic_results.slice(0, 5).forEach((result: any, index: number) => {
          if (result.title && !competitors.find(c => c.name === result.title)) {
            competitors.push({
              name: result.title,
              phone: '',
              address: '',
              rating: result.rating || 0,
              reviews: result.reviews || 0,
              rank: competitors.length + 1,
              website: result.link,
              zone: params.gridPoint.zone
            });
          }
        });
      }

      console.log(`✅ Found ${competitors.length} competitors in ${params.gridPoint.zone}`);
      return competitors;

    } catch (error) {
      console.error('SerpAPI search failed:', error);
      throw error;
    }
  }

  async getBusinessDetails(businessName: string, location: string): Promise<any> {
    try {
      const searchUrl = new URL(this.baseUrl);
      searchUrl.searchParams.append('api_key', this.apiKey);
      searchUrl.searchParams.append('engine', 'google');
      searchUrl.searchParams.append('q', `${businessName} ${location}`);
      searchUrl.searchParams.append('location', location);
      searchUrl.searchParams.append('hl', 'en');
      searchUrl.searchParams.append('gl', 'us');

      const response = await fetch(searchUrl.toString());
      
      if (!response.ok) {
        throw new Error(`SerpAPI request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to get business details:', error);
      throw error;
    }
  }

  async batchSearch(searches: SearchParams[]): Promise<CompetitorResult[]> {
    const allCompetitors: CompetitorResult[] = [];
    
    // Process searches with delay to respect rate limits
    for (const search of searches) {
      try {
        const competitors = await this.searchLocalBusinesses(search);
        allCompetitors.push(...competitors);
        
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed search for ${search.keyword} at ${search.gridPoint.zone}:`, error);
      }
    }

    return allCompetitors;
  }

  calculateSearchCost(numberOfSearches: number): number {
    // SerpAPI costs approximately $0.01 per search
    return numberOfSearches * 0.01;
  }

  async validateApiKey(): Promise<boolean> {
    try {
      const testUrl = new URL(this.baseUrl);
      testUrl.searchParams.append('api_key', this.apiKey);
      testUrl.searchParams.append('engine', 'google');
      testUrl.searchParams.append('q', 'test');
      
      const response = await fetch(testUrl.toString());
      return response.ok;
    } catch {
      return false;
    }
  }
}

// Grid Calculator Utility (unchanged)
export class GridCalculator {
  static generateGridPoints(
    centerLat: number, 
    centerLng: number, 
    radiusKm: number = 10
  ): import('@/types').GridPoint[] {
    // Generate 2x2 grid points around the center location
    const latOffset = radiusKm / 111; // Rough km to degrees conversion
    const lngOffset = radiusKm / (111 * Math.cos(centerLat * Math.PI / 180));

    return [
      {
        lat: centerLat + latOffset,
        lng: centerLng - lngOffset,
        name: 'Northwest',
        zone: 'NW'
      },
      {
        lat: centerLat + latOffset,
        lng: centerLng + lngOffset,
        name: 'Northeast',
        zone: 'NE'
      },
      {
        lat: centerLat - latOffset,
        lng: centerLng - lngOffset,
        name: 'Southwest',
        zone: 'SW'
      },
      {
        lat: centerLat - latOffset,
        lng: centerLng + lngOffset,
        name: 'Southeast',
        zone: 'SE'
      }
    ];
  }

  static generateLocationQueries(baseKeyword: string, location: string): string[] {
    return [
      `${baseKeyword} near me`,
      `${baseKeyword} ${location}`
    ];
  }

  static calculateDistance(point1: import('@/types').GridPoint, point2: import('@/types').GridPoint): number {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
