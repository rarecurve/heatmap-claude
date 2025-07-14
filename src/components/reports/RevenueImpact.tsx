// src/components/reports/RevenueImpact.tsx

import { RevenueImpact, GeographicAnalysis, MarketData } from '@/types';
import { useEffect, useState } from 'react';

interface RevenueImpactProps {
  revenueImpact: RevenueImpact;
  geographicData: GeographicAnalysis;
  marketData: MarketData;
  businessName: string;
}

export default function RevenueImpactComponent({ 
  revenueImpact, 
  geographicData,
  marketData,
  businessName 
}: RevenueImpactProps) {
  const [animatedRevenue, setAnimatedRevenue] = useState(0);
  const [animatedVisibility, setAnimatedVisibility] = useState(0);

  // Animate numbers on load
  useEffect(() => {
    const revenueTimer = setTimeout(() => {
      let current = 0;
      const target = revenueImpact.monthlyLostRevenue;
      const increment = target / 50;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedRevenue(Math.round(current));
      }, 30);
    }, 500);

    const visibilityTimer = setTimeout(() => {
      let current = 0;
      const target = (geographicData.clientVisibleZones / geographicData.totalZones) * 100;
      const increment = target / 30;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedVisibility(current);
      }, 50);
    }, 800);

    return () => {
      clearTimeout(revenueTimer);
      clearTimeout(visibilityTimer);
    };
  }, [revenueImpact.monthlyLostRevenue, geographicData]);

  const visibilityPercentage = (geographicData.clientVisibleZones / geographicData.totalZones) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Search Visibility - CRITICAL */}
      <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-red-500 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-4">
          Search Visibility
        </h3>
        <div className="text-3xl font-light mb-2 text-red-600">
          {Math.round(animatedVisibility)}%
        </div>
        <div className="text-sm text-gray-600 leading-relaxed">
          Percentage of local searches where your business appears in top 3 results
        </div>
      </div>

      {/* Market Coverage */}
      <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-yellow-500 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-4">
          Market Coverage
        </h3>
        <div className="text-3xl font-light mb-2 text-yellow-600">
          {geographicData.clientVisibleZones}/{geographicData.totalZones}
        </div>
        <div className="text-sm text-gray-600 leading-relaxed">
          Geographic areas with strong search presence
        </div>
      </div>

      {/* Daily Search Volume */}
      <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-blue-500 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-4">
          Daily Search Volume
        </h3>
        <div className="text-3xl font-light mb-2 text-gray-900">
          {marketData.dailySearchVolume.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 leading-relaxed">
          Average daily searches for services in your market area
        </div>
      </div>

      {/* Revenue Impact - HOLY SHIT MOMENT */}
      <div className="bg-white p-8 rounded-lg shadow-sm border-t-4 border-red-600 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-4">
          Monthly Revenue Impact
        </h3>
        <div className="text-3xl font-light mb-2 text-red-600">
          ${animatedRevenue.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600 leading-relaxed">
          Estimated monthly revenue opportunity from improved visibility
        </div>
      </div>

      {/* Detailed Revenue Breakdown */}
      <div className="md:col-span-2 lg:col-span-4 bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-lg font-medium text-red-800 mb-1">
              Daily Lost Revenue
            </div>
            <div className="text-2xl font-bold text-red-900">
              ${revenueImpact.dailyLostRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-red-700">
              Every single day
            </div>
          </div>
          
          <div>
            <div className="text-lg font-medium text-red-800 mb-1">
              Monthly Lost Revenue
            </div>
            <div className="text-2xl font-bold text-red-900">
              ${revenueImpact.monthlyLostRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-red-700">
              Captured by competitors
            </div>
          </div>
          
          <div>
            <div className="text-lg font-medium text-red-800 mb-1">
              Annual Impact
            </div>
            <div className="text-2xl font-bold text-red-900">
              ${revenueImpact.annualLostRevenue.toLocaleString()}
            </div>
            <div className="text-sm text-red-700">
              Total opportunity cost
            </div>
          </div>
        </div>

        {/* Psychological impact statement */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-red-300">
          <p className="text-red-900 font-medium text-center">
            💰 While you sleep, competitors are earning <span className="font-bold text-lg">${Math.round(revenueImpact.dailyLostRevenue)}</span> daily from searches that should find <span className="font-bold">{businessName}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
