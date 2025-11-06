import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart3, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const RatiosScoring = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCompanyData();
  }, [id]);

  const loadCompanyData = () => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === id);
    setCompany(foundCompany);
    setIsLoading(false);
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
    const totalAssets = company.financialData.find(m => m.name?.toLowerCase().includes('total assets'));
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

    // ROIC (Return on Invested Capital) - simplified
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

    // EV/EBITDA (simplified - using market cap as proxy for EV)
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

  const getScoreColor = (value, thresholds) => {
    if (value >= thresholds.good) return 'green';
    if (value >= thresholds.ok) return 'yellow';
    return 'red';
  };

  const getScoreIcon = (color) => {
    switch (color) {
      case 'green':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'yellow':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'red':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Company Not Found</h3>
          <Link to="/dashboard/companies" className="text-blue-600 hover:underline">
            Back to Companies List
          </Link>
        </div>
      </div>
    );
  }

  const ratios = calculateRatios();

  const ratioDefinitions = [
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
      reverse: true // Lower is better
    },
    {
      name: 'Revenue Growth',
      value: ratios.RevenueGrowth,
      unit: '%',
      thresholds: { good: 10, ok: 5 },
      description: 'Year-over-year revenue growth rate'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to={`/dashboard/companies/${id}`} className="text-sm text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Company Profile
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ratios & Scoring</h1>
        <p className="text-sm text-gray-600">
          {company.companyInfo?.name || 'Unnamed Company'} • Automated Ratings & Key Financial Ratios
        </p>
      </div>

      {/* Overall Rating */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Overall Rating</h2>
            <p className="text-sm text-gray-600">Based on key financial metrics</p>
          </div>
          <div className="text-right">
            <p className={`text-4xl font-bold ${
              company.rating >= 8 ? 'text-green-600' : company.rating >= 6 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {company.rating ? company.rating.toFixed(1) : 'N/A'}
            </p>
            <p className="text-xs text-gray-500">out of 10</p>
          </div>
        </div>
      </div>

      {/* Financial Ratios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {ratioDefinitions.map((ratio, idx) => {
          const scoreColor = ratio.value !== undefined
            ? getScoreColor(
                ratio.value,
                ratio.reverse
                  ? { good: ratio.thresholds.ok, ok: ratio.thresholds.good }
                  : ratio.thresholds
              )
            : null;

          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">{ratio.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{ratio.description}</p>
                </div>
                {scoreColor && getScoreIcon(scoreColor)}
              </div>
              <div className="mt-3">
                <p className={`text-2xl font-bold ${
                  scoreColor === 'green' ? 'text-green-600' :
                  scoreColor === 'yellow' ? 'text-yellow-600' :
                  scoreColor === 'red' ? 'text-red-600' : 'text-gray-400'
                }`}>
                  {ratio.value !== undefined
                    ? `${ratio.value.toFixed(2)}${ratio.unit}`
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traffic Light Legend */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Scoring System</h3>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-blue-800">Good: Meets or exceeds target threshold</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-blue-800">Fair: Below target but acceptable</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-600" />
            <span className="text-blue-800">Poor: Below acceptable threshold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatiosScoring;

