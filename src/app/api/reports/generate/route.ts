// src/app/api/reports/generate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { ReportGenerator } from '@/lib/report-generator';
import { PrismaClient } from '@prisma/client';
import { ReportParams } from '@/types';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params: ReportParams = body;

    // Validate required fields
    if (!params.businessName || !params.address || !params.industry || !params.keywords?.length) {
      return NextResponse.json(
        { error: 'Missing required fields: businessName, address, industry, keywords' },
        { status: 400 }
      );
    }

    // Check API key
    const serpApiKey = process.env.SERPAPI_KEY;
    if (!serpApiKey) {
      return NextResponse.json(
        { error: 'SerpAPI key not configured' },
        { status: 500 }
      );
    }

    console.log(`🚀 Starting report generation for ${params.businessName}`);

    // Initialize report generator
    const reportGenerator = new ReportGenerator(serpApiKey);

    // Generate the report
    const reportData = await reportGenerator.generateReport(params);

    // Find or create business
    let business = await prisma.business.findFirst({
      where: {
        name: params.businessName,
        address: params.address
      }
    });

    if (!business) {
      business = await prisma.business.create({
        data: {
          name: params.businessName,
          address: params.address,
          phone: params.phone || '',
          website: params.website || '',
          latitude: reportData.businessInfo.latitude,
          longitude: reportData.businessInfo.longitude,
          industry: params.industry,
          keywords: params.keywords
        }
      });
    }

    // Save report to database
    const report = await prisma.report.create({
      data: {
        businessId: business.id,
        reportData: reportData as any,
        searchCost: reportData.searchCost,
        totalSearches: 8, // 2 keywords × 4 grid points
        visibilityScore: (reportData.geographicData.clientVisibleZones / reportData.geographicData.totalZones) * 100,
        marketCoverage: reportData.geographicData.clientVisibleZones,
        revenueImpact: reportData.revenueImpact.monthlyLostRevenue,
        competitorCount: reportData.competitorAnalysis.length
      }
    });

    // Save competitors
    for (const competitor of reportData.competitorAnalysis) {
      await prisma.competitor.create({
        data: {
          reportId: report.id,
          name: competitor.name,
          phone: competitor.phone || '',
          address: competitor.address || '',
          rating: competitor.rating,
          reviews: competitor.reviews,
          rank: 1, // Will be updated with actual rank
          marketShare: competitor.dominanceScore,
          revenue: competitor.totalRevenue,
          website: '',
          zone: competitor.geographicCoverage.join(','),
          dominanceScore: competitor.dominanceScore,
          estimatedCalls: competitor.estimatedDailyCalls,
          geographicCoverage: competitor.geographicCoverage
        }
      });
    }

    // Track cost
    await prisma.costTracking.create({
      data: {
        totalSearches: 8,
        totalCost: reportData.searchCost,
        reportsGenerated: 1,
        avgCostPerReport: reportData.searchCost,
        budgetUsed: reportData.searchCost
      }
    });

    console.log(`✅ Report saved with ID: ${report.id}`);

    return NextResponse.json({
      success: true,
      reportId: report.id,
      cost: reportData.searchCost,
      competitorsFound: reportData.competitorAnalysis.length,
      visibilityScore: reportData.geographicData.clientVisibleZones / reportData.geographicData.totalZones * 100,
      monthlyRevenueImpact: reportData.revenueImpact.monthlyLostRevenue
    });

  } catch (error) {
    console.error('Report generation failed:', error);
    
    return NextResponse.json(
      { 
        error: 'Report generation failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const reportId = url.searchParams.get('id');

    if (!reportId) {
      // Return list of recent reports
      const reports = await prisma.report.findMany({
        include: {
          business: true,
          competitors: {
            take: 5,
            orderBy: {
              dominanceScore: 'desc'
            }
          }
        },
        orderBy: {
          generatedAt: 'desc'
        },
        take: 20
      });

      return NextResponse.json({ reports });
    }

    // Return specific report
    const report = await prisma.report.findUnique({
      where: { id: reportId },
      include: {
        business: true,
        competitors: {
          orderBy: {
            dominanceScore: 'desc'
          }
        }
      }
    });

    if (!report) {
      return NextResponse.json(
        { error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ report });

  } catch (error) {
    console.error('Failed to fetch report:', error);
    return NextResponse.json(
      { error: 'Failed to fetch report' },
      { status: 500 }
    );
  }
}
