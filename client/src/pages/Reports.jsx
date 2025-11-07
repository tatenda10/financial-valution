import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Calendar, FileSpreadsheet, Presentation, Eye, X, ArrowLeft, BarChart3, DollarSign, TrendingUp, History, Clock } from 'lucide-react';

const Reports = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewingReport, setViewingReport] = useState(null);

  // Static reports data with actual content
  const staticReports = [
    {
      id: 'report-1',
      name: 'Valuation Report - Q4 2024',
      type: 'PDF',
      date: '2024-01-20',
      version: '1.0',
      description: 'Complete DCF valuation analysis and financial projections',
      fileSize: '2.4 MB',
      pages: 45,
      sections: ['Executive Summary', 'DCF Analysis', 'Assumptions', 'Sensitivity Analysis', 'Risk Assessment'],
      generatedBy: 'Valuation Team',
      status: 'Final',
      keyMetrics: {
        enterpriseValue: '$15.25B',
        fairValuePerShare: '$9.85',
        wacc: '10.0%'
      },
      versionHistory: [
        { version: '1.0', date: '2024-01-20', changedBy: 'Valuation Team', changes: 'Initial final version', assumptions: { revenueGrowth: '5.0%', wacc: '10.0%' } },
        { version: '0.9', date: '2024-01-19', changedBy: 'Analyst', changes: 'Updated WACC from 10.2% to 10.0%', assumptions: { revenueGrowth: '5.0%', wacc: '10.2%' } },
        { version: '0.8', date: '2024-01-18', changedBy: 'Analyst', changes: 'Revised revenue growth from 4.5% to 5.0%', assumptions: { revenueGrowth: '4.5%', wacc: '10.2%' } }
      ],
      auditLog: [
        { timestamp: '2024-01-20 14:30:00', user: 'Valuation Team', action: 'Report finalized', details: 'Version 1.0 marked as final' },
        { timestamp: '2024-01-20 10:15:00', user: 'Analyst', action: 'Assumption updated', details: 'WACC changed from 10.2% to 10.0%' },
        { timestamp: '2024-01-19 16:45:00', user: 'Analyst', action: 'Assumption updated', details: 'Revenue growth changed from 4.5% to 5.0%' },
        { timestamp: '2024-01-18 09:20:00', user: 'Admin', action: 'Report created', details: 'Initial draft version 0.8 created' }
      ],
      content: {
        executiveSummary: 'Masimba Holdings Limited has been valued using a Discounted Cash Flow (DCF) methodology. The analysis indicates an Enterprise Value of $15.25 billion and a Fair Value per Share of $9.85, representing a 15.9% premium to the current market price of $8.50.',
        dcfAnalysis: 'The DCF valuation is based on a 5-year projection period with a terminal growth rate of 3.0%. The Weighted Average Cost of Capital (WACC) is calculated at 10.0%, reflecting the company\'s risk profile and capital structure. Revenue growth assumptions average 5.0% annually over the projection period.',
        assumptions: {
          revenueGrowth: '5.0%',
          terminalGrowth: '3.0%',
          wacc: '10.0%',
          taxRate: '30.0%',
          ebitMargin: '25.7%'
        },
        sensitivity: 'Sensitivity analysis shows that the fair value per share ranges from $8.50 to $11.20 under various WACC and growth rate scenarios. The base case valuation of $9.85 falls within the mid-range of these scenarios.',
        riskAssessment: 'Key risks include: (1) Economic downturn affecting construction demand, (2) Material cost inflation, (3) Regulatory changes, (4) Competition in key markets. Mitigation strategies are in place for each identified risk.'
      }
    },
    {
      id: 'report-2',
      name: 'Financial Summary - Annual 2024',
      type: 'Excel',
      date: '2024-01-18',
      version: '1.0',
      description: 'Historical financial data and key metrics for 2019-2023',
      fileSize: '856 KB',
      pages: null,
      sheets: 8,
      sections: ['Income Statement', 'Balance Sheet', 'Cash Flow', 'Key Ratios', 'Trend Analysis'],
      generatedBy: 'Financial Analysis',
      status: 'Final',
      keyMetrics: {
        revenue: '$1.05B',
        netProfit: '$240M',
        growthRate: '5.0%'
      },
      content: {
        incomeStatement: {
          revenue: { '2019': '$850M', '2020': '$900M', '2021': '$950M', '2022': '$1.00B', '2023': '$1.05B' },
          ebit: { '2019': '$210M', '2020': '$225M', '2021': '$240M', '2022': '$255M', '2023': '$270M' },
          netProfit: { '2019': '$180M', '2020': '$195M', '2021': '$210M', '2022': '$225M', '2023': '$240M' }
        },
        balanceSheet: {
          totalAssets: { '2019': '$1.20B', '2020': '$1.30B', '2021': '$1.40B', '2022': '$1.50B', '2023': '$1.60B' },
          totalEquity: { '2019': '$340M', '2020': '$360M', '2021': '$380M', '2022': '$400M', '2023': '$420M' },
          totalDebt: { '2019': '$136M', '2020': '$144M', '2021': '$152M', '2022': '$160M', '2023': '$168M' }
        },
        keyRatios: {
          roe: '57.14%',
          roic: '63.16%',
          ebitdaMargin: '29.52%',
          netProfitMargin: '22.86%',
          currentRatio: '1.85x',
          debtToEquity: '0.40x'
        }
      }
    },
    {
      id: 'report-3',
      name: 'Valuation Report - Q3 2024',
      type: 'PDF',
      date: '2024-10-15',
      version: '1.0',
      description: 'Previous quarter valuation analysis',
      fileSize: '2.1 MB',
      pages: 42,
      sections: ['Executive Summary', 'DCF Analysis', 'Assumptions', 'Sensitivity Analysis'],
      generatedBy: 'Valuation Team',
      status: 'Final',
      keyMetrics: {
        enterpriseValue: '$14.80B',
        fairValuePerShare: '$9.55',
        wacc: '10.2%'
      },
      content: {
        executiveSummary: 'Q3 2024 valuation analysis showed an Enterprise Value of $14.80 billion and Fair Value per Share of $9.55. The valuation reflected slightly higher WACC of 10.2% due to increased market volatility during the period.',
        dcfAnalysis: 'The DCF model incorporated updated financial projections based on Q3 performance. Revenue growth assumptions were maintained at 5.0%, while terminal growth rate remained at 3.0%.',
        assumptions: {
          revenueGrowth: '5.0%',
          terminalGrowth: '3.0%',
          wacc: '10.2%',
          taxRate: '30.0%',
          ebitMargin: '25.5%'
        }
      }
    },
    {
      id: 'report-4',
      name: 'Investor Presentation - 2024',
      type: 'Presentation',
      date: '2024-01-10',
      version: '1.0',
      description: 'Executive summary and key highlights for investors',
      fileSize: '3.2 MB',
      pages: 28,
      slides: 28,
      sections: ['Company Overview', 'Financial Performance', 'Strategic Initiatives', 'Market Outlook'],
      generatedBy: 'Corporate Communications',
      status: 'Final',
      keyMetrics: {
        marketCap: '$13.18B',
        revenue: '$1.05B',
        roe: '57.14%'
      },
      content: {
        companyOverview: 'Masimba Holdings Limited is a leading construction company with a strong track record of delivering infrastructure projects across key markets. The company has demonstrated consistent growth and profitability over the past five years.',
        financialPerformance: 'Revenue has grown from $850M in 2019 to $1.05B in 2023, representing a 5.0% CAGR. Net profit margins have improved to 22.86%, while ROE stands at an impressive 57.14%.',
        strategicInitiatives: 'Key strategic priorities include: (1) Expansion into renewable energy projects, (2) Digital transformation initiatives, (3) Geographic diversification, (4) ESG compliance and sustainability programs.',
        marketOutlook: 'The construction sector is expected to see continued growth driven by infrastructure investments. Masimba is well-positioned to capitalize on these opportunities with its strong balance sheet and operational expertise.'
      }
    },
    {
      id: 'report-5',
      name: 'Ratio Analysis Report - 2024',
      type: 'PDF',
      date: '2024-01-12',
      version: '1.0',
      description: 'Comprehensive ratio analysis and peer comparison',
      fileSize: '1.8 MB',
      pages: 35,
      sections: ['Profitability Ratios', 'Liquidity Ratios', 'Valuation Ratios', 'Peer Comparison'],
      generatedBy: 'Financial Analysis',
      status: 'Final',
      keyMetrics: {
        roe: '57.14%',
        roic: '63.16%',
        peRatio: '4.36x'
      },
      content: {
        profitability: 'Profitability ratios demonstrate strong performance. ROE of 57.14% and ROIC of 63.16% significantly exceed industry averages. EBIT margin of 25.71% and Net Profit margin of 22.86% reflect operational efficiency.',
        liquidity: 'Liquidity position is healthy with Current Ratio of 1.85x and Quick Ratio of 1.28x. Cash ratio of 0.53x provides adequate short-term liquidity coverage.',
        valuation: 'Valuation ratios indicate the company is trading at attractive multiples. P/E ratio of 4.36x and P/B ratio of 2.40x are below industry peers, suggesting potential undervaluation.',
        peerComparison: 'Compared to industry peers, Masimba demonstrates superior profitability metrics while maintaining reasonable valuation multiples. The company\'s financial strength positions it favorably for growth opportunities.'
      }
    }
  ];

  const categories = ['all', 'PDF', 'Excel', 'Presentation'];

  const filteredReports = useMemo(() => {
    if (selectedFilter === 'all') {
      return staticReports;
    }
    return staticReports.filter(r => r.type.toLowerCase() === selectedFilter.toLowerCase());
  }, [selectedFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-600" />;
      case 'excel':
        return <FileSpreadsheet className="h-4 w-4 text-green-600" />;
      case 'presentation':
        return <Presentation className="h-4 w-4 text-blue-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getFileTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'bg-red-50 border-red-200';
      case 'excel':
        return 'bg-green-50 border-green-200';
      case 'presentation':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const handleView = (report) => {
    setViewingReport(report);
  };

  const handleCloseView = () => {
    setViewingReport(null);
  };

  // Count reports by type
  const reportCounts = useMemo(() => {
    const counts = { all: staticReports.length };
    categories.slice(1).forEach(cat => {
      counts[cat] = staticReports.filter(r => r.type.toLowerCase() === cat.toLowerCase()).length;
    });
    return counts;
  }, []);

  // Group reports by type for display
  const reportsByType = useMemo(() => {
    const grouped = {};
    filteredReports.forEach(report => {
      if (!grouped[report.type]) {
        grouped[report.type] = [];
      }
      grouped[report.type].push(report);
    });
    return grouped;
  }, [filteredReports]);

  // If viewing a report, show the report content
  if (viewingReport) {
    return (
      <div className="p-4 max-w-7xl mx-auto">
        {/* Report Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCloseView}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{viewingReport.name}</h1>
              <p className="text-xs text-gray-600">{viewingReport.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">{viewingReport.status}</span>
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">v{viewingReport.version}</span>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          {/* Report Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-4 border-b border-gray-200">
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Date</p>
              <p className="text-xs font-semibold text-gray-900">{formatDate(viewingReport.date)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">File Size</p>
              <p className="text-xs font-semibold text-gray-900">{viewingReport.fileSize}</p>
            </div>
            {viewingReport.pages && (
              <div>
                <p className="text-[10px] text-gray-600 mb-0.5">Pages</p>
                <p className="text-xs font-semibold text-gray-900">{viewingReport.pages}</p>
              </div>
            )}
            {viewingReport.sheets && (
              <div>
                <p className="text-[10px] text-gray-600 mb-0.5">Sheets</p>
                <p className="text-xs font-semibold text-gray-900">{viewingReport.sheets}</p>
              </div>
            )}
          </div>

          {/* Key Metrics */}
          {viewingReport.keyMetrics && (
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.entries(viewingReport.keyMetrics).map(([key, value], idx) => (
                  <div key={idx} className="bg-white rounded-lg p-2">
                    <p className="text-[10px] text-gray-600 mb-0.5">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm font-bold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Content Sections */}
          {viewingReport.content && (
            <div className="space-y-4">
              {viewingReport.type === 'PDF' && (
                <>
                  {viewingReport.content.executiveSummary && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Executive Summary</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.executiveSummary}</p>
                    </div>
                  )}
                  {viewingReport.content.dcfAnalysis && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">DCF Analysis</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.dcfAnalysis}</p>
                    </div>
                  )}
                  {viewingReport.content.assumptions && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Key Assumptions</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(viewingReport.content.assumptions).map(([key, value], idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-2">
                            <p className="text-[10px] text-gray-600 mb-0.5">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <p className="text-xs font-semibold text-gray-900">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {viewingReport.content.sensitivity && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Sensitivity Analysis</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.sensitivity}</p>
                    </div>
                  )}
                  {viewingReport.content.riskAssessment && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Risk Assessment</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.riskAssessment}</p>
                    </div>
                  )}
                </>
              )}

              {viewingReport.type === 'Excel' && viewingReport.content && (
                <>
                  {viewingReport.content.incomeStatement && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Income Statement</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-2 py-2 text-left">Metric</th>
                              {Object.keys(viewingReport.content.incomeStatement.revenue).map(year => (
                                <th key={year} className="px-2 py-2 text-right">FY{year}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-2 py-2 font-medium">Revenue</td>
                              {Object.values(viewingReport.content.incomeStatement.revenue).map((val, idx) => (
                                <td key={idx} className="px-2 py-2 text-right">{val}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-medium">EBIT</td>
                              {Object.values(viewingReport.content.incomeStatement.ebit).map((val, idx) => (
                                <td key={idx} className="px-2 py-2 text-right">{val}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-medium">Net Profit</td>
                              {Object.values(viewingReport.content.incomeStatement.netProfit).map((val, idx) => (
                                <td key={idx} className="px-2 py-2 text-right">{val}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {viewingReport.content.balanceSheet && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Balance Sheet</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-2 py-2 text-left">Metric</th>
                              {Object.keys(viewingReport.content.balanceSheet.totalAssets).map(year => (
                                <th key={year} className="px-2 py-2 text-right">FY{year}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            <tr>
                              <td className="px-2 py-2 font-medium">Total Assets</td>
                              {Object.values(viewingReport.content.balanceSheet.totalAssets).map((val, idx) => (
                                <td key={idx} className="px-2 py-2 text-right">{val}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-medium">Total Equity</td>
                              {Object.values(viewingReport.content.balanceSheet.totalEquity).map((val, idx) => (
                                <td key={idx} className="px-2 py-2 text-right">{val}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="px-2 py-2 font-medium">Total Debt</td>
                              {Object.values(viewingReport.content.balanceSheet.totalDebt).map((val, idx) => (
                                <td key={idx} className="px-2 py-2 text-right">{val}</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {viewingReport.content.keyRatios && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Key Ratios</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(viewingReport.content.keyRatios).map(([key, value], idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-2">
                            <p className="text-[10px] text-gray-600 mb-0.5">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <p className="text-xs font-semibold text-gray-900">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {viewingReport.type === 'Presentation' && viewingReport.content && (
                <>
                  {viewingReport.content.companyOverview && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Company Overview</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.companyOverview}</p>
                    </div>
                  )}
                  {viewingReport.content.financialPerformance && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Financial Performance</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.financialPerformance}</p>
                    </div>
                  )}
                  {viewingReport.content.strategicInitiatives && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Strategic Initiatives</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.strategicInitiatives}</p>
                    </div>
                  )}
                  {viewingReport.content.marketOutlook && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-2">Market Outlook</h3>
                      <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.marketOutlook}</p>
                    </div>
                  )}
                </>
              )}

              {/* Ratio Analysis specific content */}
              {viewingReport.content.profitability && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Profitability Ratios</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.profitability}</p>
                </div>
              )}
              {viewingReport.content.liquidity && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Liquidity Ratios</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.liquidity}</p>
                </div>
              )}
              {viewingReport.content.valuation && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Valuation Ratios</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.valuation}</p>
                </div>
              )}
              {viewingReport.content.peerComparison && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Peer Comparison</h3>
                  <p className="text-xs text-gray-700 leading-relaxed">{viewingReport.content.peerComparison}</p>
                </div>
              )}
            </div>
          )}

          {/* Sections List */}
          {viewingReport.sections && viewingReport.sections.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Report Sections</h3>
              <div className="flex flex-wrap gap-2">
                {viewingReport.sections.map((section, idx) => (
                  <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                    {section}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Version History */}
          {viewingReport.versionHistory && viewingReport.versionHistory.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <History className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">Version History</h3>
              </div>
              <div className="space-y-2">
                {viewingReport.versionHistory.map((version, idx) => (
                  <div key={idx} className={`p-2 rounded-lg border ${idx === 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${idx === 0 ? 'text-blue-600' : 'text-gray-600'}`}>
                          v{version.version}
                        </span>
                        {idx === 0 && (
                          <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Current</span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-500">{formatDate(version.date)}</span>
                    </div>
                    <p className="text-xs text-gray-700 mb-1">{version.changes}</p>
                    <p className="text-[10px] text-gray-600">Changed by: {version.changedBy}</p>
                    {version.assumptions && (
                      <div className="mt-1 flex gap-2 text-[10px]">
                        {Object.entries(version.assumptions).map(([key, value], aIdx) => (
                          <span key={aIdx} className="text-gray-600">
                            {key}: <span className="font-semibold">{value}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audit Log */}
          {viewingReport.auditLog && viewingReport.auditLog.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-4 w-4 text-gray-600" />
                <h3 className="text-sm font-semibold text-gray-900">Audit Log</h3>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {viewingReport.auditLog.map((entry, idx) => (
                  <div key={idx} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-[10px] text-gray-500">{entry.timestamp}</span>
                      <span className="text-[10px] text-gray-600">{entry.user}</span>
                    </div>
                    <p className="text-xs text-gray-900 font-medium mb-0.5">{entry.action}</p>
                    <p className="text-[10px] text-gray-600">{entry.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">Reports</h1>
        <p className="text-xs text-gray-600">View valuation and analysis reports</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-red-100 rounded-lg">
              <FileText className="h-3 w-3 text-red-600" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">PDF Reports</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{reportCounts.PDF || 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-100 rounded-lg">
              <FileSpreadsheet className="h-3 w-3 text-green-600" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Excel Reports</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{reportCounts.Excel || 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Presentation className="h-3 w-3 text-blue-600" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Presentations</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{reportCounts.Presentation || 0}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-gray-100 rounded-lg">
              <FileText className="h-3 w-3 text-gray-600" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Total Reports</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{reportCounts.all}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-2">
        <div className="flex items-center gap-2 flex-wrap">
          <FileText className="h-3 w-3 text-gray-500" />
          <span className="text-xs text-gray-600">Filter by type:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-2.5 py-1 text-xs transition-colors rounded ${
                selectedFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category} ({reportCounts[category] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      {filteredReports.length > 0 ? (
        <div className="space-y-3">
          {Object.entries(reportsByType).map(([type, typeReports]) => {
            if (typeReports.length === 0) return null;

            return (
              <div key={type} className="mb-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">{type} Reports</h2>
                <div className="space-y-3">
                  {typeReports.map((report) => (
                    <div key={report.id} className={`bg-white border border-gray-200 rounded-lg p-3 ${getFileTypeColor(report.type)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="p-2 bg-white rounded-lg">
                            {getFileIcon(report.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-sm font-semibold text-gray-900">{report.name}</h3>
                              <span className="px-1.5 py-0.5 text-[10px] bg-white text-gray-600 rounded">
                                v{report.version}
                              </span>
                              {report.status && (
                                <span className="px-1.5 py-0.5 text-[10px] bg-green-100 text-green-800 rounded">
                                  {report.status}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{report.description}</p>
                            
                            {/* Report Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                                <Calendar className="h-2.5 w-2.5" />
                                <span>{formatDate(report.date)}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                                <FileText className="h-2.5 w-2.5" />
                                <span>{report.fileSize}</span>
                              </div>
                              {report.pages && (
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                                  <FileText className="h-2.5 w-2.5" />
                                  <span>{report.pages} pages</span>
                                </div>
                              )}
                              {report.sheets && (
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
                                  <FileSpreadsheet className="h-2.5 w-2.5" />
                                  <span>{report.sheets} sheets</span>
                                </div>
                              )}
                            </div>

                            {/* Sections */}
                            {report.sections && report.sections.length > 0 && (
                              <div className="mb-2">
                                <p className="text-[10px] font-medium text-gray-600 mb-1">Sections:</p>
                                <div className="flex flex-wrap gap-1">
                                  {report.sections.map((section, sIdx) => (
                                    <span key={sIdx} className="px-1.5 py-0.5 text-[9px] bg-white text-gray-700 rounded">
                                      {section}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Key Metrics */}
                            {report.keyMetrics && (
                              <div className="mt-2 p-2 bg-white rounded-lg">
                                <p className="text-[10px] font-medium text-gray-600 mb-1">Key Metrics:</p>
                                <div className="flex flex-wrap gap-2">
                                  {Object.entries(report.keyMetrics).map(([key, value], mIdx) => (
                                    <div key={mIdx} className="text-[10px]">
                                      <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                      <span className="font-semibold text-gray-900 ml-1">{value}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="ml-3">
                          <button
                            onClick={() => handleView(report)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded"
                          >
                            <Eye className="h-3 w-3" />
                            View Report
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No Reports Available</h3>
          <p className="text-xs text-gray-600">
            {selectedFilter !== 'all' 
              ? `No reports found in the "${selectedFilter}" category.`
              : 'Valuation and analysis reports will appear here when generated.'
            }
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <FileText className="h-3 w-3 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold text-blue-900 mb-0.5">About Reports</h3>
            <p className="text-[10px] text-blue-800">
              View comprehensive valuation reports, financial summaries, and analysis presentations. 
              Click "View Report" to see the full report content. Reports are generated based on your 
              company's financial data and include detailed analysis, assumptions, and key metrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
