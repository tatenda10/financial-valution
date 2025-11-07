import React, { useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, FileText, Calendar, ArrowUpRight, ArrowDownRight, Activity, Users, Building2, Target, History, Percent, Gauge, PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const { user } = useAuth();

  // Static data for professional dashboard
  const staticData = {
    companyName: 'Masimba Holdings Limited',
    ticker: 'MSM',
    sector: 'Construction',
    valuation: {
      dcfValue: 15250000000, // $15.25B
      marketCap: 13175000000, // $13.18B
      change: 3.66,
      fairValuePerShare: 9.85,
      currentPrice: 8.50,
      sharesOutstanding: 1550000000
    },
    keyRatios: {
      roe: 57.14,
      roic: 63.16,
      ebitdaMargin: 29.52,
      growthRate: 5.00,
      netProfitMargin: 22.86,
      currentRatio: 1.85,
      debtToEquity: 0.40
    },
    financials: {
      revenue: 1050000000, // $1.05B
      ebit: 270000000, // $270M
      ebitda: 310000000, // $310M
      netProfit: 240000000, // $240M
      totalAssets: 1600000000, // $1.6B
      totalEquity: 420000000, // $420M
      totalDebt: 168000000 // $168M
    },
    revenueTrend: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      revenue: [850, 900, 950, 1000, 1050], // in millions
      profit: [180, 195, 210, 225, 240] // in millions
    },
    dcfComparison: {
      marketValue: 13175, // in millions
      dcfValue: 15250 // in millions
    },
    latestUpdates: [
      {
        type: 'valuation',
        message: 'Valuation updated on January 20, 2024',
        date: '2024-01-20',
        icon: DollarSign
      },
      {
        type: 'article',
        message: 'New article: Q4 2024 Financial Performance Review',
        date: '2024-01-18',
        icon: FileText
      },
      {
        type: 'valuation',
        message: 'DCF model recalibrated with latest projections',
        date: '2024-01-15',
        icon: BarChart3
      }
    ],
    // Sensitivity Analysis Data
    sensitivityAnalysis: {
      min: 14200000000, // $14.2B
      median: 15250000000, // $15.25B
      max: 16300000000 // $16.3B
    },
    // DCF Contribution Split
    dcfContribution: {
      explicitPeriod: 27.2, // % of total value
      terminalValue: 72.8 // % of total value
    },
    // WACC Sensitivity Snapshot
    waccSensitivity: {
      lowWacc: { wacc: 9.0, value: 16200000000 },
      baseWacc: { wacc: 10.0, value: 15250000000 },
      highWacc: { wacc: 11.0, value: 14400000000 }
    },
    // Audit Trail
    auditTrail: [
      { date: '2024-01-20', user: 'Admin', change: 'Updated WACC from 10.2% to 10.0%', impact: 'Valuation increased by $250M' },
      { date: '2024-01-18', user: 'Analyst', change: 'Revised revenue growth from 4.5% to 5.0%', impact: 'Valuation increased by $180M' },
      { date: '2024-01-15', user: 'Admin', change: 'Updated terminal growth rate from 2.5% to 3.0%', impact: 'Valuation increased by $320M' }
    ],
    // Peer Comparison
    peerComparison: [
      { name: 'Masimba Holdings', marketCap: 13175, roe: 57.14, peRatio: 4.36 },
      { name: 'Peer A', marketCap: 18500, roe: 42.30, peRatio: 6.20 },
      { name: 'Peer B', marketCap: 12200, roe: 38.50, peRatio: 5.80 },
      { name: 'Peer C', marketCap: 15800, roe: 45.20, peRatio: 7.10 }
    ],
    // TSR (Total Shareholder Return)
    tsr: {
      oneYear: 12.5,
      threeYear: 35.8,
      fiveYear: 68.2
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Revenue & Profit Trend Chart - Memoized
  const revenueChartData = useMemo(() => ({
    labels: staticData.revenueTrend.labels,
    datasets: [
      {
        label: 'Revenue (Millions)',
        data: staticData.revenueTrend.revenue,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      },
      {
        label: 'Net Profit (Millions)',
        data: staticData.revenueTrend.profit,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 2
      }
    ]
  }), []);

  // DCF vs Market Value Comparison - Memoized
  const dcfComparisonData = useMemo(() => ({
    labels: ['Market Value', 'DCF Value'],
    datasets: [{
      label: 'Valuation (Millions)',
      data: [staticData.dcfComparison.marketValue, staticData.dcfComparison.dcfValue],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(59, 130, 246, 0.8)'
      ],
      borderColor: [
        'rgb(16, 185, 129)',
        'rgb(59, 130, 246)'
      ],
      borderWidth: 2
    }]
  }), []);

  // Key Metrics Distribution (Doughnut Chart) - Memoized
  const metricsDistributionData = useMemo(() => ({
    labels: ['ROE', 'ROIC', 'EBITDA Margin', 'Growth'],
    datasets: [{
      data: [
        staticData.keyRatios.roe,
        staticData.keyRatios.roic,
        staticData.keyRatios.ebitdaMargin,
        staticData.keyRatios.growthRate * 10 // Scale growth for visibility
      ],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
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

  const doughnutOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
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
        cornerRadius: 6
      }
    }
  }), []);

  const valuationChange = useMemo(() => 
    ((staticData.valuation.dcfValue - staticData.valuation.marketCap) / staticData.valuation.marketCap) * 100,
    []
  );

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">Dashboard</h1>
        <p className="text-xs text-gray-600">{staticData.companyName} ({staticData.ticker}) • {staticData.sector}</p>
      </div>

      {/* Valuation Summary Cards - Reduced Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* DCF Valuation */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-blue-500 rounded-lg">
              <DollarSign className="h-4 w-4 text-white" />
            </div>
            {valuationChange > 0 ? (
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="h-2.5 w-2.5" />
                <span className="text-[10px] font-semibold">{Math.abs(valuationChange).toFixed(1)}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                <ArrowDownRight className="h-2.5 w-2.5" />
                <span className="text-[10px] font-semibold">{Math.abs(valuationChange).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-0.5">Current Valuation (DCF)</p>
          <p className="text-lg font-bold text-gray-900">{formatNumber(staticData.valuation.dcfValue)}</p>
          <p className="text-[10px] text-gray-500 mt-1">Fair Value: ${staticData.valuation.fairValuePerShare.toFixed(2)}/share</p>
        </div>

        {/* Market Cap */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="p-1.5 bg-green-500 rounded-lg">
              <BarChart3 className="h-4 w-4 text-white" />
            </div>
            {staticData.valuation.change > 0 ? (
              <div className="flex items-center gap-1 text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                <TrendingUp className="h-2.5 w-2.5" />
                <span className="text-[10px] font-semibold">{Math.abs(staticData.valuation.change).toFixed(2)}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full">
                <TrendingDown className="h-2.5 w-2.5" />
                <span className="text-[10px] font-semibold">{Math.abs(staticData.valuation.change).toFixed(2)}%</span>
              </div>
            )}
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-0.5">Market Cap</p>
          <p className="text-lg font-bold text-gray-900">{formatNumber(staticData.valuation.marketCap)}</p>
          <p className="text-[10px] text-gray-500 mt-1">Current Price: ${staticData.valuation.currentPrice.toFixed(2)}/share</p>
        </div>

        {/* Key Ratios */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-3">
          <div className="p-1.5 bg-purple-500 rounded-lg w-fit mb-2">
            <BarChart3 className="h-4 w-4 text-white" />
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-2">Key Ratios</p>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-600">ROE</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.roe.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-600">ROIC</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.roic.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-600">EBITDA Margin</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.ebitdaMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-gray-600">Growth Rate</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.growthRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Latest Updates */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-3">
          <div className="p-1.5 bg-orange-500 rounded-lg w-fit mb-2">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <p className="text-[10px] font-medium text-gray-600 mb-2">Latest Updates</p>
          <div className="space-y-1.5">
            {staticData.latestUpdates.slice(0, 2).map((update, idx) => {
              const Icon = update.icon;
              return (
                <div key={idx} className="flex items-start gap-1.5">
                  <Icon className="h-2.5 w-2.5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-900 leading-tight">{update.message}</p>
                    <p className="text-[9px] text-gray-500 mt-0.5">{formatDate(update.date)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Additional Financial Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Activity className="h-3 w-3 text-blue-600" />
            <p className="text-[9px] font-medium text-gray-600">Revenue</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.revenue)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Target className="h-3 w-3 text-green-600" />
            <p className="text-[9px] font-medium text-gray-600">EBIT</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.ebit)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <BarChart3 className="h-3 w-3 text-purple-600" />
            <p className="text-[9px] font-medium text-gray-600">EBITDA</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.ebitda)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <DollarSign className="h-3 w-3 text-yellow-600" />
            <p className="text-[9px] font-medium text-gray-600">Net Profit</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.netProfit)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Building2 className="h-3 w-3 text-indigo-600" />
            <p className="text-[9px] font-medium text-gray-600">Total Assets</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.totalAssets)}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-2">
          <div className="flex items-center gap-1.5 mb-1">
            <Users className="h-3 w-3 text-pink-600" />
            <p className="text-[9px] font-medium text-gray-600">Total Equity</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{formatNumber(staticData.financials.totalEquity)}</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Revenue & Profit Trends */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-3">
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
              key="revenue-chart"
              id="revenue-chart"
            />
          </div>
        </div>

        {/* Metrics Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Key Metrics</h3>
          <div className="h-56">
            <Doughnut 
              data={metricsDistributionData} 
              options={doughnutOptions}
              key="metrics-chart"
              id="metrics-chart"
            />
          </div>
        </div>
      </div>

      {/* Additional Information Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Financial Ratios Detail */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Financial Ratios</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-[10px] text-gray-600">Net Profit Margin</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.netProfitMargin.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-[10px] text-gray-600">Current Ratio</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.currentRatio.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-gray-100">
              <span className="text-[10px] text-gray-600">Debt to Equity</span>
              <span className="text-xs font-semibold text-gray-900">{staticData.keyRatios.debtToEquity.toFixed(2)}x</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[10px] text-gray-600">Shares Outstanding</span>
              <span className="text-xs font-semibold text-gray-900">{formatNumber(staticData.valuation.sharesOutstanding)}</span>
            </div>
          </div>
        </div>

        {/* DCF vs Market Value */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">DCF vs Market Value</h3>
          <div className="h-56">
            <Bar 
              data={dcfComparisonData} 
              options={chartOptions}
              key="dcf-comparison-chart"
              id="dcf-comparison-chart"
            />
          </div>
        </div>

        {/* Latest Updates */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {staticData.latestUpdates.map((update, idx) => {
              const Icon = update.icon;
              return (
                <div key={idx} className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <Icon className="h-3 w-3 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900 font-medium mb-0.5">{update.message}</p>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <Calendar className="h-2.5 w-2.5" />
                      <span>{formatDate(update.date)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* New Professional Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Valuation Range from Sensitivity Analysis */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Valuation Range (Sensitivity Analysis)</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg">
              <span className="text-xs text-gray-600">Minimum</span>
              <span className="text-base font-bold text-red-600">{formatNumber(staticData.sensitivityAnalysis.min)}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-blue-50 rounded-lg">
              <span className="text-xs text-gray-600">Median (Base Case)</span>
              <span className="text-base font-bold text-blue-600">{formatNumber(staticData.sensitivityAnalysis.median)}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
              <span className="text-xs text-gray-600">Maximum</span>
              <span className="text-base font-bold text-green-600">{formatNumber(staticData.sensitivityAnalysis.max)}</span>
            </div>
          </div>
        </div>

        {/* DCF Contribution Split */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">DCF Contribution Split</h3>
          <div className="h-48">
            <Doughnut 
              data={{
                labels: ['Explicit Period', 'Terminal Value'],
                datasets: [{
                  data: [staticData.dcfContribution.explicitPeriod, staticData.dcfContribution.terminalValue],
                  backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(139, 92, 246, 0.8)'],
                  borderColor: ['rgb(59, 130, 246)', 'rgb(139, 92, 246)'],
                  borderWidth: 2
                }]
              }}
              options={doughnutOptions}
              key="dcf-contribution-chart"
              id="dcf-contribution-chart"
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <p className="text-gray-600">Explicit Period</p>
              <p className="font-bold text-blue-600">{staticData.dcfContribution.explicitPeriod.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Terminal Value</p>
              <p className="font-bold text-purple-600">{staticData.dcfContribution.terminalValue.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Bridge Waterfall Chart & WACC Sensitivity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Value Bridge Waterfall Chart */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Value Bridge: Market Cap → DCF Value</h3>
          <div className="h-56">
            <Bar 
              data={{
                labels: ['Market Cap', 'Premium/(Discount)', 'DCF Value'],
                datasets: [{
                  label: 'Value (Millions)',
                  data: [
                    staticData.dcfComparison.marketValue,
                    (staticData.dcfComparison.dcfValue - staticData.dcfComparison.marketValue),
                    staticData.dcfComparison.dcfValue
                  ],
                  backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                  ],
                  borderColor: [
                    'rgb(16, 185, 129)',
                    'rgb(59, 130, 246)',
                    'rgb(139, 92, 246)'
                  ],
                  borderWidth: 2
                }]
              }}
              options={chartOptions}
              key="value-bridge-chart"
              id="value-bridge-chart"
            />
          </div>
        </div>

        {/* WACC Sensitivity Snapshot */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">WACC Sensitivity Snapshot</h3>
          <div className="space-y-2">
            <div className="p-2 bg-green-50 rounded-lg border border-green-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">WACC: {staticData.waccSensitivity.lowWacc.wacc.toFixed(1)}%</span>
                <span className="text-sm font-bold text-green-600">{formatNumber(staticData.waccSensitivity.lowWacc.value)}</span>
              </div>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">WACC: {staticData.waccSensitivity.baseWacc.wacc.toFixed(1)}% (Base)</span>
                <span className="text-sm font-bold text-blue-600">{formatNumber(staticData.waccSensitivity.baseWacc.value)}</span>
              </div>
            </div>
            <div className="p-2 bg-red-50 rounded-lg border border-red-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">WACC: {staticData.waccSensitivity.highWacc.wacc.toFixed(1)}%</span>
                <span className="text-sm font-bold text-red-600">{formatNumber(staticData.waccSensitivity.highWacc.value)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Trail & Peer Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Audit Trail */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <History className="h-4 w-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900">Audit Trail</h3>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {staticData.auditTrail.map((entry, idx) => (
              <div key={idx} className="p-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] text-gray-500">{formatDate(entry.date)}</span>
                  <span className="text-[10px] text-gray-600">{entry.user}</span>
                </div>
                <p className="text-xs text-gray-900 font-medium mb-0.5">{entry.change}</p>
                <p className="text-[10px] text-green-600">{entry.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Peer Comparison */}
        <div className="bg-white border border-gray-200 rounded-lg p-3">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Peer Comparison</h3>
          <div className="space-y-2">
            {staticData.peerComparison.map((peer, idx) => (
              <div key={idx} className={`p-2 rounded-lg border ${peer.name === 'Masimba Holdings' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-xs font-semibold ${peer.name === 'Masimba Holdings' ? 'text-blue-900' : 'text-gray-900'}`}>
                    {peer.name}
                  </span>
                  <span className="text-xs text-gray-600">${(peer.marketCap / 1000).toFixed(2)}B</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-gray-600">ROE: </span>
                    <span className="font-semibold text-gray-900">{peer.roe.toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">P/E: </span>
                    <span className="font-semibold text-gray-900">{peer.peRatio.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TSR Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-gray-600" />
          <h3 className="text-sm font-semibold text-gray-900">Total Shareholder Return (TSR)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-2 bg-green-50 rounded-lg border border-green-200">
            <p className="text-[10px] text-gray-600 mb-0.5">1 Year TSR</p>
            <p className="text-lg font-bold text-green-600">{staticData.tsr.oneYear.toFixed(1)}%</p>
          </div>
          <div className="p-2 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-[10px] text-gray-600 mb-0.5">3 Year TSR</p>
            <p className="text-lg font-bold text-blue-600">{staticData.tsr.threeYear.toFixed(1)}%</p>
          </div>
          <div className="p-2 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-[10px] text-gray-600 mb-0.5">5 Year TSR</p>
            <p className="text-lg font-bold text-purple-600">{staticData.tsr.fiveYear.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
