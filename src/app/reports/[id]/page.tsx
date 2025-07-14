// src/app/reports/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ReportData } from '@/types';
import CompetitorCard from '@/components/reports/CompetitorCard';
import GeographicGrid from '@/components/reports/GeographicGrid';
import RevenueImpactComponent from '@/components/reports/RevenueImpact';
import PsychologicalInsights from '@/components/reports/PsychologicalInsights';

export default function ReportPage() {
  const params = useParams();
  const reportId = params.id as string;
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reportId) {
      fetchReport(reportId);
    }
  }, [reportId]);

  const fetchReport = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/generate?id=${id}`);
      if (!response.ok) {
        throw new Error('Report not found');
      }
      const data = await response.json();
      setReportData(data.report.reportData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load report');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading competitor analysis...</p>
        </div>
      </div>
    );
  }

  if (error || !reportData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The requested report could not be found.'}</p>
          <a 
            href="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate New Report
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* RareCurve Branding */}
      <div className="absolute top-5 right-5 text-lg font-medium text-blue-600">
        RareCurve
      </div>

      <div className="max-w-6xl mx-auto px-5 py-8">
        {/* Header */}
        <div className="bg-white p-10 rounded-lg mb-6 shadow-sm border-t-4 border-blue-500">
          <h1 className="text-4xl font-normal text-gray-900 mb-2">
            Local Search Performance Analysis
          </h1>
          <div className="text-gray-600">
            Market visibility assessment and competitive analysis
          </div>
        </div>

        {/* Business Info */}
        <div className="bg-white p-6 rounded-lg mb-6 shadow-sm border-l-4 border-green-500">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            {reportData.businessInfo.name}
          </h2>
          <p className="text-gray-600 text-sm">
            Analysis Period: {new Date(reportData.generatedAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • Market: {reportData.businessInfo.address} • 
            Report Generated: {new Date(reportData.generatedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Revenue Impact Cards - THE MONEY SHOT */}
        <RevenueImpactComponent 
          revenueImpact={reportData.revenueImpact}
          geographicData={reportData.geographicData}
          marketData={reportData.marketData}
          businessName={reportData.businessInfo.name}
        />

        {/* Geographic Analysis */}
        <GeographicGrid 
          geographicData={reportData.geographicData}
          businessName={reportData.businessInfo.name}
        />

        {/* Psychological Insights - HOLY SHIT MOMENTS */}
        <div className="my-8">
          <PsychologicalInsights 
            insights={reportData.psychologicalInsights}
            businessName={reportData.businessInfo.name}
          />
        </div>

        {/* Competitive Landscape */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
              🏢
            </div>
            <h2 className="text-xl font-medium text-gray-900">
              Competitive Landscape Analysis
            </h2>
          </div>
          
          {reportData.competitorAnalysis.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportData.competitorAnalysis.map((competitor, index) => (
                <CompetitorCard 
                  key={index}
                  competitor={competitor}
                  showRevenue={true}
                  highlightCalls={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No Major Competitors Detected
              </h3>
              <p className="text-gray-600">
                Your market area shows limited competitive pressure in search results.
              </p>
            </div>
          )}
        </div>

        {/* Customer Acquisition Analysis */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-3">
              📊
            </div>
            <h2 className="text-xl font-medium text-gray-900">
              Customer Acquisition Analysis
            </h2>
          </div>
          
          <p className="text-gray-600 mb-6 text-sm">
            Based on search volume data and competitor positioning, here's how customers currently find services in your market:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-5 rounded-lg text-center">
              <h3 className="text-gray-900 font-medium mb-2">Search Query</h3>
              <p className="text-gray-600 text-sm">"{reportData.businessInfo.keywords[0] || 'services'} near me"</p>
            </div>
            <div className="bg-red-50 p-5 rounded-lg text-center border border-red-200">
              <h3 className="text-gray-900 font-medium mb-2">Top Result</h3>
              <p className="text-gray-600 text-sm">
                {reportData.competitorAnalysis[0]?.name || 'Various competitors'} 
                ({Math.round((reportData.geographicData.competitorDominatedZones / reportData.geographicData.totalZones) * 100)}% of searches)
              </p>
            </div>
            <div className="bg-red-50 p-5 rounded-lg text-center border border-red-200">
              <h3 className="text-gray-900 font-medium mb-2">Customer Action</h3>
              <p className="text-gray-600 text-sm">
                Calls {reportData.competitorAnalysis[0]?.phone || 'competitor numbers'}
              </p>
            </div>
            <div className="bg-red-50 p-5 rounded-lg text-center border border-red-200">
              <h3 className="text-gray-900 font-medium mb-2">Revenue Impact</h3>
              <p className="text-gray-600 text-sm">
                ${reportData.marketData.averageServiceValue}-{reportData.marketData.averageServiceValue * 2} per service call
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h3 className="text-blue-900 font-medium mb-2">Opportunity Assessment</h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              Daily search volume of {reportData.marketData.dailySearchVolume.toLocaleString()} queries represents approximately 
              ${Math.round(reportData.revenueImpact.opportunityValue).toLocaleString()} in monthly service opportunities. 
              Current market leaders capture {Math.round((reportData.geographicData.competitorDominatedZones / reportData.geographicData.totalZones) * 100)}% of this volume, 
              while your business captures approximately {Math.round((reportData.geographicData.clientVisibleZones / reportData.geographicData.totalZones) * 100)}%. 
              Improved search visibility could significantly increase call volume and revenue generation.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 rounded-lg text-white">
          <h2 className="text-2xl font-medium mb-4">Recommended Next Steps</h2>
          <p className="text-green-100 mb-4">
            Based on this analysis, your business shows strong potential for improved market performance. 
            Your superior customer satisfaction ratings and established reputation provide a solid foundation for enhanced search visibility.
          </p>
          <p className="text-green-100 mb-6">
            A comprehensive local search optimization strategy could help bridge the gap between your service quality and market visibility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => window.location.href = 'mailto:help@rarecurve.com'}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Request Strategy Consultation
            </button>
            <button 
              onClick={() => window.print()}
              className="bg-green-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-900 transition-colors"
            >
              Download Report
            </button>
          </div>
          
          <div className="mt-6 text-sm text-green-200">
            <p><strong>help@rarecurve.com</strong> | <strong>(555) 123-7265</strong></p>
            <p>Complimentary 15-minute market analysis available for qualified businesses</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-xs">
            This analysis was generated using proprietary search performance data and competitive intelligence tools. 
            Report accuracy is subject to search algorithm variations and market conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
