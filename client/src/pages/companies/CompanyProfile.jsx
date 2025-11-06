import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, TrendingUp, TrendingDown, DollarSign, BarChart3, FileText, Table, Calculator } from 'lucide-react';
import * as XLSX from 'xlsx';

const CompanyProfile = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('view-data');

  useEffect(() => {
    loadCompanyData();
  }, [id]);

  const loadCompanyData = () => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === id);
    setCompany(foundCompany);
    setIsLoading(false);
  };

  const formatNumber = (value) => {
    if (!value || isNaN(value)) return '-';
    const num = parseFloat(value);
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatCellValue = (value) => {
    if (value === '' || value === null || value === undefined) return '';
    
    // If it's a percentage or special text, return as is
    if (typeof value === 'string' && (value.includes('%') || value.includes('/') || isNaN(value))) {
      return value;
    }
    
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return value;
    
    // For very large numbers, show with commas
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const calculateRatios = () => {
    if (!company || !company.financialData || company.financialData.length === 0) {
      return {};
    }

    const years = company.years || [];
    const latestYear = years[years.length - 1];
    if (!latestYear) return {};

    const revenue = company.financialData.find(m => m.name?.toLowerCase().includes('revenue'));
    const ebit = company.financialData.find(m => m.name?.toLowerCase().includes('ebit'));
    const netProfit = company.financialData.find(m => m.name?.toLowerCase().includes('net profit'));
    const equity = company.financialData.find(m => m.name?.toLowerCase().includes('equity'));
    const longTermDebt = company.financialData.find(m => m.name?.toLowerCase().includes('long term debt'));
    const ebitda = company.financialData.find(m => m.name?.toLowerCase().includes('ebitda'));
    const marketCap = parseFloat(company.marketData?.marketCap || 0);

    const latestRevenue = parseFloat(revenue?.values?.[latestYear] || 0);
    const latestEBIT = parseFloat(ebit?.values?.[latestYear] || 0);
    const latestNetProfit = parseFloat(netProfit?.values?.[latestYear] || 0);
    const latestEquity = parseFloat(equity?.values?.[latestYear] || 0);
    const latestEBITDA = parseFloat(ebitda?.values?.[latestYear] || 0);
    const latestDebt = parseFloat(longTermDebt?.values?.[latestYear] || 0);

    const ratios = {};

    // ROE (Return on Equity)
    if (latestEquity > 0) {
      ratios.ROE = (latestNetProfit / latestEquity) * 100;
    }

    // ROIC (Return on Invested Capital)
    if (latestEquity > 0) {
      ratios.ROIC = (latestEBIT / (latestEquity + latestDebt)) * 100;
    }

    // EBIT Margin
    if (latestRevenue > 0) {
      ratios.EBITMargin = (latestEBIT / latestRevenue) * 100;
    }

    // Net Profit Margin
    if (latestRevenue > 0) {
      ratios.NetProfitMargin = (latestNetProfit / latestRevenue) * 100;
    }

    // EV/EBITDA
    if (latestEBITDA > 0 && marketCap > 0) {
      ratios.EVEBITDA = marketCap / latestEBITDA;
    }

    // Growth Rate (Revenue)
    if (years.length >= 2 && revenue) {
      const prevYear = years[years.length - 2];
      const prevRevenue = parseFloat(revenue.values?.[prevYear] || 0);
      if (prevRevenue > 0) {
        ratios.RevenueGrowth = ((latestRevenue - prevRevenue) / prevRevenue) * 100;
      }
    }

    return ratios;
  };

  const getScoreColor = (value, thresholds, reverse = false) => {
    if (value === undefined || value === null) return 'gray';
    const good = reverse ? thresholds.ok : thresholds.good;
    const ok = reverse ? thresholds.good : thresholds.ok;
    if (value >= good) return 'green';
    if (value >= ok) return 'yellow';
    return 'red';
  };

  const exportCompanyData = () => {
    if (!company) return;

    const wb = XLSX.utils.book_new();
    const years = company.years || [];
    const financialData = company.financialData || [];
    
    // Financial Data Sheet
    const financialDataSheet = [];
    financialDataSheet.push(['Metric', ...years.map(y => `FY${y}`)]);
    
    financialData.forEach(metric => {
      const row = [
        metric.name,
        ...years.map(year => metric.values?.[year] || '')
      ];
      financialDataSheet.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(financialDataSheet);
    XLSX.utils.book_append_sheet(wb, ws, 'Financial Data');
    
    const fileName = `${company.companyInfo?.name || 'Company'}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Not Found</h3>
          <p className="text-sm text-gray-600 mb-4">The company you're looking for doesn't exist.</p>
          <Link to="/dashboard/companies" className="text-blue-600 hover:underline">
            Back to Companies List
          </Link>
        </div>
      </div>
    );
  }

  const ratios = calculateRatios();
  const years = company.years || [];
  const financialData = company.financialData || [];

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-3">
        <Link to="/dashboard/companies" className="text-xs text-blue-600 hover:underline mb-1 inline-block">
          ← Back to Companies
        </Link>
        <h1 className="text-base font-bold text-gray-900 mb-0.5">
          {company.companyInfo?.name || 'Unnamed Company'}
        </h1>
        <p className="text-xs text-gray-600">
          {company.companyInfo?.ticker && `${company.companyInfo.ticker} • `}
          {company.companyInfo?.industry || 'No industry specified'}
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-3">
        <div className="bg-white border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Share Price</span>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">
            {company.marketData?.sharePrice 
              ? `$${parseFloat(company.marketData.sharePrice).toFixed(2)}`
              : '-'
            }
          </p>
          {company.marketData?.percentageChange && (
            <p className={`text-[10px] mt-0.5 flex items-center gap-0.5 ${
              parseFloat(company.marketData.percentageChange) >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {parseFloat(company.marketData.percentageChange) >= 0 ? (
                <TrendingUp className="h-2.5 w-2.5" />
              ) : (
                <TrendingDown className="h-2.5 w-2.5" />
              )}
              {Math.abs(parseFloat(company.marketData.percentageChange)).toFixed(2)}%
            </p>
          )}
        </div>

        <div className="bg-white border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Market Cap</span>
            <Building2 className="h-4 w-4 text-green-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">
            {formatNumber(company.marketData?.marketCap)}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Rating</span>
            <BarChart3 className="h-4 w-4 text-yellow-600" />
          </div>
          <p className={`text-lg font-bold ${
            company.rating >= 8 ? 'text-green-600' : company.rating >= 6 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {company.rating ? company.rating.toFixed(1) : '-'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-600">Revenue {years.length > 0 ? `(FY${years[years.length - 1]})` : ''}</span>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </div>
          <p className="text-lg font-bold text-gray-900">
            {(() => {
              const revenue = financialData.find(m => m.name?.toLowerCase().includes('revenue'));
              const latestYear = years[years.length - 1];
              return revenue && latestYear && revenue.values?.[latestYear]
                ? formatNumber(revenue.values[latestYear])
                : '-';
            })()}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-200 mb-3">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('view-data')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'view-data'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Table className="h-3 w-3" />
            View Data
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'metrics'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Calculator className="h-3 w-3" />
            Metrics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-2">
          {activeTab === 'view-data' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-gray-900">Historical Financial Data</h2>
                <button
                  onClick={exportCompanyData}
                  className="px-2 py-1 text-xs bg-green-600 text-white hover:bg-green-700 transition-colors flex items-center gap-1"
                >
                  <FileText className="h-3 w-3" />
                  Export Excel
                </button>
              </div>
              {financialData.length > 0 && years.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr>
                        <th className="bg-blue-900 text-white px-2 py-1.5 text-left font-semibold min-w-[200px] border-r border-blue-800">
                          {company.companyInfo?.name || 'Company'}
                        </th>
                        {years.map(year => (
                          <th 
                            key={year} 
                            className="bg-blue-900 text-white px-2 py-1.5 text-center font-semibold min-w-[100px] border-r border-blue-800 last:border-r-0"
                          >
                            FY{year}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {financialData.map((metric, idx) => (
                        <tr 
                          key={metric.id || idx} 
                          className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                        >
                          <td className="px-2 py-1.5 font-medium text-gray-900 border-r border-gray-200 border-b border-gray-200">
                            {metric.name}
                          </td>
                          {years.map(year => (
                            <td 
                              key={year} 
                              className="px-2 py-1.5 text-right text-gray-700 border-r border-gray-200 border-b border-gray-200 last:border-r-0"
                            >
                              {formatCellValue(metric.values?.[year])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-gray-500 text-center py-4">No financial data available</p>
              )}
            </div>
          )}

          {activeTab === 'metrics' && (
            <div>
              <h2 className="text-xs font-semibold text-gray-900 mb-2">Financial Ratios & Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  {
                    name: 'ROE (Return on Equity)',
                    value: ratios.ROE,
                    unit: '%',
                    thresholds: { good: 15, ok: 10 },
                    description: 'Measures profitability relative to shareholders\' equity'
                  },
                  {
                    name: 'ROIC (Return on Invested Capital)',
                    value: ratios.ROIC,
                    unit: '%',
                    thresholds: { good: 12, ok: 8 },
                    description: 'Measures return on total capital invested'
                  },
                  {
                    name: 'EBIT Margin',
                    value: ratios.EBITMargin,
                    unit: '%',
                    thresholds: { good: 15, ok: 10 },
                    description: 'Operating profit as percentage of revenue'
                  },
                  {
                    name: 'Net Profit Margin',
                    value: ratios.NetProfitMargin,
                    unit: '%',
                    thresholds: { good: 10, ok: 5 },
                    description: 'Net profit as percentage of revenue'
                  },
                  {
                    name: 'EV/EBITDA',
                    value: ratios.EVEBITDA,
                    unit: 'x',
                    thresholds: { good: 10, ok: 15 },
                    description: 'Enterprise value to EBITDA multiple',
                    reverse: true
                  },
                  {
                    name: 'Revenue Growth',
                    value: ratios.RevenueGrowth,
                    unit: '%',
                    thresholds: { good: 10, ok: 5 },
                    description: 'Year-over-year revenue growth rate'
                  }
                ].map((ratio, idx) => {
                  const scoreColor = getScoreColor(
                    ratio.value,
                    ratio.reverse
                      ? { good: ratio.thresholds.ok, ok: ratio.thresholds.good }
                      : ratio.thresholds,
                    ratio.reverse
                  );

                  return (
                    <div key={idx} className="bg-gray-50 border border-gray-200 p-2">
                      <h3 className="text-xs font-semibold text-gray-900 mb-0.5">{ratio.name}</h3>
                      <p className="text-[10px] text-gray-500 mb-1">{ratio.description}</p>
                      <p className={`text-base font-bold ${
                        scoreColor === 'green' ? 'text-green-600' :
                        scoreColor === 'yellow' ? 'text-yellow-600' :
                        scoreColor === 'red' ? 'text-red-600' :
                        'text-gray-400'
                      }`}>
                        {ratio.value !== undefined
                          ? `${ratio.value.toFixed(2)}${ratio.unit}`
                          : 'N/A'
                        }
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

