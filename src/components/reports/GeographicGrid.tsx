// src/components/reports/GeographicGrid.tsx

import { GeographicAnalysis, GridZoneData } from '@/types';

interface GeographicGridProps {
  geographicData: GeographicAnalysis;
  businessName: string;
}

export default function GeographicGrid({ geographicData, businessName }: GeographicGridProps) {
  const { gridData, totalZones, clientVisibleZones, competitorDominatedZones, opportunityZones } = geographicData;

  const getCellContent = (zone: GridZoneData) => {
    switch (zone.status) {
      case 'client':
        return (
          <>
            <div className="font-medium">Your business</div>
            <div className="text-xs">Rank #{zone.clientRank}</div>
          </>
        );
      case 'competitor':
        return (
          <>
            <div className="font-medium">{zone.topCompetitor}</div>
            <div className="text-xs">Rank #{zone.competitorRank || 1}</div>
          </>
        );
      case 'opportunity':
        return (
          <>
            <div className="font-medium">Market gap</div>
            <div className="text-xs">opportunity</div>
          </>
        );
      default:
        return (
          <>
            <div className="font-medium">No data</div>
            <div className="text-xs">available</div>
          </>
        );
    }
  };

  const getCellStyle = (status: string) => {
    const baseStyle = "aspect-square border border-gray-300 rounded flex flex-col items-center justify-center text-center p-2 text-xs font-medium transition-all duration-200 hover:shadow-md";
    
    switch (status) {
      case 'competitor':
        return `${baseStyle} bg-red-50 text-red-800 border-red-200 hover:bg-red-100`;
      case 'client':
        return `${baseStyle} bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100`;
      case 'opportunity':
        return `${baseStyle} bg-green-50 text-green-800 border-green-200 hover:bg-green-100`;
      default:
        return `${baseStyle} bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100`;
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
          📍
        </div>
        <h2 className="text-xl font-medium text-gray-900">
          Geographic Search Performance
        </h2>
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-6 text-sm">
        Analysis of search result positioning across {totalZones} key geographic zones in your market area.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2 mb-6 max-w-md mx-auto">
        {gridData.map((zone, index) => (
          <div key={zone.zone} className={getCellStyle(zone.status)}>
            {getCellContent(zone)}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 flex-wrap text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
          <span className="text-gray-600">Competitor dominance</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 rounded"></div>
          <span className="text-gray-600">Your business visibility</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
          <span className="text-gray-600">Market opportunity</span>
        </div>
      </div>

      {/* Key insight - PSYCHOLOGICAL IMPACT */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-blue-900 font-medium mb-2">Key Finding</h3>
        <p className="text-blue-800 text-sm leading-relaxed">
          Your business appears in top 3 search results in only {clientVisibleZones} of {totalZones} analyzed geographic zones. 
          Competitors maintain strong positions across {Math.round((competitorDominatedZones / totalZones) * 100)}% of your target market area, 
          representing significant visibility gaps.
        </p>
      </div>
    </div>
  );
}
