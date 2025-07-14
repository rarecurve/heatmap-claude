// src/components/reports/CompetitorCard.tsx

import { CompetitorAnalysis } from '@/types';

interface CompetitorCardProps {
  competitor: CompetitorAnalysis;
  showRevenue?: boolean;
  highlightCalls?: boolean;
}

export default function CompetitorCard({ 
  competitor, 
  showRevenue = true, 
  highlightCalls = true 
}: CompetitorCardProps) {
  const initial = competitor.name.charAt(0).toUpperCase();
  const marketPresencePercentage = (competitor.marketPresence / 4) * 100;

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-lg hover:border-gray-300">
      {/* Header with competitor info */}
      <div className="flex items-center mb-4">
        <div 
          className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium text-lg mr-4"
          style={{ backgroundColor: '#4285f4' }}
        >
          {initial}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {competitor.name}
          </h3>
          {competitor.phone && (
            <a 
              href={`tel:${competitor.phone}`}
              className="text-blue-600 text-sm hover:underline"
              style={{ color: '#1a73e8' }}
            >
              {competitor.phone}
            </a>
          )}
        </div>
      </div>

      {/* Market presence visualization */}
      <div className="mb-3">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-600">Market presence</span>
          <span className="font-medium text-gray-900">
            {competitor.marketPresence} of 4 zones
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full transition-all duration-800 ease-out"
            style={{ 
              width: `${marketPresencePercentage}%`,
              backgroundColor: '#4285f4'
            }}
          />
        </div>
      </div>

      {/* Rating */}
      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="text-gray-600">Average rating</span>
        <span className="font-medium text-gray-900">
          {competitor.rating}/5 ({competitor.reviews} reviews)
        </span>
      </div>

      {/* Daily calls - PSYCHOLOGICAL IMPACT */}
      {highlightCalls && (
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="text-gray-600">Estimated daily calls</span>
          <span className="font-medium text-red-600 text-base">
            {competitor.estimatedDailyCalls} calls
          </span>
        </div>
      )}

      {/* Revenue impact - HOLY SHIT MOMENT */}
      {showRevenue && competitor.totalRevenue > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-800 font-medium">
            Monthly Revenue Capture
          </div>
          <div className="text-lg font-bold text-red-900">
            ${Math.round(competitor.totalRevenue).toLocaleString()}
          </div>
          <div className="text-xs text-red-700 mt-1">
            Revenue this competitor is taking from your market
          </div>
        </div>
      )}

      {/* Geographic coverage */}
      {competitor.geographicCoverage.length > 0 && (
        <div className="mt-3 text-xs text-gray-500">
          <span className="font-medium">Dominates:</span>{' '}
          {competitor.geographicCoverage.join(', ')} zones
        </div>
      )}
    </div>
  );
}
