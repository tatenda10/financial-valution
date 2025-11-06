import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, Star, TrendingUp, TrendingDown } from 'lucide-react';

const CompaniesListPage = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
    loadWatchlist();
    
    // Check for search query in URL
    const search = searchParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
    
    const filter = searchParams.get('filter');
    if (filter === 'watchlist') {
      // Filter will be applied in filterCompanies
    }
  }, [searchParams]);

  useEffect(() => {
    filterCompanies();
  }, [companies, searchQuery, sectorFilter, watchlist, searchParams]);

  const loadCompanies = () => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    setCompanies(storedCompanies);
  };

  const loadWatchlist = () => {
    const storedWatchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
    setWatchlist(storedWatchlist);
  };

  const filterCompanies = () => {
    let filtered = [...companies];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(c => 
        c.companyInfo?.name?.toLowerCase().includes(query) ||
        c.companyInfo?.ticker?.toLowerCase().includes(query) ||
        c.companyInfo?.industry?.toLowerCase().includes(query)
      );
    }
    
    // Apply sector filter
    if (sectorFilter) {
      filtered = filtered.filter(c => 
        c.companyInfo?.industry?.toLowerCase() === sectorFilter.toLowerCase()
      );
    }
    
    // Apply watchlist filter
    if (searchParams.get('filter') === 'watchlist') {
      filtered = filtered.filter(c => watchlist.includes(c.id));
    }
    
    setFilteredCompanies(filtered);
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

  const getSectors = () => {
    const sectors = new Set();
    companies.forEach(c => {
      if (c.companyInfo?.industry) {
        sectors.add(c.companyInfo.industry);
      }
    });
    return Array.from(sectors).sort();
  };

  const formatMarketCap = (value) => {
    if (!value || isNaN(value)) return '-';
    const num = parseFloat(value);
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getRatingColor = (rating) => {
    if (!rating) return 'text-gray-400';
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-base font-bold text-gray-900 mb-0.5">Companies List</h1>
        <p className="text-xs text-gray-600">Browse and search all tracked companies</p>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 p-3 mb-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ticker, or sector..."
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
            >
              <option value="">All Sectors</option>
              {getSectors().map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/dashboard/companies?filter=watchlist')}
              className={`flex-1 px-3 py-1.5 border transition-colors text-sm ${
                searchParams.get('filter') === 'watchlist'
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Star className="h-3 w-3 inline mr-1" />
              Watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Ticker
                </th>
                <th className="px-3 py-1.5 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Sector
                </th>
                <th className="px-3 py-1.5 text-right text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Market Cap
                </th>
                <th className="px-3 py-1.5 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-3 py-1.5 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-3 py-1.5 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-3 py-1.5 text-center text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-1.5 whitespace-nowrap">
                      <Link
                        to={`/dashboard/companies/${company.id}`}
                        className="text-xs font-medium text-gray-900 hover:text-blue-600"
                      >
                        {company.companyInfo?.name || 'Unnamed Company'}
                      </Link>
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap">
                      <span className="text-xs text-gray-600">
                        {company.companyInfo?.ticker || '-'}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap">
                      <span className="text-xs text-gray-600">
                        {company.companyInfo?.industry || '-'}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap text-right">
                      <span className="text-xs font-medium text-gray-900">
                        {formatMarketCap(company.marketData?.marketCap)}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap text-center">
                      <span className={`text-xs font-bold ${getRatingColor(company.rating)}`}>
                        {company.rating ? company.rating.toFixed(1) : '-'}
                      </span>
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap text-center">
                      <span className="text-xs font-medium text-gray-900">
                        {company.marketData?.sharePrice 
                          ? `$${parseFloat(company.marketData.sharePrice).toFixed(2)}`
                          : '-'
                        }
                      </span>
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap text-center">
                      {company.marketData?.percentageChange ? (
                        <span className={`text-xs font-medium flex items-center justify-center gap-0.5 ${
                          parseFloat(company.marketData.percentageChange) >= 0 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {parseFloat(company.marketData.percentageChange) >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {Math.abs(parseFloat(company.marketData.percentageChange)).toFixed(2)}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-3 py-1.5 whitespace-nowrap text-center">
                      <button
                        onClick={() => toggleWatchlist(company.id)}
                        className={`p-0.5 hover:bg-gray-100 transition-colors ${
                          watchlist.includes(company.id) ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                        title={watchlist.includes(company.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                      >
                        <Star className={`h-3 w-3 ${watchlist.includes(company.id) ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-3 py-6 text-center text-xs text-gray-500">
                    No companies found. {companies.length === 0 && 'Add companies to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      <div className="mt-2 text-xs text-gray-600">
        Showing {filteredCompanies.length} of {companies.length} companies
      </div>
    </div>
  );
};

export default CompaniesListPage;

