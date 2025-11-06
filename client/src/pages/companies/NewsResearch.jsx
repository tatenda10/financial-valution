import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Calendar, ExternalLink } from 'lucide-react';

const NewsResearch = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCompanyData();
    loadArticles();
  }, [id]);

  const loadCompanyData = () => {
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === id);
    setCompany(foundCompany);
  };

  const loadArticles = () => {
    // Load articles from localStorage (stored by company ID)
    const storedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
    const companyArticles = storedArticles.filter(a => a.companyId === id);
    
    // Sort by date (newest first)
    companyArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    
    setArticles(companyArticles);
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">News & Research</h1>
        <p className="text-sm text-gray-600">
          {company.companyInfo?.name || 'Unnamed Company'} • Latest Articles & Market Updates
        </p>
      </div>

      {/* Articles List */}
      {articles.length > 0 ? (
        <div className="space-y-4">
          {articles.map((article) => (
            <div key={article.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                      {article.category || 'News'}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    {article.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-3">
                    {article.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>By {article.author}</span>
                  </div>
                </div>
                <FileText className="h-6 w-6 text-gray-400 ml-4" />
              </div>
              {article.content && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {article.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Available</h3>
          <p className="text-sm text-gray-600 mb-4">
            Articles and research reports for this company will appear here when available.
          </p>
          <p className="text-xs text-gray-500">
            Articles are uploaded through the backend system and linked to company profiles.
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">About News & Research</h3>
            <p className="text-xs text-blue-800">
              This section displays articles, research reports, and market updates related to the company. 
              Content is regularly uploaded through the backend system to provide comprehensive market insights 
              and analysis for each tracked company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsResearch;

