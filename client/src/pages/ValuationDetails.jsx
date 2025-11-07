import React, { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { DollarSign, Download, Eye, Calculator, TrendingUp, Info, Percent, BarChart3, Settings, Layers } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ValuationDetails = () => {
  const { user } = useAuth();

  const [selectedScenario, setSelectedScenario] = useState('base');

  // Static DCF data with enhanced details
  const staticDcfData = {
    assumptions: {
      revenueGrowthRate: 5.0,
      ebitMargin: 25.7,
      wacc: 10.0,
      terminalGrowthRate: 3.0,
      taxRate: 30.0,
      beta: 1.15,
      riskFreeRate: 4.5,
      marketRiskPremium: 6.0,
      // WACC Derivation
      costOfEquity: 11.4, // CAPM: Rf + β × (Rm - Rf) = 4.5 + 1.15 × 6.0
      costOfDebt: 5.5,
      afterTaxCostOfDebt: 3.85, // 5.5 × (1 - 0.30)
      equityWeight: 0.714, // 71.4%
      debtWeight: 0.286, // 28.6%
      // Working Capital Assumptions
      dso: 45, // Days Sales Outstanding
      dio: 60, // Days Inventory Outstanding
      dpo: 30, // Days Payable Outstanding
      // CapEx Detail
      maintenanceCapex: 0.10, // 10% of revenue
      growthCapex: 0.05 // 5% of revenue
    },
    projections: [
      { 
        year: 2024, 
        revenue: 1102500000,
        ebit: 280000000,
        nopat: 196000000, // EBIT × (1 - Tax Rate)
        depreciation: 40000000,
        deltaNWC: -15000000, // Change in Net Working Capital
        maintenanceCapex: 110250000,
        growthCapex: 55125000,
        totalCapex: 165375000,
        fcf: 95000000,
        discountFactor: 0.9091,
        pv: 86364500
      },
      { 
        year: 2025, 
        revenue: 1157625000,
        ebit: 294000000,
        nopat: 205800000,
        depreciation: 42000000,
        deltaNWC: -15750000,
        maintenanceCapex: 115762500,
        growthCapex: 57881250,
        totalCapex: 173643750,
        fcf: 99750000,
        discountFactor: 0.8264,
        pv: 82409400
      },
      { 
        year: 2026, 
        revenue: 1215506250,
        ebit: 308700000,
        nopat: 216090000,
        depreciation: 44100000,
        deltaNWC: -16537500,
        maintenanceCapex: 121550625,
        growthCapex: 60775313,
        totalCapex: 182325938,
        fcf: 104737500,
        discountFactor: 0.7513,
        pv: 78688819
      },
      { 
        year: 2027, 
        revenue: 1276281563,
        ebit: 324135000,
        nopat: 226894500,
        depreciation: 46305000,
        deltaNWC: -17364375,
        maintenanceCapex: 127628156,
        growthCapex: 63814078,
        totalCapex: 191442234,
        fcf: 109974375,
        discountFactor: 0.6830,
        pv: 75080500
      },
      { 
        year: 2028, 
        revenue: 1340095641,
        ebit: 340341750,
        nopat: 238239225,
        depreciation: 48620250,
        deltaNWC: -18232594,
        maintenanceCapex: 134009564,
        growthCapex: 67004782,
        totalCapex: 201014346,
        fcf: 115473094,
        discountFactor: 0.6209,
        pv: 71677000
      }
    ],
    terminalValue: {
      perpetuityGrowth: 1695000000,
      exitMultiple: 1650000000, // Using EV/EBITDA multiple of 5.5x
      selected: 'perpetuityGrowth'
    },
    pvTerminalValue: 1053000000,
    sumPVFCF: 394220219,
    enterpriseValue: 1447220219,
    equityValue: 1447220219,
    fairValuePerShare: 9.85,
    currentPrice: 8.50,
    sharesOutstanding: 1550000000,
    // Granular Revenue Model
    revenueSegments: [
      { segment: 'Construction Services', revenue: 735000000, percentage: 70.0 },
      { segment: 'Infrastructure Projects', revenue: 210000000, percentage: 20.0 },
      { segment: 'Maintenance & Services', revenue: 105000000, percentage: 10.0 }
    ],
    // Scenarios
    scenarios: {
      bull: {
        name: 'Bull Case',
        revenueGrowth: 7.0,
        ebitMargin: 27.0,
        wacc: 9.5,
        fairValuePerShare: 11.20,
        enterpriseValue: 17360000000
      },
      base: {
        name: 'Base Case',
        revenueGrowth: 5.0,
        ebitMargin: 25.7,
        wacc: 10.0,
        fairValuePerShare: 9.85,
        enterpriseValue: 15250000000
      },
      bear: {
        name: 'Bear Case',
        revenueGrowth: 3.0,
        ebitMargin: 24.0,
        wacc: 10.5,
        fairValuePerShare: 8.50,
        enterpriseValue: 13175000000
      }
    },
    // Sensitivity Analysis Matrix
    sensitivityMatrix: {
      waccRange: [9.0, 9.5, 10.0, 10.5, 11.0],
      growthRange: [3.0, 4.0, 5.0, 6.0, 7.0],
      values: [
        [16500, 17000, 17500, 18000, 18500], // WACC 9.0%
        [15800, 16250, 16700, 17150, 17600], // WACC 9.5%
        [15250, 15650, 16050, 16450, 16850], // WACC 10.0% (Base)
        [14700, 15100, 15500, 15900, 16300], // WACC 10.5%
        [14200, 14600, 15000, 15400, 15800]  // WACC 11.0%
      ]
    }
  };

  const formatNumber = (value) => {
    if (!value || isNaN(value)) return '-';
    const num = parseFloat(value);
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const handleDownloadReport = () => {
    alert('Valuation report download will be implemented with PDF generation library');
  };

  // FCF Projection Chart
  const fcfChartData = useMemo(() => ({
    labels: staticDcfData.projections.map(p => `FY${p.year}`),
    datasets: [{
      label: 'Free Cash Flow (Millions)',
      data: staticDcfData.projections.map(p => p.fcf / 1000000),
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }]
  }), []);

  // PV Contribution Chart
  const pvChartData = useMemo(() => ({
    labels: [
      ...staticDcfData.projections.map(p => `FY${p.year}`),
      'Terminal Value'
    ],
    datasets: [{
      label: 'Present Value Contribution (Millions)',
      data: [
        ...staticDcfData.projections.map(p => p.pv / 1000000),
        staticDcfData.pvTerminalValue / 1000000
      ],
      backgroundColor: [
        ...staticDcfData.projections.map(() => 'rgba(16, 185, 129, 0.8)'),
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        ...staticDcfData.projections.map(() => 'rgb(16, 185, 129)'),
        'rgb(139, 92, 246)'
      ],
      borderWidth: 2
    }]
  }), []);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 10, weight: '500' },
          padding: 8,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 10,
        titleFont: { size: 11, weight: '600' },
        bodyFont: { size: 10 },
        cornerRadius: 6,
        displayColors: true
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 9 },
          padding: 6
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        }
      },
      x: {
        ticks: {
          font: { size: 9 },
          padding: 6
        },
        grid: {
          display: false
        }
      }
    }
  }), []);

  const valuationPremium = ((staticDcfData.fairValuePerShare - staticDcfData.currentPrice) / staticDcfData.currentPrice) * 100;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">Valuation Details (DCF Overview)</h1>
        <p className="text-xs text-gray-600">View how your company's valuation was derived</p>
      </div>

      {/* Key Valuation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Enterprise Value</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatNumber(staticDcfData.enterpriseValue)}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-500 rounded-lg">
              <Calculator className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Fair Value/Share</p>
          </div>
          <p className="text-lg font-bold text-gray-900">${staticDcfData.fairValuePerShare.toFixed(2)}</p>
          {valuationPremium > 0 && (
            <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-2.5 w-2.5" />
              {valuationPremium.toFixed(1)}% premium
            </p>
          )}
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-purple-500 rounded-lg">
              <Info className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Current Price</p>
          </div>
          <p className="text-lg font-bold text-gray-900">${staticDcfData.currentPrice.toFixed(2)}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-orange-500 rounded-lg">
              <Calculator className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Terminal Value</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{formatNumber(staticDcfData.terminalValue)}</p>
        </div>
      </div>

      {/* Download Options */}
      <div className="bg-white border border-gray-200 rounded-lg p-2 flex gap-2">
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded"
        >
          <Download className="h-3 w-3" />
          Download Full Report (PDF)
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors rounded">
          <Eye className="h-3 w-3" />
          View Assumptions
        </button>
      </div>

      {/* Valuation Inputs */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Valuation Inputs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div>
            <p className="text-[10px] text-gray-600 mb-1">Revenue Growth</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.revenueGrowthRate.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-1">EBIT Margin</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.ebitMargin.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-1">WACC</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.wacc.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-1">Terminal Growth</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.terminalGrowthRate.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-1">Tax Rate</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.taxRate.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-1">Beta</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.beta.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-1">Risk-Free Rate</p>
            <p className="text-sm font-semibold text-gray-900">
              {staticDcfData.assumptions.riskFreeRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      {/* WACC Derivation Module */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">WACC Derivation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cost of Equity (CAPM) */}
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-2">Cost of Equity (CAPM)</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Risk-Free Rate (Rf):</span>
                <span className="font-semibold">{staticDcfData.assumptions.riskFreeRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Beta (β):</span>
                <span className="font-semibold">{staticDcfData.assumptions.beta.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Market Risk Premium:</span>
                <span className="font-semibold">{staticDcfData.assumptions.marketRiskPremium.toFixed(1)}%</span>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">Formula: Rf + β × (Rm - Rf)</span>
                </div>
                <div className="mt-1 text-[10px] text-gray-600">
                  = {staticDcfData.assumptions.riskFreeRate.toFixed(1)}% + {staticDcfData.assumptions.beta.toFixed(2)} × {staticDcfData.assumptions.marketRiskPremium.toFixed(1)}%
                </div>
                <div className="mt-1 text-sm font-bold text-blue-600">
                  = {staticDcfData.assumptions.costOfEquity.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>

          {/* Cost of Debt & WACC Calculation */}
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <h3 className="text-xs font-semibold text-gray-900 mb-2">Cost of Debt & WACC</h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Pre-tax Cost of Debt:</span>
                <span className="font-semibold">{staticDcfData.assumptions.costOfDebt.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax Rate:</span>
                <span className="font-semibold">{staticDcfData.assumptions.taxRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">After-tax Cost of Debt:</span>
                <span className="font-semibold">{staticDcfData.assumptions.afterTaxCostOfDebt.toFixed(2)}%</span>
              </div>
              <div className="pt-2 border-t border-green-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Equity Weight:</span>
                  <span className="font-semibold">{(staticDcfData.assumptions.equityWeight * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Debt Weight:</span>
                  <span className="font-semibold">{(staticDcfData.assumptions.debtWeight * 100).toFixed(1)}%</span>
                </div>
                <div className="pt-1 border-t border-green-200">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">WACC:</span>
                    <span className="text-sm font-bold text-green-600">
                      {staticDcfData.assumptions.wacc.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Computation Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Enhanced Computation Table (EBIT → NOPAT → FCF)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-700">Year</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">Revenue</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">EBIT</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">NOPAT</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">+ D&A</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">- ΔNWC</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">- CapEx</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">FCF</th>
                <th className="px-2 py-2 text-right font-medium text-gray-700">PV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staticDcfData.projections.map((proj, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-2 py-2 font-medium text-gray-900">FY{proj.year}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{formatNumber(proj.revenue)}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{formatNumber(proj.ebit)}</td>
                  <td className="px-2 py-2 text-right text-gray-700">{formatNumber(proj.nopat)}</td>
                  <td className="px-2 py-2 text-right text-green-600">{formatNumber(proj.depreciation)}</td>
                  <td className="px-2 py-2 text-right text-red-600">{formatNumber(proj.deltaNWC)}</td>
                  <td className="px-2 py-2 text-right text-red-600">{formatNumber(proj.totalCapex)}</td>
                  <td className="px-2 py-2 text-right font-medium text-blue-600">{formatNumber(proj.fcf)}</td>
                  <td className="px-2 py-2 text-right font-medium text-purple-600">{formatNumber(proj.pv)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="7" className="px-2 py-2 text-right text-gray-700">Sum of PV of FCF</td>
                <td className="px-2 py-2 text-right text-blue-600">{formatNumber(staticDcfData.sumPVFCF)}</td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td colSpan="7" className="px-2 py-2 text-right text-gray-700">PV of Terminal Value</td>
                <td className="px-2 py-2 text-right text-purple-600">{formatNumber(staticDcfData.pvTerminalValue)}</td>
              </tr>
              <tr className="bg-blue-50 font-bold border-t-2 border-blue-200">
                <td colSpan="7" className="px-2 py-2 text-right text-gray-900">Enterprise Value</td>
                <td className="px-2 py-2 text-right text-blue-600">{formatNumber(staticDcfData.enterpriseValue)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Granular Revenue Model & Working Capital Assumptions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Granular Revenue Model */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Granular Revenue Model</h3>
          <div className="space-y-2">
            {staticDcfData.revenueSegments.map((segment, idx) => (
              <div key={idx} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-900">{segment.segment}</span>
                  <span className="text-xs font-semibold text-gray-900">{segment.percentage.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-600">Revenue</span>
                  <span className="text-xs font-bold text-blue-600">{formatNumber(segment.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Working Capital Assumptions */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Working Capital Assumptions</h3>
          <div className="space-y-2">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Days Sales Outstanding (DSO)</span>
                <span className="text-sm font-bold text-blue-600">{staticDcfData.assumptions.dso} days</span>
              </div>
            </div>
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Days Inventory Outstanding (DIO)</span>
                <span className="text-sm font-bold text-green-600">{staticDcfData.assumptions.dio} days</span>
              </div>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Days Payable Outstanding (DPO)</span>
                <span className="text-sm font-bold text-purple-600">{staticDcfData.assumptions.dpo} days</span>
              </div>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg border border-orange-200 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-700">Cash Conversion Cycle</span>
                <span className="text-sm font-bold text-orange-600">
                  {staticDcfData.assumptions.dso + staticDcfData.assumptions.dio - staticDcfData.assumptions.dpo} days
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CapEx Detail & Terminal Value Methods */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* CapEx Detail */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">CapEx Breakdown</h3>
          <div className="space-y-2">
            {staticDcfData.projections.slice(0, 3).map((proj, idx) => (
              <div key={idx} className="p-2 bg-gray-50 rounded-lg">
                <div className="text-xs font-medium text-gray-900 mb-1">FY{proj.year}</div>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Maintenance CapEx:</span>
                    <span className="font-semibold text-gray-900">{formatNumber(proj.maintenanceCapex)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth CapEx:</span>
                    <span className="font-semibold text-gray-900">{formatNumber(proj.growthCapex)}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-gray-200">
                    <span className="font-medium text-gray-700">Total CapEx:</span>
                    <span className="font-bold text-blue-600">{formatNumber(proj.totalCapex)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal Value Methods Comparison */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Terminal Value Methods</h3>
          <div className="space-y-2">
            <div className={`p-2 rounded-lg border ${staticDcfData.terminalValue.selected === 'perpetuityGrowth' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-900">Perpetuity Growth Method</span>
                {staticDcfData.terminalValue.selected === 'perpetuityGrowth' && (
                  <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Selected</span>
                )}
              </div>
              <div className="text-xs font-bold text-blue-600">{formatNumber(staticDcfData.terminalValue.perpetuityGrowth)}</div>
            </div>
            <div className={`p-2 rounded-lg border ${staticDcfData.terminalValue.selected === 'exitMultiple' ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-900">Exit Multiple Method</span>
                {staticDcfData.terminalValue.selected === 'exitMultiple' && (
                  <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded">Selected</span>
                )}
              </div>
              <div className="text-xs font-bold text-green-600">{formatNumber(staticDcfData.terminalValue.exitMultiple)}</div>
              <div className="text-[10px] text-gray-600 mt-1">Using EV/EBITDA multiple of 5.5x</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario & Sensitivity Analysis */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Scenario Analysis</h2>
        <div className="flex gap-2 mb-3">
          {Object.entries(staticDcfData.scenarios).map(([key, scenario]) => (
            <button
              key={key}
              onClick={() => setSelectedScenario(key)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                selectedScenario === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {scenario.name}
            </button>
          ))}
        </div>
        {staticDcfData.scenarios[selectedScenario] && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Revenue Growth</p>
              <p className="text-sm font-bold text-gray-900">{staticDcfData.scenarios[selectedScenario].revenueGrowth.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">EBIT Margin</p>
              <p className="text-sm font-bold text-gray-900">{staticDcfData.scenarios[selectedScenario].ebitMargin.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">WACC</p>
              <p className="text-sm font-bold text-gray-900">{staticDcfData.scenarios[selectedScenario].wacc.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Fair Value/Share</p>
              <p className="text-sm font-bold text-blue-600">${staticDcfData.scenarios[selectedScenario].fairValuePerShare.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Enterprise Value</p>
              <p className="text-sm font-bold text-green-600">{formatNumber(staticDcfData.scenarios[selectedScenario].enterpriseValue)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Sensitivity Analysis Matrix */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Sensitivity Analysis Matrix (Enterprise Value in $M)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[10px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-700">WACC \ Growth</th>
                {staticDcfData.sensitivityMatrix.growthRange.map(g => (
                  <th key={g} className="px-2 py-2 text-right font-medium text-gray-700">{g.toFixed(1)}%</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {staticDcfData.sensitivityMatrix.waccRange.map((wacc, wIdx) => (
                <tr key={wacc} className={wacc === staticDcfData.assumptions.wacc ? 'bg-blue-50' : 'hover:bg-gray-50'}>
                  <td className="px-2 py-2 font-medium text-gray-900">{wacc.toFixed(1)}%</td>
                  {staticDcfData.sensitivityMatrix.values[wIdx].map((val, gIdx) => (
                    <td 
                      key={gIdx} 
                      className={`px-2 py-2 text-right ${
                        wacc === staticDcfData.assumptions.wacc && 
                        staticDcfData.sensitivityMatrix.growthRange[gIdx] === staticDcfData.assumptions.revenueGrowthRate
                          ? 'font-bold text-blue-600 bg-blue-100'
                          : 'text-gray-700'
                      }`}
                    >
                      ${val.toLocaleString()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[10px] text-gray-500 mt-2">Base case highlighted in blue</p>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* FCF Projection Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">FCF Projection</h3>
          <div className="h-56">
            <Line 
              data={fcfChartData} 
              options={chartOptions}
              key="fcf-chart"
              id="fcf-chart"
            />
          </div>
        </div>

        {/* PV Contribution Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">PV Contribution</h3>
          <div className="h-56">
            <Bar 
              data={pvChartData} 
              options={chartOptions}
              key="pv-chart"
              id="pv-chart"
            />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Fair Value per Share */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Fair Value per Share</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-gray-600">Calculated Fair Value</span>
              <span className="text-xl font-bold text-blue-600">
                ${staticDcfData.fairValuePerShare.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
              <span className="text-xs text-gray-600">Current Market Price</span>
              <span className="text-xl font-bold text-gray-900">
                ${staticDcfData.currentPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <span className="text-xs text-gray-600">Valuation Premium/(Discount)</span>
              <span className={`text-lg font-bold ${valuationPremium >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {valuationPremium >= 0 ? '+' : ''}{valuationPremium.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Key Assumptions Summary */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">Key Assumptions Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-[10px] text-gray-600">Projection Period</span>
              <span className="text-xs font-semibold text-gray-900">5 Years</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-[10px] text-gray-600">Terminal Value Method</span>
              <span className="text-xs font-semibold text-gray-900">Perpetuity Growth</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
              <span className="text-[10px] text-gray-600">Shares Outstanding</span>
              <span className="text-xs font-semibold text-gray-900">{formatNumber(staticDcfData.sharesOutstanding)}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-[10px] text-gray-600">Market Risk Premium</span>
              <span className="text-xs font-semibold text-gray-900">{staticDcfData.assumptions.marketRiskPremium.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationDetails;
