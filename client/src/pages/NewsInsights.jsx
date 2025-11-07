import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Calendar, Filter, TrendingUp, Building2, BarChart3, Target, ExternalLink, CheckCircle2, AlertCircle, AlertTriangle, Trophy } from 'lucide-react';

const NewsInsights = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Static articles data
  const staticArticles = [
    {
      id: 'article-1',
      title: 'Q4 2024 Financial Performance Review',
      category: 'Company Updates',
      summary: 'Masimba Holdings reports strong Q4 2024 results with revenue growth of 5% and improved margins. The company continues to expand its construction portfolio across key markets.',
      content: 'Masimba Holdings Limited has announced its Q4 2024 financial results, showing continued growth momentum. Revenue reached $1.05 billion, representing a 5% year-over-year increase. The company\'s EBITDA margin improved to 29.52%, reflecting operational efficiency gains. Management remains optimistic about the outlook for 2025, with several major infrastructure projects in the pipeline.',
      author: 'Financial Analysis Team',
      publishedAt: '2024-01-20',
      keyTakeaways: [
        'Revenue growth of 5% year-over-year',
        'EBITDA margin improved to 29.52%',
        'Strong project pipeline for 2025'
      ],
      icon: BarChart3
    },
    {
      id: 'article-2',
      title: 'Construction Sector Outlook: 2025 Market Trends',
      category: 'Industry News',
      summary: 'Industry analysts predict continued growth in the construction sector, driven by infrastructure investments and urbanization trends. Key opportunities identified in renewable energy projects.',
      content: 'The construction industry is expected to see robust growth in 2025, with infrastructure investments remaining a key driver. Government spending on public works, combined with private sector development, is creating significant opportunities. Renewable energy projects, particularly solar and wind installations, are emerging as a major growth area. Companies with strong balance sheets and operational expertise are well-positioned to capitalize on these trends.',
      author: 'Industry Research',
      publishedAt: '2024-01-18',
      keyTakeaways: [
        'Infrastructure investments driving sector growth',
        'Renewable energy projects offer new opportunities',
        'Strong balance sheets provide competitive advantage'
      ],
      icon: Building2
    },
    {
      id: 'article-3',
      title: 'Market Analysis: Valuation Premium vs Peers',
      category: 'Market Analysis',
      summary: 'Recent analysis shows Masimba Holdings trading at a discount to fair value, presenting potential upside opportunity. Peer comparison reveals strong operational metrics.',
      content: 'A comprehensive market analysis reveals that Masimba Holdings is currently trading at a discount to its calculated fair value of $9.85 per share. The current market price of $8.50 represents a 15.9% discount. When compared to industry peers, Masimba demonstrates superior ROE (57.14%) and ROIC (63.16%) metrics. The company\'s strong financial position and consistent growth trajectory support a positive investment thesis.',
      author: 'Market Research Division',
      publishedAt: '2024-01-15',
      keyTakeaways: [
        'Trading at 15.9% discount to fair value',
        'Superior ROE and ROIC vs industry peers',
        'Strong financial position supports growth'
      ],
      icon: TrendingUp
    },
    {
      id: 'article-4',
      title: 'Research Report: ESG Performance and Sustainability Initiatives',
      category: 'Research',
      summary: 'New research highlights Masimba Holdings\' commitment to ESG principles, with strong performance in environmental management and community engagement programs.',
      content: 'A detailed research report on Masimba Holdings\' ESG (Environmental, Social, and Governance) performance reveals significant progress in sustainability initiatives. The company has implemented comprehensive environmental management systems across all operations, reducing carbon emissions by 12% year-over-year. Community engagement programs have reached over 50,000 beneficiaries, while governance practices have been strengthened through enhanced board oversight and transparency measures.',
      author: 'ESG Research Team',
      publishedAt: '2024-01-12',
      keyTakeaways: [
        '12% reduction in carbon emissions',
        'Community programs reaching 50,000+ beneficiaries',
        'Enhanced governance and transparency'
      ],
      icon: Target
    },
    {
      id: 'article-5',
      title: 'Strategic Partnership Announcement',
      category: 'Company Updates',
      summary: 'Masimba Holdings announces strategic partnership with leading technology provider to enhance digital capabilities and operational efficiency.',
      content: 'Masimba Holdings has entered into a strategic partnership with a leading construction technology provider to accelerate digital transformation initiatives. The partnership will focus on implementing advanced project management systems, IoT-enabled equipment monitoring, and data analytics platforms. This collaboration is expected to improve project delivery times by 15% and reduce operational costs through enhanced efficiency. The investment aligns with the company\'s long-term strategy to maintain competitive advantage through innovation.',
      author: 'Corporate Communications',
      publishedAt: '2024-01-10',
      keyTakeaways: [
        'Strategic partnership for digital transformation',
        'Expected 15% improvement in project delivery',
        'Focus on innovation and competitive advantage'
      ],
      icon: Building2
    },
    {
      id: 'article-6',
      title: 'Market Update: Construction Materials Price Trends',
      category: 'Market Analysis',
      summary: 'Analysis of recent construction materials price trends and their impact on industry margins. Steel and cement prices show stabilization after volatility.',
      content: 'Recent market analysis indicates stabilization in construction materials prices following a period of volatility. Steel prices have declined by 8% from peak levels, while cement prices remain relatively stable. This trend is expected to support industry margins in the coming quarters. Companies with strong supplier relationships and diversified sourcing strategies are best positioned to manage cost pressures. The outlook for 2025 suggests continued price stability as supply chains normalize.',
      author: 'Market Intelligence',
      publishedAt: '2024-01-08',
      keyTakeaways: [
        'Steel prices down 8% from peak',
        'Cement prices stabilizing',
        'Improved margin outlook for 2025'
      ],
      icon: TrendingUp
    }
  ];

  const categories = ['all', 'Company Updates', 'Industry News', 'Market Analysis', 'Research'];

  const filteredArticles = useMemo(() => {
    if (selectedFilter === 'all') {
      return staticArticles;
    }
    return staticArticles.filter(a => 
      a.category?.toLowerCase() === selectedFilter.toLowerCase()
    );
  }, [selectedFilter]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Company Updates':
        return 'bg-blue-100 text-blue-800';
      case 'Industry News':
        return 'bg-green-100 text-green-800';
      case 'Market Analysis':
        return 'bg-purple-100 text-purple-800';
      case 'Research':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Company Updates':
        return Building2;
      case 'Industry News':
        return FileText;
      case 'Market Analysis':
        return TrendingUp;
      case 'Research':
        return Target;
      default:
        return FileText;
    }
  };

  // Count articles by category
  const articleCounts = useMemo(() => {
    const counts = { all: staticArticles.length };
    categories.slice(1).forEach(cat => {
      counts[cat] = staticArticles.filter(a => a.category === cat).length;
    });
    return counts;
  }, []);

  // Financial Insights Data
  const financialInsights = {
    header: {
      latestReport: 'Sep 30, 2024',
      nextEarnings: 'Feb 27, 2025',
      filings: '10-K / 10-Q / 8-K'
    },
    insights: [
      { type: 'positive', text: 'Net income is expected to grow this year', icon: Trophy },
      { type: 'positive', text: '5 analysts have revised their earnings upwards for the upcoming period', icon: CheckCircle2 },
      { type: 'positive', text: 'Significant return over the last week', icon: TrendingUp },
      { type: 'positive', text: 'Liquid assets exceed short term obligations', icon: CheckCircle2 },
      { type: 'positive', text: 'Strong return over the last month', icon: TrendingUp },
      { type: 'positive', text: 'Strong return over the last three months', icon: TrendingUp },
      { type: 'positive', text: 'Large price uptick over the last six months', icon: TrendingUp },
      { type: 'negative', text: 'RSI suggests the stock is in overbought territory', icon: AlertCircle },
      { type: 'negative', text: 'Analysts do not anticipate the company will be profitable this year', icon: AlertCircle },
      { type: 'negative', text: 'Not profitable over the last twelve months', icon: AlertCircle },
      { type: 'negative', text: 'Trading at a high revenue valuation multiple', icon: AlertCircle },
      { type: 'negative', text: 'Trading at a high Price / Book multiple', icon: AlertCircle },
      { type: 'caution', text: 'Operates with a moderate level of debt', icon: AlertTriangle },
      { type: 'caution', text: 'Does not pay a dividend to shareholders', icon: AlertTriangle }
    ]
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'positive':
        return CheckCircle2;
      case 'negative':
        return AlertCircle;
      case 'caution':
        return AlertTriangle;
      default:
        return FileText;
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'caution':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-0.5">News & Market Insights</h1>
        <p className="text-xs text-gray-600">Articles and updates relevant to your company</p>
      </div>

      {/* Financial Insights Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">Financial Insights</h2>
        
        {/* Header Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 pb-4 border-b border-gray-200">
          <div>
            <p className="text-[10px] text-gray-600 mb-0.5">Latest Report</p>
            <p className="text-xs font-semibold text-gray-900">{financialInsights.header.latestReport}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-0.5">Next Earnings</p>
            <p className="text-xs font-semibold text-gray-900">{financialInsights.header.nextEarnings}</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-600 mb-0.5">Filings</p>
            <p className="text-xs font-semibold text-gray-900">{financialInsights.header.filings}</p>
          </div>
        </div>

        {/* Financial Insights List */}
        <div className="space-y-2">
          {financialInsights.insights.map((insight, idx) => {
            const Icon = getInsightIcon(insight.type);
            const iconColor = getInsightColor(insight.type);
            
            return (
              <div key={idx} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`mt-0.5 flex-shrink-0 ${iconColor}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs text-gray-900 flex-1">{insight.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {categories.slice(1).map(category => {
          const Icon = getCategoryIcon(category);
          return (
            <div key={category} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 bg-gray-100 rounded-lg">
                  <Icon className="h-3 w-3 text-gray-600" />
                </div>
                <p className="text-[10px] font-medium text-gray-600">{category}</p>
              </div>
              <p className="text-lg font-bold text-gray-900">{articleCounts[category]}</p>
              <p className="text-[10px] text-gray-500 mt-0.5">articles</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-3 w-3 text-gray-500" />
          <span className="text-xs text-gray-600">Filter by:</span>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedFilter(category)}
              className={`px-2.5 py-1 text-xs transition-colors rounded ${
                selectedFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category} ({articleCounts[category]})
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      {filteredArticles.length > 0 ? (
        <div className="space-y-3">
          {filteredArticles.map((article) => {
            const Icon = article.icon || FileText;
            const categoryColor = getCategoryColor(article.category);
            
            return (
              <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${categoryColor}`}>
                        {article.category || 'News'}
                      </span>
                      <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        <Calendar className="h-2.5 w-2.5" />
                        {formatDate(article.publishedAt)}
                      </span>
                    </div>
                    <div className="flex items-start gap-2 mb-2">
                      <div className="p-1.5 bg-gray-100 rounded-lg mt-0.5">
                        <Icon className="h-3 w-3 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-sm font-semibold text-gray-900 mb-1">
                          {article.title}
                        </h2>
                        <p className="text-xs text-gray-600 mb-2">
                          {article.summary}
                        </p>
                      </div>
                    </div>
                    {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                      <div className="mt-2 p-2 bg-blue-50 border border-blue-100 rounded-lg">
                        <p className="text-[10px] font-semibold text-blue-900 mb-1">Key Takeaways:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          {article.keyTakeaways.map((takeaway, idx) => (
                            <li key={idx} className="text-[10px] text-blue-800">
                              {takeaway}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-[10px] text-gray-500">
                        <span>By {article.author}</span>
                      </div>
                      <button className="flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700">
                        <span>Read more</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
                {article.content && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {article.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No Articles Available</h3>
          <p className="text-xs text-gray-600">
            {selectedFilter !== 'all' 
              ? `No articles found in the "${selectedFilter}" category.`
              : 'Articles and research reports for your company will appear here when available.'
            }
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <FileText className="h-3 w-3 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-xs font-semibold text-blue-900 mb-0.5">About News & Market Insights</h3>
            <p className="text-[10px] text-blue-800">
              This section displays articles, research reports, and market updates related to your company. 
              Content is regularly uploaded through the backend system to provide comprehensive market insights 
              and analysis. Use the filters above to view articles by category.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInsights;
