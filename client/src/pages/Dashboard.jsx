import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Search, Star, TrendingUp, TrendingDown, Building2, Award } from 'lucide-react';
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
import { Line, Bar, Pie } from 'react-chartjs-2';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [companies, setCompanies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [topRatings, setTopRatings] = useState([]);
  const [marketSummary, setMarketSummary] = useState(null);
  const [revenueChartData, setRevenueChartData] = useState(null);
  const [sectorChartData, setSectorChartData] = useState(null);
  const [marketCapChartData, setMarketCapChartData] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load all companies
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    setCompanies(storedCompanies);

    // Load watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);

    // Generate top ratings (companies with highest ratings)
    const ratedCompanies = storedCompanies
      .filter(c => c.rating)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 5);
    setTopRatings(ratedCompanies);

    // Market summary
    const totalCompanies = storedCompanies.length;
    const avgMarketCap = storedCompanies.reduce((sum, c) => {
      const marketCap = parseFloat(c.marketData?.marketCap || 0);
      return sum + (isNaN(marketCap) ? 0 : marketCap);
    }, 0) / (totalCompanies || 1);

    setMarketSummary({
      totalCompanies,
      avgMarketCap,
      totalWatchlist: storedWatchlist.length
    });

    // Prepare revenue trend chart data
    if (storedCompanies.length > 0) {
      const years = ['2019', '2020', '2021', '2022', '2023'];
      const revenueData = years.map(year => {
        return storedCompanies.reduce((sum, company) => {
          const revenue = company.financialData?.find(f => f.name === 'Revenue');
          const value = revenue?.values?.[year] || 0;
          return sum + (parseFloat(value) || 0);
        }, 0);
      });

      setRevenueChartData({
        labels: years,
        datasets: [
          {
            label: 'Total Revenue (Billions)',
            data: revenueData.map(v => v / 1000000000),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4
          }
        ]
      });

      // Prepare sector distribution pie chart
      const sectorCount = {};
      storedCompanies.forEach(company => {
        const sector = company.companyInfo?.industry || 'Other';
        sectorCount[sector] = (sectorCount[sector] || 0) + 1;
      });

      const sectors = Object.keys(sectorCount);
      const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(20, 184, 166, 0.8)',
        'rgba(251, 146, 60, 0.8)'
      ];

      setSectorChartData({
        labels: sectors,
        datasets: [
          {
            data: sectors.map(s => sectorCount[s]),
            backgroundColor: colors.slice(0, sectors.length),
            borderColor: '#fff',
            borderWidth: 1
          }
        ]
      });

      // Prepare market cap bar chart (top 5 companies)
      const topCompanies = [...storedCompanies]
        .sort((a, b) => {
          const capA = parseFloat(a.marketData?.marketCap || 0);
          const capB = parseFloat(b.marketData?.marketCap || 0);
          return capB - capA;
        })
        .slice(0, 5);

      setMarketCapChartData({
        labels: topCompanies.map(c => c.companyInfo?.ticker || 'N/A'),
        datasets: [
          {
            label: 'Market Cap (Billions)',
            data: topCompanies.map(c => {
              const cap = parseFloat(c.marketData?.marketCap || 0);
              return cap / 1000000000;
            }),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1
          }
        ]
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate to companies list with search query
    window.location.href = `/dashboard/companies?search=${encodeURIComponent(searchQuery)}`;
  };

  const toggleWatchlist = (companyId) => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    const isInWatchlist = storedWatchlist.includes(companyId);
    
    const newWatchlist = isInWatchlist
      ? storedWatchlist.filter(id => id !== companyId)
      : [...storedWatchlist, companyId];
    
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  const formatNumber = (value) => {
    if (!value || isNaN(value)) return '-';
    const num = parseFloat(value);
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: { size: 10 },
          padding: 8
        }
      },
      tooltip: {
        titleFont: { size: 10 },
        bodyFont: { size: 10 },
        padding: 8
      }
    },
    scales: {
      y: {
        ticks: {
          font: { size: 9 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: { size: 9 }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { size: 10 },
          padding: 8
        }
      },
      tooltip: {
        titleFont: { size: 10 },
        bodyFont: { size: 10 },
        padding: 8
      }
    }
  };

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-base font-bold text-gray-900 mb-0.5">Financial Valuation Dashboard</h1>
        <p className="text-xs text-gray-600">High-level overview of companies and market performance</p>
      </div>

      {/* Company Search */}
      <div className="bg-white border border-gray-200 p-2 mb-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies by name, ticker, or sector..."
              className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-1.5 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Market Summary */}
      {marketSummary && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
          <div className="bg-white border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Total Companies</p>
                <p className="text-lg font-bold text-blue-600">{marketSummary.totalCompanies}</p>
              </div>
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Avg Market Cap</p>
                <p className="text-lg font-bold text-green-600">{formatNumber(marketSummary.avgMarketCap)}</p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="bg-white border border-gray-200 p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 mb-0.5">Watchlist Items</p>
                <p className="text-lg font-bold text-purple-600">{marketSummary.totalWatchlist}</p>
              </div>
              <Star className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
        {/* Revenue Trend Chart */}
        {revenueChartData && (
          <div className="bg-white border border-gray-200 p-2">
            <h3 className="text-xs font-semibold text-gray-900 mb-2">Revenue Trend (2019-2023)</h3>
            <div className="h-48">
              <Line data={revenueChartData} options={chartOptions} />
            </div>
          </div>
        )}

        {/* Sector Distribution Pie Chart */}
        {sectorChartData && (
          <div className="bg-white border border-gray-200 p-2">
            <h3 className="text-xs font-semibold text-gray-900 mb-2">Sector Distribution</h3>
            <div className="h-48">
              <Pie data={sectorChartData} options={pieChartOptions} />
            </div>
          </div>
        )}

        {/* Market Cap Bar Chart */}
        {marketCapChartData && (
          <div className="bg-white border border-gray-200 p-2">
            <h3 className="text-xs font-semibold text-gray-900 mb-2">Top 5 Market Cap</h3>
            <div className="h-48">
              <Bar data={marketCapChartData} options={chartOptions} />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Top Ratings */}
        <div className="bg-white border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-900 flex items-center gap-1">
              <Award className="h-3 w-3 text-yellow-600" />
              Top Ratings
            </h2>
            <Link to="/dashboard/companies" className="text-xs text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-1.5">
            {topRatings.length > 0 ? (
              topRatings.map((company) => (
                <div key={company.id} className="flex items-center justify-between p-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <Link
                      to={`/dashboard/companies/${company.id}`}
                      className="text-xs font-medium text-gray-900 hover:text-blue-600"
                    >
                      {company.companyInfo?.name || 'Unnamed Company'}
                    </Link>
                    <p className="text-[10px] text-gray-600">{company.companyInfo?.ticker || '-'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${getRatingColor(company.rating)}`}>
                      {company.rating?.toFixed(1) || '-'}
                    </span>
                    <button
                      onClick={() => toggleWatchlist(company.id)}
                      className={`p-0.5 ${watchlist.includes(company.id) ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                    >
                      <Star className={`h-3 w-3 ${watchlist.includes(company.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-2">No rated companies yet</p>
            )}
          </div>
        </div>

        {/* Watchlist */}
        <div className="bg-white border border-gray-200 p-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-900 flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-600" />
              Watchlist
            </h2>
            <Link to="/dashboard/companies?filter=watchlist" className="text-xs text-blue-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-1.5">
            {watchlist.length > 0 ? (
              companies
                .filter(c => watchlist.includes(c.id))
                .slice(0, 5)
                .map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-1.5 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex-1">
                      <Link
                        to={`/dashboard/companies/${company.id}`}
                        className="text-xs font-medium text-gray-900 hover:text-blue-600"
                      >
                        {company.companyInfo?.name || 'Unnamed Company'}
                      </Link>
                      <p className="text-[10px] text-gray-600">
                        {company.companyInfo?.ticker || '-'} • {company.companyInfo?.industry || '-'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {company.marketData?.sharePrice && (
                        <span className="text-xs font-medium text-gray-900">
                          ${parseFloat(company.marketData.sharePrice).toFixed(2)}
                        </span>
                      )}
                      {company.marketData?.percentageChange && (
                        <span className={`text-[10px] flex items-center gap-0.5 ${
                          parseFloat(company.marketData.percentageChange) >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {parseFloat(company.marketData.percentageChange) >= 0 ? (
                            <TrendingUp className="h-2.5 w-2.5" />
                          ) : (
                            <TrendingDown className="h-2.5 w-2.5" />
                          )}
                          {Math.abs(parseFloat(company.marketData.percentageChange)).toFixed(2)}%
                        </span>
                      )}
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-2">Your watchlist is empty. Add companies to track them.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
