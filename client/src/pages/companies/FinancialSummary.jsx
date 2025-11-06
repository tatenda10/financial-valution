import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

const FinancialSummary = () => {
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

  const formatNumber = (value) => {
    if (!value || isNaN(value)) return '-';
    const num = parseFloat(value);
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const calculateGrowth = (current, previous) => {
    if (!current || !previous || isNaN(current) || isNaN(previous)) return null;
    const curr = parseFloat(current);
    const prev = parseFloat(previous);
    if (prev === 0) return null;
    return ((curr - prev) / prev) * 100;
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

  const years = company.years || [];
  const revenue = company.financialData?.find(m => m.name?.toLowerCase().includes('revenue'));
  const ebit = company.financialData?.find(m => m.name?.toLowerCase().includes('ebit'));
  const ebitda = company.financialData?.find(m => m.name?.toLowerCase().includes('ebitda'));
  const netProfit = company.financialData?.find(m => m.name?.toLowerCase().includes('net profit'));

  // Calculate revenue growth
  const revenueGrowth = years.length >= 2 && revenue
    ? calculateGrowth(
        revenue.values?.[years[years.length - 1]],
        revenue.values?.[years[years.length - 2]]
      )
    : null;

  // Calculate EBITDA margin (if EBITDA and revenue exist)
  const latestYear = years[years.length - 1];
  const latestRevenue = revenue?.values?.[latestYear];
  const latestEBITDA = ebitda?.values?.[latestYear];
  const ebitdaMargin = latestRevenue && latestEBITDA && !isNaN(latestRevenue) && !isNaN(latestEBITDA)
    ? (parseFloat(latestEBITDA) / parseFloat(latestRevenue)) * 100
    : null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to={`/dashboard/companies/${id}`} className="text-sm text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Company Profile
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Financial Summary</h1>
        <p className="text-sm text-gray-600">
          {company.companyInfo?.name || 'Unnamed Company'} • Trends & Fundamentals
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Revenue Growth</span>
            {revenueGrowth !== null && (
              revenueGrowth >= 0 ? (
                <TrendingUp className="h-5 w-5 text-green-600" />
              ) : (
                <TrendingDown className="h-5 w-5 text-red-600" />
              )
            )}
          </div>
          <p className={`text-2xl font-bold ${
            revenueGrowth !== null
              ? revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
              : 'text-gray-400'
          }`}>
            {revenueGrowth !== null ? `${revenueGrowth.toFixed(2)}%` : '-'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">EBITDA Margin</span>
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {ebitdaMargin !== null ? `${ebitdaMargin.toFixed(2)}%` : '-'}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Latest Revenue</span>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {latestYear && revenue?.values?.[latestYear]
              ? formatNumber(revenue.values[latestYear])
              : '-'
            }
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-600">Latest EBIT</span>
            <BarChart3 className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {latestYear && ebit?.values?.[latestYear]
              ? formatNumber(ebit.values[latestYear])
              : '-'
            }
          </p>
        </div>
      </div>

      {/* Revenue Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-500">Revenue chart visualization</p>
            <p className="text-xs text-gray-400 mt-1">
              {years.length > 0 && revenue
                ? `Data available for ${years.length} years`
                : 'No revenue data available'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Financial Data Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Historical Financial Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">Metric</th>
                {years.map(year => (
                  <th key={year} className="px-4 py-3 text-right font-medium text-gray-700">
                    FY{year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {revenue && (
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Revenue</td>
                  {years.map(year => (
                    <td key={year} className="px-4 py-3 text-right text-gray-700">
                      {formatNumber(revenue.values?.[year])}
                    </td>
                  ))}
                </tr>
              )}
              {ebit && (
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">EBIT</td>
                  {years.map(year => (
                    <td key={year} className="px-4 py-3 text-right text-gray-700">
                      {formatNumber(ebit.values?.[year])}
                    </td>
                  ))}
                </tr>
              )}
              {ebitda && (
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">EBITDA</td>
                  {years.map(year => (
                    <td key={year} className="px-4 py-3 text-right text-gray-700">
                      {formatNumber(ebitda.values?.[year])}
                    </td>
                  ))}
                </tr>
              )}
              {netProfit && (
                <tr>
                  <td className="px-4 py-3 font-medium text-gray-900">Net Profit</td>
                  {years.map(year => (
                    <td key={year} className="px-4 py-3 text-right text-gray-700">
                      {formatNumber(netProfit.values?.[year])}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;

