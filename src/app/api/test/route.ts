// src/app/api/test/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({ 
    success: true,
    message: "🎉 RareCurve API is working perfectly!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    endpoints: {
      test: '/api/test',
      generateReport: '/api/reports/generate'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({ 
      success: true,
      message: "POST request received successfully",
      data: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Invalid JSON in request body",
      timestamp: new Date().toISOString()
    }, { status: 400 });
  }
}
