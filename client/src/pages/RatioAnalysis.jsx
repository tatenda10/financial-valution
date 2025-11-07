import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart3, DollarSign, Target } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const RatioAnalysis = () => {
  const { user } = useAuth();

  // Static ratio data
  const staticRatios = {
    years: ['2019', '2020', '2021', '2022', '2023'],
    profitability: {
      roe: [52.94, 54.17, 55.26, 56.25, 57.14],
      roic: [58.82, 60.00, 61.05, 62.07, 63.16],
      ebitMargin: [24.71, 25.00, 25.26, 25.50, 25.71],
      netProfitMargin: [21.18, 21.67, 22.11, 22.50, 22.86],
      grossMargin: [35.00, 35.50, 36.00, 36.50, 37.00]
    },
    liquidity: {
      currentRatio: [1.75, 1.78, 1.80, 1.82, 1.85],
      quickRatio: [1.20, 1.22, 1.24, 1.26, 1.28],
      cashRatio: [0.45, 0.47, 0.49, 0.51, 0.53]
    },
    valuation: {
      pe: [4.72, 4.62, 4.52, 4.44, 4.36],
      pb: [2.50, 2.48, 2.45, 2.43, 2.40],
      evEbitda: [42.50, 42.00, 41.50, 41.00, 40.50],
      priceToSales: [1.24, 1.22, 1.20, 1.18, 1.16]
    },
    growth: {
      revenueGrowth: [5.88, 5.56, 5.26, 5.00],
      profitGrowth: [8.33, 7.69, 7.14, 6.67],
      assetGrowth: [8.33, 7.69, 7.14, 6.67]
    },
    leverage: {
      debtToEquity: [0.40, 0.40, 0.40, 0.40, 0.40],
      debtToAssets: [0.11, 0.11, 0.11, 0.11, 0.11],
      equityRatio: [0.28, 0.28, 0.27, 0.27, 0.26],
      debtToEbitda: [0.54, 0.54, 0.54, 0.54, 0.54],
      interestCoverage: [14.0, 14.4, 14.7, 15.0, 14.2]
    },
    // Advanced Metrics
    advanced: {
      ccc: [75, 75, 75, 75, 75], // Cash Conversion Cycle (DSO + DIO - DPO)
      rotce: [60.0, 61.5, 63.0, 64.5, 66.0], // Return on Tangible Common Equity
      evInvestedCapital: [3.45, 3.50, 3.55, 3.60, 3.65],
      peg: [0.87, 0.85, 0.83, 0.81, 0.79] // P/E to Growth
    },
    // DuPont Analysis Components
    dupont: {
      netProfitMargin: [21.18, 21.67, 22.11, 22.50, 22.86],
      assetTurnover: [0.71, 0.69, 0.68, 0.67, 0.66],
      equityMultiplier: [3.53, 3.61, 3.68, 3.75, 3.81]
    },
    // ROIC vs WACC
    roicWacc: {
      roic: [58.82, 60.00, 61.05, 62.07, 63.16],
      wacc: [10.2, 10.1, 10.05, 10.0, 10.0]
    }
  };

  const getScoreColor = (value, thresholds, reverse = false) => {
    if (value === undefined || value === null) return null;
    const good = reverse ? thresholds.ok : thresholds.good;
    const ok = reverse ? thresholds.good : thresholds.ok;
    if (value >= good) return 'green';
    if (value >= ok) return 'yellow';
    return 'red';
  };

  const getScoreIcon = (color) => {
    switch (color) {
      case 'green':
        return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'yellow':
        return <AlertCircle className="h-3 w-3 text-yellow-600" />;
      case 'red':
        return <XCircle className="h-3 w-3 text-red-600" />;
      default:
        return null;
    }
  };

  // ROE Trend Chart
  const roeChartData = useMemo(() => ({
    labels: staticRatios.years.map(y => `FY${y}`),
    datasets: [{
      label: 'ROE %',
      data: staticRatios.profitability.roe,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }]
  }), []);

  // EBIT Margin Trend Chart
  const ebitMarginChartData = useMemo(() => ({
    labels: staticRatios.years.map(y => `FY${y}`),
    datasets: [{
      label: 'EBIT Margin %',
      data: staticRatios.profitability.ebitMargin,
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 2
    }]
  }), []);

  // Net Profit Margin Trend Chart
  const netProfitMarginChartData = useMemo(() => ({
    labels: staticRatios.years.map(y => `FY${y}`),
    datasets: [{
      label: 'Net Profit Margin %',
      data: staticRatios.profitability.netProfitMargin,
      borderColor: 'rgb(139, 92, 246)',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
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

  const ratioDefinitions = [
    {
      name: 'ROE (Return on Equity)',
      value: staticRatios.profitability.roe[4],
      unit: '%',
      thresholds: { good: 15, ok: 10 },
      description: 'Measures profitability relative to shareholders\' equity',
      category: 'Profitability',
      icon: TrendingUp
    },
    {
      name: 'ROIC (Return on Invested Capital)',
      value: staticRatios.profitability.roic[4],
      unit: '%',
      thresholds: { good: 12, ok: 8 },
      description: 'Measures return on total capital invested',
      category: 'Profitability',
      icon: Target
    },
    {
      name: 'EBIT Margin',
      value: staticRatios.profitability.ebitMargin[4],
      unit: '%',
      thresholds: { good: 15, ok: 10 },
      description: 'Operating profit as percentage of revenue',
      category: 'Profitability',
      icon: BarChart3
    },
    {
      name: 'Net Profit Margin',
      value: staticRatios.profitability.netProfitMargin[4],
      unit: '%',
      thresholds: { good: 10, ok: 5 },
      description: 'Net profit as percentage of revenue',
      category: 'Profitability',
      icon: DollarSign
    },
    {
      name: 'Gross Margin',
      value: staticRatios.profitability.grossMargin[4],
      unit: '%',
      thresholds: { good: 30, ok: 20 },
      description: 'Gross profit as percentage of revenue',
      category: 'Profitability',
      icon: BarChart3
    },
    {
      name: 'Current Ratio',
      value: staticRatios.liquidity.currentRatio[4],
      unit: 'x',
      thresholds: { good: 2, ok: 1.5 },
      description: 'Current assets to current liabilities',
      category: 'Liquidity',
      icon: TrendingUp
    },
    {
      name: 'Quick Ratio',
      value: staticRatios.liquidity.quickRatio[4],
      unit: 'x',
      thresholds: { good: 1.5, ok: 1.0 },
      description: 'Quick assets to current liabilities',
      category: 'Liquidity',
      icon: TrendingUp
    },
    {
      name: 'Cash Ratio',
      value: staticRatios.liquidity.cashRatio[4],
      unit: 'x',
      thresholds: { good: 0.5, ok: 0.3 },
      description: 'Cash and equivalents to current liabilities',
      category: 'Liquidity',
      icon: DollarSign
    },
    {
      name: 'P/E Ratio',
      value: staticRatios.valuation.pe[4],
      unit: 'x',
      thresholds: { good: 15, ok: 25 },
      description: 'Price to earnings multiple',
      category: 'Valuation',
      reverse: true,
      icon: DollarSign
    },
    {
      name: 'P/B Ratio',
      value: staticRatios.valuation.pb[4],
      unit: 'x',
      thresholds: { good: 2, ok: 3 },
      description: 'Price to book value multiple',
      category: 'Valuation',
      reverse: true,
      icon: BarChart3
    },
    {
      name: 'EV/EBITDA',
      value: staticRatios.valuation.evEbitda[4],
      unit: 'x',
      thresholds: { good: 10, ok: 15 },
      description: 'Enterprise value to EBITDA multiple',
      category: 'Valuation',
      reverse: true,
      icon: Target
    },
    {
      name: 'Price to Sales',
      value: staticRatios.valuation.priceToSales[4],
      unit: 'x',
      thresholds: { good: 1, ok: 2 },
      description: 'Market cap to revenue multiple',
      category: 'Valuation',
      reverse: true,
      icon: DollarSign
    },
    {
      name: 'Revenue Growth',
      value: staticRatios.growth.revenueGrowth[3],
      unit: '%',
      thresholds: { good: 10, ok: 5 },
      description: 'Year-over-year revenue growth rate',
      category: 'Growth',
      icon: TrendingUp
    },
    {
      name: 'Debt to Equity',
      value: staticRatios.leverage.debtToEquity[4],
      unit: 'x',
      thresholds: { good: 0.5, ok: 1.0 },
      description: 'Total debt to shareholders\' equity',
      category: 'Leverage',
      reverse: true,
      icon: BarChart3
    }
  ];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">Ratio Analysis</h1>
        <p className="text-xs text-gray-600">Present detailed ratios calculated from financial data</p>
      </div>

      {/* Key Ratios Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-blue-500 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">ROE</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{staticRatios.profitability.roe[4].toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-green-500 rounded-lg">
              <Target className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">ROIC</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{staticRatios.profitability.roic[4].toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-purple-500 rounded-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">EBIT Margin</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{staticRatios.profitability.ebitMargin[4].toFixed(1)}%</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-orange-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">P/E Ratio</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{staticRatios.valuation.pe[4].toFixed(2)}x</p>
        </div>
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-pink-500 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <p className="text-[10px] font-medium text-gray-600">Current Ratio</p>
          </div>
          <p className="text-lg font-bold text-gray-900">{staticRatios.liquidity.currentRatio[4].toFixed(2)}x</p>
        </div>
      </div>

      {/* Ratio Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">ROE Trend</h3>
          <div className="h-48">
            <Line 
              data={roeChartData}
              options={chartOptions}
              key="roe-chart"
              id="roe-chart"
            />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">EBIT Margin Trend</h3>
          <div className="h-48">
            <Line 
              data={ebitMarginChartData}
              options={chartOptions}
              key="ebit-margin-chart"
              id="ebit-margin-chart"
            />
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Net Profit Margin Trend</h3>
          <div className="h-48">
            <Line 
              data={netProfitMarginChartData}
              options={chartOptions}
              key="net-profit-margin-chart"
              id="net-profit-margin-chart"
            />
          </div>
        </div>
      </div>

      {/* Financial Ratios by Category */}
      {['Profitability', 'Liquidity', 'Valuation', 'Growth', 'Leverage'].map(category => {
        const categoryRatios = ratioDefinitions.filter(r => r.category === category);
        if (categoryRatios.length === 0) return null;

        return (
          <div key={category} className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">{category} Ratios</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryRatios.map((ratio, idx) => {
                const scoreColor = ratio.value !== undefined
                  ? getScoreColor(
                      ratio.value,
                      ratio.reverse
                        ? { good: ratio.thresholds.ok, ok: ratio.thresholds.good }
                        : ratio.thresholds,
                      ratio.reverse
                    )
                  : null;
                const Icon = ratio.icon;

                return (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-2 flex-1">
                        <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                          <Icon className="h-3 w-3 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xs font-semibold text-gray-900">{ratio.name}</h3>
                          <p className="text-[10px] text-gray-500 mt-0.5">{ratio.description}</p>
                        </div>
                      </div>
                      {scoreColor && getScoreIcon(scoreColor)}
                    </div>
                    <div className="mt-2">
                      <p className={`text-xl font-bold ${
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
          </div>
        );
      })}

      {/* Advanced Metrics Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Advanced Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-[10px] text-gray-600 mb-0.5">Cash Conversion Cycle (CCC)</p>
            <p className="text-lg font-bold text-blue-600">{staticRatios.advanced.ccc[4]} days</p>
          </div>
          <div className="p-2 bg-green-50 rounded-lg border border-green-200">
            <p className="text-[10px] text-gray-600 mb-0.5">ROTCE</p>
            <p className="text-lg font-bold text-green-600">{staticRatios.advanced.rotce[4].toFixed(1)}%</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-[10px] text-gray-600 mb-0.5">EV/Invested Capital</p>
            <p className="text-lg font-bold text-purple-600">{staticRatios.advanced.evInvestedCapital[4].toFixed(2)}x</p>
          </div>
          <div className="p-2 bg-orange-50 rounded-lg border border-orange-200">
            <p className="text-[10px] text-gray-600 mb-0.5">PEG Ratio</p>
            <p className="text-lg font-bold text-orange-600">{staticRatios.advanced.peg[4].toFixed(2)}x</p>
          </div>
          <div className="p-2 bg-red-50 rounded-lg border border-red-200">
            <p className="text-[10px] text-gray-600 mb-0.5">Debt/EBITDA</p>
            <p className="text-lg font-bold text-red-600">{staticRatios.leverage.debtToEbitda[4].toFixed(2)}x</p>
          </div>
          <div className="p-2 bg-indigo-50 rounded-lg border border-indigo-200">
            <p className="text-[10px] text-gray-600 mb-0.5">Interest Coverage</p>
            <p className="text-lg font-bold text-indigo-600">{staticRatios.leverage.interestCoverage[4].toFixed(1)}x</p>
          </div>
        </div>
      </div>

      {/* DuPont Analysis & ROIC vs WACC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* DuPont Analysis Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">DuPont Analysis (ROE Breakdown)</h3>
          <div className="h-56">
            <Line 
              data={{
                labels: staticRatios.years.map(y => `FY${y}`),
                datasets: [
                  {
                    label: 'Net Profit Margin %',
                    data: staticRatios.dupont.netProfitMargin,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                  },
                  {
                    label: 'Asset Turnover',
                    data: staticRatios.dupont.assetTurnover.map(v => v * 100), // Scale for visibility
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                  },
                  {
                    label: 'Equity Multiplier',
                    data: staticRatios.dupont.equityMultiplier.map(v => v * 10), // Scale for visibility
                    borderColor: 'rgb(139, 92, 246)',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                  }
                ]
              }}
              options={chartOptions}
              key="dupont-chart"
              id="dupont-chart"
            />
          </div>
          <div className="mt-2 text-[10px] text-gray-600">
            <p>ROE = Net Profit Margin × Asset Turnover × Equity Multiplier</p>
            <p className="mt-1">
              Latest: {staticRatios.dupont.netProfitMargin[4].toFixed(2)}% × {staticRatios.dupont.assetTurnover[4].toFixed(2)} × {staticRatios.dupont.equityMultiplier[4].toFixed(2)} = {staticRatios.profitability.roe[4].toFixed(1)}%
            </p>
          </div>
        </div>

        {/* ROIC vs WACC Gauge */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">ROIC vs WACC</h3>
          <div className="h-56 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto">
                {/* Simple gauge visualization */}
                <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                <div 
                  className="absolute inset-0 rounded-full border-8 border-green-500"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${50 + (staticRatios.roicWacc.roic[4] / 100) * 50}% 0%)`,
                    transform: 'rotate(-90deg)'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1">ROIC</p>
                    <p className="text-2xl font-bold text-green-600">{staticRatios.roicWacc.roic[4].toFixed(1)}%</p>
                    <p className="text-xs text-gray-600 mt-2">WACC</p>
                    <p className="text-lg font-semibold text-red-600">{staticRatios.roicWacc.wacc[4].toFixed(1)}%</p>
                    <p className="text-[10px] text-green-600 mt-2 font-medium">
                      Spread: {(staticRatios.roicWacc.roic[4] - staticRatios.roicWacc.wacc[4]).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-[10px] text-gray-600 text-center">
            <p>ROIC significantly exceeds WACC, indicating strong value creation</p>
          </div>
        </div>
      </div>

      {/* Gauge Indicators Legend */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h3 className="text-xs font-semibold text-blue-900 mb-2">Scoring System</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[10px]">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-blue-800">Good: Meets or exceeds target threshold</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3 text-yellow-600" />
            <span className="text-blue-800">Fair: Below target but acceptable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <XCircle className="h-3 w-3 text-red-600" />
            <span className="text-blue-800">Poor: Below acceptable threshold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatioAnalysis;
