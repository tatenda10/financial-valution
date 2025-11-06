import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

const ValuationDCF = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dcfData, setDcfData] = useState(null);

  useEffect(() => {
    loadCompanyData();
  }, [id]);

  const loadCompanyData = () => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === id);
    setCompany(foundCompany);
    
    if (foundCompany) {
      calculateDCF(foundCompany);
    }
    
    setIsLoading(false);
  };

  const calculateDCF = (companyData) => {
    // Simplified DCF calculation
    const years = companyData.years || [];
    const latestYear = years[years.length - 1];
    
    if (!latestYear) {
      setDcfData(null);
      return;
    }

    const revenue = companyData.financialData?.find(m => m.name?.toLowerCase().includes('revenue'));
    const ebit = companyData.financialData?.find(m => m.name?.toLowerCase().includes('ebit'));
    const capex = companyData.financialData?.find(m => m.name?.toLowerCase().includes('capex'));
    const taxRate = companyData.financialData?.find(m => m.name?.toLowerCase().includes('tax rate'));

    const latestRevenue = parseFloat(revenue?.values?.[latestYear] || 0);
    const latestEBIT = parseFloat(ebit?.values?.[latestYear] || 0);
    const latestCapex = parseFloat(capex?.values?.[latestYear] || 0);
    const taxRateValue = taxRate?.values?.[latestYear] 
      ? parseFloat(taxRate.values[latestYear].replace('%', '')) / 100 
      : 0.25;

    // Assumptions
    const revenueGrowthRate = 0.05; // 5% growth
    const terminalGrowthRate = 0.03; // 3% terminal growth
    const wacc = 0.10; // 10% WACC
    const projectionYears = 5;

    // Calculate projected FCF
    const projections = [];
    let projectedRevenue = latestRevenue;
    let projectedEBIT = latestEBIT;
    let projectedCapex = latestCapex;

    for (let i = 1; i <= projectionYears; i++) {
      projectedRevenue = projectedRevenue * (1 + revenueGrowthRate);
      projectedEBIT = projectedEBIT * (1 + revenueGrowthRate * 0.8); // EBIT grows slightly slower
      projectedCapex = projectedCapex * (1 + revenueGrowthRate * 0.5); // Capex grows slower

      // FCF = EBIT * (1 - Tax Rate) - Capex
      const fcf = projectedEBIT * (1 - taxRateValue) - projectedCapex;
      
      // Present Value = FCF / (1 + WACC)^year
      const pv = fcf / Math.pow(1 + wacc, i);

      projections.push({
        year: parseInt(latestYear) + i,
        revenue: projectedRevenue,
        ebit: projectedEBIT,
        capex: projectedCapex,
        fcf: fcf,
        pv: pv
      });
    }

    // Terminal Value
    const finalFCF = projections[projections.length - 1].fcf;
    const terminalValue = (finalFCF * (1 + terminalGrowthRate)) / (wacc - terminalGrowthRate);
    const pvTerminalValue = terminalValue / Math.pow(1 + wacc, projectionYears);

    // Enterprise Value
    const sumPVFCF = projections.reduce((sum, p) => sum + p.pv, 0);
    const enterpriseValue = sumPVFCF + pvTerminalValue;

    // Fair Value per Share (simplified - assuming shares outstanding)
    const shares = companyData.financialData?.find(m => 
      m.name?.toLowerCase().includes('issued shares') || 
      m.name?.toLowerCase().includes('shares outstanding')
    );
    const sharesOutstanding = shares?.values?.[latestYear] 
      ? parseFloat(shares.values[latestYear]) 
      : 100000000; // Default 100M shares

    const fairValuePerShare = enterpriseValue / sharesOutstanding;

    setDcfData({
      projections,
      terminalValue,
      pvTerminalValue,
      sumPVFCF,
      enterpriseValue,
      fairValuePerShare,
      assumptions: {
        revenueGrowthRate: revenueGrowthRate * 100,
        terminalGrowthRate: terminalGrowthRate * 100,
        wacc: wacc * 100,
        taxRate: taxRateValue * 100
      }
    });
  };

  const formatNumber = (value) => {
    if (!value || isNaN(value)) return '-';
    const num = parseFloat(value);
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link to={`/dashboard/companies/${id}`} className="text-sm text-blue-600 hover:underline mb-2 inline-block">
          ← Back to Company Profile
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Valuation (DCF)</h1>
        <p className="text-sm text-gray-600">
          {company.companyInfo?.name || 'Unnamed Company'} • Discounted Cash Flow Analysis
        </p>
      </div>

      {/* Key Results */}
      {dcfData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Enterprise Value</span>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(dcfData.enterpriseValue)}
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Fair Value per Share</span>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ${dcfData.fairValuePerShare.toFixed(2)}
              </p>
              {company.marketData?.sharePrice && (
                <p className={`text-xs mt-1 ${
                  parseFloat(dcfData.fairValuePerShare) > parseFloat(company.marketData.sharePrice)
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  Current: ${parseFloat(company.marketData.sharePrice).toFixed(2)}
                </p>
              )}
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">Terminal Value</span>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(dcfData.terminalValue)}
              </p>
            </div>
          </div>

          {/* Assumptions */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Assumptions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-xs text-gray-600">Revenue Growth Rate</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {dcfData.assumptions.revenueGrowthRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Terminal Growth Rate</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {dcfData.assumptions.terminalGrowthRate.toFixed(1)}%
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600">WACC</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {dcfData.assumptions.wacc.toFixed(1)}%
                </p>
              </div>
              <div>
                <span className="text-xs text-gray-600">Tax Rate</span>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {dcfData.assumptions.taxRate.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>

          {/* Free Cash Flow Projections */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Free Cash Flow Projections</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-gray-700">Year</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Revenue</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">EBIT</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Capex</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Free Cash Flow</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700">Present Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {dcfData.projections.map((proj, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 font-medium text-gray-900">FY{proj.year}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatNumber(proj.revenue)}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatNumber(proj.ebit)}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{formatNumber(proj.capex)}</td>
                      <td className="px-4 py-3 text-right font-medium text-gray-900">{formatNumber(proj.fcf)}</td>
                      <td className="px-4 py-3 text-right font-medium text-blue-600">{formatNumber(proj.pv)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan="4" className="px-4 py-3 text-right text-gray-700">Sum of PV of FCF</td>
                    <td className="px-4 py-3 text-right text-gray-900">{formatNumber(dcfData.sumPVFCF)}</td>
                    <td className="px-4 py-3 text-right text-blue-600">{formatNumber(dcfData.sumPVFCF)}</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td colSpan="4" className="px-4 py-3 text-right text-gray-700">PV of Terminal Value</td>
                    <td className="px-4 py-3 text-right text-gray-900">{formatNumber(dcfData.terminalValue)}</td>
                    <td className="px-4 py-3 text-right text-purple-600">{formatNumber(dcfData.pvTerminalValue)}</td>
                  </tr>
                  <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                    <td colSpan="4" className="px-4 py-3 text-right text-gray-900">Enterprise Value</td>
                    <td colSpan="2" className="px-4 py-3 text-right text-blue-600">
                      {formatNumber(dcfData.enterpriseValue)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Fair Value Chart Placeholder */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Fair Value per Share</h2>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Fair value chart visualization</p>
                <p className="text-xs text-gray-400 mt-1">
                  Fair Value: ${dcfData.fairValuePerShare.toFixed(2)}
                  {company.marketData?.sharePrice && (
                    <> • Current: ${parseFloat(company.marketData.sharePrice).toFixed(2)}</>
                  )}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Insufficient Data</h3>
          <p className="text-sm text-gray-600 mb-4">
            Unable to calculate DCF valuation. Please ensure financial data is available.
          </p>
          <Link to={`/dashboard/companies/${id}`} className="text-blue-600 hover:underline">
            Back to Company Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default ValuationDCF;

