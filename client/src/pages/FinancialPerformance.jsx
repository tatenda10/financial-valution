import React, { useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Activity, Target, TrendingUp as TrendUp } from 'lucide-react';
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

const FinancialPerformance = () => {
  const { user } = useAuth();

  // Static financial data with forecast
  const staticData = {
    years: ['2019', '2020', '2021', '2022', '2023'],
    forecastYears: ['2024', '2025', '2026'],
    allYears: ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    financials: {
      revenue: [850000000, 900000000, 950000000, 1000000000, 1050000000],
      ebit: [210000000, 225000000, 240000000, 255000000, 270000000],
      ebitda: [250000000, 265000000, 280000000, 295000000, 310000000],
      netProfit: [180000000, 195000000, 210000000, 225000000, 240000000],
      capex: [85000000, 90000000, 95000000, 100000000, 105000000],
      interestExpense: [12000000, 13000000, 14000000, 15000000, 16000000],
      totalAssets: [1200000000, 1300000000, 1400000000, 1500000000, 1600000000],
      totalEquity: [340000000, 360000000, 380000000, 400000000, 420000000],
      totalDebt: [136000000, 144000000, 152000000, 160000000, 168000000]
    },
    forecast: {
      revenue: [1102500000, 1157625000, 1215506250],
      ebit: [280000000, 294000000, 308700000],
      ebitda: [310000000, 325500000, 341775000],
      netProfit: [250000000, 262500000, 275625000],
      capex: [110250000, 115762500, 121550625]
    },
    margins: {
      ebitMargin: [24.71, 25.00, 25.26, 25.50, 25.71],
      ebitdaMargin: [29.41, 29.44, 29.47, 29.50, 29.52],
      netProfitMargin: [21.18, 21.67, 22.11, 22.50, 22.86]
    },
    growthRates: [5.88, 5.56, 5.26, 5.00], // YoY revenue growth
    // Sources & Uses of Cash
    sourcesUses: {
      sources: {
        netIncome: 240000000,
        depreciation: 40000000,
        debtIssuance: 50000000,
        equityIssuance: 0
      },
      uses: {
        capex: 105000000,
        debtRepayment: 30000000,
        dividends: 120000000,
        workingCapital: 15000000
      }
    },
    // ROIC vs WACC
    roicWacc: {
      years: ['2019', '2020', '2021', '2022', '2023'],
      roic: [58.82, 60.00, 61.05, 62.07, 63.16],
      wacc: [10.2, 10.1, 10.05, 10.0, 10.0]
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

  // Revenue & Profit Trend Chart
  const revenueChartData = useMemo(() => ({
    labels: staticData.years.map(y => `FY${y}`),
    datasets: [
      {
        label: 'Revenue (Millions)',
        data: staticData.financials.revenue.map(v => v / 1000000),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        yAxisID: 'y'
      },
      {
        label: 'Net Profit (Millions)',
        data: staticData.financials.netProfit.map(v => v / 1000000),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        yAxisID: 'y'
      }
    ]
  }), []);

  // Margin Analysis Chart
  const marginChartData = useMemo(() => ({
    labels: staticData.years.map(y => `FY${y}`),
    datasets: [
      {
        label: 'EBIT Margin %',
        data: staticData.margins.ebitMargin,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'EBITDA Margin %',
        data: staticData.margins.ebitdaMargin,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'Net Profit Margin %',
        data: staticData.margins.netProfitMargin,
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  }), []);

  // Growth Trend Chart
  const growthChartData = useMemo(() => ({
    labels: ['2020', '2021', '2022', '2023'],
    datasets: [{
      label: 'Year-over-Year Growth %',
      data: staticData.growthRates,
      backgroundColor: staticData.growthRates.map(g => g >= 0 ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'),
      borderColor: staticData.growthRates.map(g => g >= 0 ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'),
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

  const latestRevenue = staticData.financials.revenue[staticData.financials.revenue.length - 1];
  const prevRevenue = staticData.financials.revenue[staticData.financials.revenue.length - 2];
  const revenueGrowth = ((latestRevenue - prevRevenue) / prevRevenue) * 100;
  const latestEBITDA = staticData.financials.ebitda[staticData.financials.ebitda.length - 1];
  const ebitdaMargin = (latestEBITDA / latestRevenue) * 100;
  const latestEBIT = staticData.financials.ebit[staticData.financials.ebit.length - 1];

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">Financial Performance</h1>
        <p className="text-xs text-gray-600">Display financial metrics and historical trends</p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-green-500 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div className={`flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full`}>
              <TrendUp className="h-2.5 w-2.5" />
              <span className="text-[10px] font-semibold">{revenueGrowth.toFixed(2)}%</span>
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-0.5">Revenue Growth</p>
          <p className="text-lg font-bold text-gray-900">{revenueGrowth.toFixed(2)}%</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-blue-500 rounded-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-0.5">EBITDA Margin</p>
          <p className="text-lg font-bold text-gray-900">{ebitdaMargin.toFixed(2)}%</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-purple-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-0.5">Latest Revenue</p>
          <p className="text-lg font-bold text-gray-900">{formatNumber(latestRevenue)}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-orange-500 rounded-lg">
              <Target className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-0.5">Latest EBIT</p>
          <p className="text-lg font-bold text-gray-900">{formatNumber(latestEBIT)}</p>
        </div>
      </div>

      {/* Additional Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="h-3 w-3 text-blue-600" />
            <p className="text-[9px] font-medium text-gray-600">Net Profit</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.netProfit[4])}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart3 className="h-3 w-3 text-green-600" />
            <p className="text-[9px] font-medium text-gray-600">CapEx</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.capex[4])}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <DollarSign className="h-3 w-3 text-purple-600" />
            <p className="text-[9px] font-medium text-gray-600">Interest Expense</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.interestExpense[4])}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="h-3 w-3 text-indigo-600" />
            <p className="text-[9px] font-medium text-gray-600">Total Assets</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.totalAssets[4])}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <TrendingUp className="h-3 w-3 text-pink-600" />
            <p className="text-[9px] font-medium text-gray-600">Total Equity</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.totalEquity[4])}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="h-3 w-3 text-red-600" />
            <p className="text-[9px] font-medium text-gray-600">Total Debt</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.totalDebt[4])}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Revenue & Profit Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Revenue & Profit Trends</h3>
            <div className="flex items-center gap-3 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-blue-500 rounded"></div>
                <span className="text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-green-500 rounded"></div>
                <span className="text-gray-600">Net Profit</span>
              </div>
            </div>
          </div>
          <div className="h-56">
            <Line 
              data={revenueChartData} 
              options={chartOptions}
              key="revenue-trend-chart"
              id="revenue-trend-chart"
            />
          </div>
        </div>

        {/* Margin Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Margin Analysis</h3>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded"></div>
                <span className="text-gray-600">EBIT</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded"></div>
                <span className="text-gray-600">EBITDA</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded"></div>
                <span className="text-gray-600">Net</span>
              </div>
            </div>
          </div>
          <div className="h-56">
            <Line 
              data={marginChartData} 
              options={chartOptions}
              key="margin-chart"
              id="margin-chart"
            />
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Year-over-Year Growth</h3>
        <div className="h-56">
          <Bar 
            data={growthChartData} 
            options={chartOptions}
            key="growth-chart"
            id="growth-chart"
          />
        </div>
      </div>

      {/* Financial Data Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">Historical Financial Data</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-700">Metric</th>
                {staticData.years.map(year => (
                  <th key={year} className="px-2 py-2 text-right font-medium text-gray-700">
                    FY{year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">Revenue</td>
                {staticData.financials.revenue.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">EBIT</td>
                {staticData.financials.ebit.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">EBITDA</td>
                {staticData.financials.ebitda.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">Net Profit</td>
                {staticData.financials.netProfit.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">CapEx</td>
                {staticData.financials.capex.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">Interest Expense</td>
                {staticData.financials.interestExpense.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">Total Assets</td>
                {staticData.financials.totalAssets.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">Total Equity</td>
                {staticData.financials.totalEquity.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-2 py-2 font-medium text-gray-900">Total Debt</td>
                {staticData.financials.totalDebt.map((val, idx) => (
                  <td key={idx} className="px-2 py-2 text-right text-gray-700">
                    {formatNumber(val)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Forecast Integration Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Historical & Forecast Revenue Trend</h3>
        <div className="h-56">
          <Line 
            data={{
              labels: staticData.allYears.map(y => `FY${y}`),
              datasets: [
                {
                  label: 'Revenue (Historical)',
                  data: [
                    ...staticData.financials.revenue.map(v => v / 1000000),
                    ...staticData.forecast.revenue.map(v => v / 1000000)
                  ],
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  fill: true,
                  tension: 0.4,
                  borderWidth: 2,
                  borderDash: [0, 0, 0, 0, 0, 5, 5, 5], // Dashed for forecast
                  pointRadius: [4, 4, 4, 4, 4, 4, 4, 4]
                }
              ]
            }}
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      xMin: 4.5,
                      xMax: 4.5,
                      borderColor: 'rgb(255, 99, 132)',
                      borderWidth: 2,
                      borderDash: [5, 5],
                      label: {
                        content: 'Forecast Start',
                        enabled: true
                      }
                    }
                  }
                }
              }
            }}
            key="forecast-chart"
            id="forecast-chart"
          />
        </div>
        <div className="mt-2 flex items-center gap-4 text-[10px]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span className="text-gray-600">Historical</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-blue-500 border-dashed border-t-2"></div>
            <span className="text-gray-600">Forecast</span>
          </div>
        </div>
      </div>

      {/* Sources & Uses of Cash & ROIC vs WACC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Sources & Uses of Cash */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Sources & Uses of Cash</h3>
          <div className="h-56">
            <Bar 
              data={{
                labels: ['Sources', 'Uses'],
                datasets: [
                  {
                    label: 'Sources of Cash',
                    data: [
                      Object.values(staticData.sourcesUses.sources).reduce((a, b) => a + b, 0) / 1000000,
                      0
                    ],
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 2
                  },
                  {
                    label: 'Uses of Cash',
                    data: [
                      0,
                      Object.values(staticData.sourcesUses.uses).reduce((a, b) => a + b, 0) / 1000000
                    ],
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 2
                  }
                ]
              }}
              options={chartOptions}
              key="sources-uses-chart"
              id="sources-uses-chart"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <p className="text-gray-600 mb-1">Sources:</p>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>Net Income:</span>
                  <span className="font-semibold">{formatNumber(staticData.sourcesUses.sources.netIncome)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Depreciation:</span>
                  <span className="font-semibold">{formatNumber(staticData.sourcesUses.sources.depreciation)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Issuance:</span>
                  <span className="font-semibold">{formatNumber(staticData.sourcesUses.sources.debtIssuance)}</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-1">Uses:</p>
              <div className="space-y-0.5">
                <div className="flex justify-between">
                  <span>CapEx:</span>
                  <span className="font-semibold">{formatNumber(staticData.sourcesUses.uses.capex)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dividends:</span>
                  <span className="font-semibold">{formatNumber(staticData.sourcesUses.uses.dividends)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Debt Repayment:</span>
                  <span className="font-semibold">{formatNumber(staticData.sourcesUses.uses.debtRepayment)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROIC vs WACC Trend */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">ROIC vs WACC Trend</h3>
          <div className="h-56">
            <Line 
              data={{
                labels: staticData.roicWacc.years.map(y => `FY${y}`),
                datasets: [
                  {
                    label: 'ROIC %',
                    data: staticData.roicWacc.roic,
                    borderColor: 'rgb(16, 185, 129)',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                  },
                  {
                    label: 'WACC %',
                    data: staticData.roicWacc.wacc,
                    borderColor: 'rgb(239, 68, 68)',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    borderDash: [5, 5]
                  }
                ]
              }}
              options={chartOptions}
              key="roic-wacc-chart"
              id="roic-wacc-chart"
            />
          </div>
          <div className="mt-2 text-[10px] text-gray-600">
            <p>ROIC consistently exceeds WACC, indicating value creation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPerformance;
