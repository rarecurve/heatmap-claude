// src/components/reports/PsychologicalInsights.tsx

import { PsychologicalInsight } from '@/types';

interface PsychologicalInsightsProps {
  insights: PsychologicalInsight[];
  businessName: string;
}

export default function PsychologicalInsights({ insights, businessName }: PsychologicalInsightsProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'revenue_bleeding':
        return '💸';
      case 'call_hijacking':
        return '📞';
      case 'territory_loss':
        return '🗺️';
      case 'review_paradox':
        return '⭐';
      case 'customer_theft':
        return '👥';
      default:
        return '⚠️';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'border-red-500 bg-red-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getUrgencyTextColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'text-red-800';
      case 'medium':
        return 'text-yellow-800';
      case 'low':
        return 'text-blue-800';
      default:
        return 'text-gray-800';
    }
  };

  if (insights.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-medium text-gray-900 mb-4">
          Market Analysis Complete
        </h2>
        <p className="text-gray-600">
          No critical competitive threats detected in your market area.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
            ⚠️
          </div>
          <h2 className="text-xl font-medium text-gray-900">
            Critical Market Intelligence
          </h2>
        </div>
        <p className="text-gray-600 text-sm">
          Key competitive threats and revenue impact analysis for {businessName}
        </p>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${getUrgencyColor(insight.urgency)}`}
          >
            {/* Insight Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">
                  {getInsightIcon(insight.type)}
                </span>
                <div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full uppercase tracking-wide ${
                    insight.urgency === 'high' ? 'bg-red-200 text-red-800' :
                    insight.urgency === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                    'bg-blue-200 text-blue-800'
                  }`}>
                    {insight.urgency} Priority
                  </span>
                </div>
              </div>
            </div>

            {/* Headline - PSYCHOLOGICAL IMPACT */}
            <h3 className={`text-lg font-bold mb-3 leading-tight ${getUrgencyTextColor(insight.urgency)}`}>
              {insight.headline}
            </h3>

            {/* Description */}
            <p className={`text-sm mb-4 leading-relaxed ${getUrgencyTextColor(insight.urgency).replace('800', '700')}`}>
              {insight.description}
            </p>

            {/* Impact - THE MONEY SHOT */}
            <div className={`p-3 rounded-lg border ${
              insight.urgency === 'high' ? 'bg-red-100 border-red-300' :
              insight.urgency === 'medium' ? 'bg-yellow-100 border-yellow-300' :
              'bg-blue-100 border-blue-300'
            }`}>
              <div className="text-xs font-medium text-gray-600 uppercase tracking-wide mb-1">
                Revenue Impact
              </div>
              <div className={`font-bold text-lg ${getUrgencyTextColor(insight.urgency)}`}>
                {insight.impact}
              </div>
            </div>

            {/* Competitor specific data */}
            {insight.competitorName && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Primary Threat:</span>
                  <span className="font-medium text-gray-900">{insight.competitorName}</span>
                </div>
                {insight.callVolume && (
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Daily Calls:</span>
                    <span className="font-medium text-red-600">{insight.callVolume} calls/day</span>
                  </div>
                )}
                {insight.dollarAmount && (
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-gray-600">Monthly Loss:</span>
                    <span className="font-medium text-red-600">${insight.dollarAmount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to Action */}
      {insights.some(i => i.urgency === 'high') && (
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold mb-2">
                🚨 Immediate Action Required
              </h3>
              <p className="text-red-100 text-sm">
                High-priority competitive threats detected. Every day of delay costs you revenue.
              </p>
            </div>
            <div className="ml-6">
              <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                Get Strategy Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
