// src/app/api/init-db/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Initializing database tables...');

    // This will create tables if they don't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "businesses" (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        phone TEXT,
        website TEXT,
        latitude DOUBLE PRECISION NOT NULL,
        longitude DOUBLE PRECISION NOT NULL,
        industry TEXT NOT NULL,
        keywords TEXT[],
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "reports" (
        id TEXT PRIMARY KEY,
        "businessId" TEXT NOT NULL,
        "reportData" JSONB NOT NULL,
        "htmlContent" TEXT,
        "pdfUrl" TEXT,
        "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "searchCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "totalSearches" INTEGER NOT NULL DEFAULT 0,
        "visibilityScore" DOUBLE PRECISION,
        "marketCoverage" DOUBLE PRECISION,
        "revenueImpact" DOUBLE PRECISION,
        "competitorCount" INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY ("businessId") REFERENCES "businesses"(id) ON DELETE CASCADE
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "competitors" (
        id TEXT PRIMARY KEY,
        "reportId" TEXT NOT NULL,
        name TEXT NOT NULL,
        phone TEXT,
        address TEXT,
        rating DOUBLE PRECISION NOT NULL DEFAULT 0,
        reviews INTEGER NOT NULL DEFAULT 0,
        rank INTEGER NOT NULL,
        "marketShare" DOUBLE PRECISION NOT NULL DEFAULT 0,
        revenue DOUBLE PRECISION NOT NULL DEFAULT 0,
        website TEXT,
        "placeId" TEXT,
        zone TEXT NOT NULL,
        "dominanceScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "estimatedCalls" INTEGER NOT NULL DEFAULT 0,
        "geographicCoverage" JSONB,
        FOREIGN KEY ("reportId") REFERENCES "reports"(id) ON DELETE CASCADE
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "search_logs" (
        id TEXT PRIMARY KEY,
        "reportId" TEXT,
        query TEXT NOT NULL,
        location TEXT NOT NULL,
        "gridPoint" JSONB NOT NULL,
        cost DOUBLE PRECISION NOT NULL,
        timestamp TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        results JSONB NOT NULL,
        success BOOLEAN NOT NULL DEFAULT true,
        "errorMsg" TEXT,
        FOREIGN KEY ("reportId") REFERENCES "reports"(id) ON DELETE SET NULL
      );
    `;

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "cost_tracking" (
        id TEXT PRIMARY KEY,
        date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "totalSearches" INTEGER NOT NULL DEFAULT 0,
        "totalCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "reportsGenerated" INTEGER NOT NULL DEFAULT 0,
        "avgCostPerReport" DOUBLE PRECISION NOT NULL DEFAULT 0,
        "dailyBudget" DOUBLE PRECISION NOT NULL DEFAULT 100,
        "budgetUsed" DOUBLE PRECISION NOT NULL DEFAULT 0
      );
    `;

    console.log('✅ Database tables created successfully!');

    return NextResponse.json({
      success: true,
      message: "Database tables created successfully!",
      tables: ["businesses", "reports", "competitors", "search_logs", "cost_tracking"]
    });

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return NextResponse.json({
      success: false,
      error: "Database initialization failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "POST to this endpoint to initialize database tables",
    usage: "POST /api/init-db"
  });
}
