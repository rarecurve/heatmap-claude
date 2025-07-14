// src/app/dashboard/page.tsx

'use client';

import { useState, useEffect } from 'react';

interface Report {
  id: string;
  business: {
    name: string;
    address: string;
    industry: string;
  };
  generatedAt: string;
  searchCost: number;
  competitorCount: number;
  visibilityScore: number;
  revenueImpact: number;
}

export default function Dashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [newReport, setNewReport] = useState({
    businessName: '',
    address: '',
    industry: 'HVAC',
    keywords: ['', '']
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports/generate');
      if (response.ok) {
        const data = await response.json();
        setReports(data.reports || []);
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReport.businessName || !newReport.address) return;

    setGenerating(true);
    try {
      const response = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: newReport.businessName,
          address: newReport.address,
          industry: newReport.industry,
          keywords: newReport.keywords.filter(k => k.trim())
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Report generated successfully! Cost: $${data.cost}\nCompetitors found: ${data.competitorsFound}`);
        setNewReport({ businessName: '', address: '', industry: 'HVAC', keywords: ['', ''] });
        fetchReports(); // Refresh list
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Report generation failed'}`);
      }
    } catch (error) {
      alert('Network error - please try again');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">RareCurve Dashboard</h1>
              <p className="text-gray-600 mt-1">Generate and manage competitor analysis reports</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">$0.08</div>
              <div className="text-sm text-gray-600">per report</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Generation Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate New Report</h2>
              
              <form onSubmit={generateReport} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    type="text"
                    value={newReport.businessName}
                    onChange={(e) => setNewReport({...newReport, businessName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Johnson's HVAC Service"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={newReport.address}
                    onChange={(e) => setNewReport({...newReport, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. Phoenix, AZ"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    value={newReport.industry}
                    onChange={(e) => setNewReport({...newReport, industry: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="HVAC">HVAC</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Roofing">Roofing</option>
                    <option value="Landscaping">Landscaping</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Legal">Legal</option>
                    <option value="Dental">Dental</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords (2 max)
                  </label>
                  <input
                    type="text"
                    value={newReport.keywords[0]}
                    onChange={(e) => setNewReport({...newReport, keywords: [e.target.value, newReport.keywords[1]]})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
                    placeholder="e.g. HVAC repair"
                  />
                  <input
                    type="text"
                    value={newReport.keywords[1]}
                    onChange={(e) => setNewReport({...newReport, keywords: [newReport.keywords[0], e.target.value]})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g. air conditioning service"
                  />
                </div>

                <button
                  type="submit"
                  disabled={generating || !newReport.businessName || !newReport.address}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {generating ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Report...
                    </div>
                  ) : (
                    'Generate Report ($0.08)'
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">What You'll Get:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Named competitor analysis</li>
                  <li>• Geographic market mapping</li>
                  <li>• Revenue impact calculations</li>
                  <li>• Phone call hijacking data</li>
                  <li>• Psychological insights</li>
                  <li>• Actionable recommendations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
                <p className="text-gray-600 text-sm mt-1">Click any report to view detailed analysis</p>
              </div>

              <div className="divide-y divide-gray-200">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading reports...</p>
                  </div>
                ) : reports.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="text-6xl mb-4">📊</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Reports Yet</h3>
                    <p className="text-gray-600">Generate your first competitor analysis report to get started.</p>
                  </div>
                ) : (
                  reports.map((report) => (
                    <div
                      key={report.id}
                      onClick={() => window.location.href = `/reports/${report.id}`}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{report.business.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {report.business.address} • {report.business.industry}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Generated {new Date(report.generatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-lg font-bold text-gray-900">{report.competitorCount}</div>
                              <div className="text-xs text-gray-600">Competitors</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-yellow-600">{Math.round(report.visibilityScore || 0)}%</div>
                              <div className="text-xs text-gray-600">Visibility</div>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-red-600">${Math.round(report.revenueImpact || 0).toLocaleString()}</div>
                              <div className="text-xs text-gray-600">Monthly Loss</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            Cost: ${report.searchCost.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{reports.length}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-green-600">
              ${(reports.reduce((sum, r) => sum + r.searchCost, 0)).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Total Spent</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {reports.reduce((sum, r) => sum + r.competitorCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Competitors Analyzed</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <div className="text-2xl font-bold text-red-600">
              ${Math.round(reports.reduce((sum, r) => sum + (r.revenueImpact || 0), 0)).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Revenue Opportunities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
