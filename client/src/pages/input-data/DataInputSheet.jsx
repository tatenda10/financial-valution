import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Download, Trash2, Plus, Save, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const DataInputSheet = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [fileToUpload, setFileToUpload] = useState(location.state?.file || null);
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    industry: '',
    ticker: '',
    exchange: '',
    country: ''
  });

  const [marketData, setMarketData] = useState({
    sharePrice: '',
    changeFromPreviousDay: '',
    percentageChange: '',
    prevClose: '',
    week52Range: '',
    marketCap: ''
  });

  const [financialData, setFinancialData] = useState([]);
  const [years, setYears] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Load company data on mount
  useEffect(() => {
    loadCompanyData();
  }, [user]);

  // Handle file upload from route state
  useEffect(() => {
    if (fileToUpload) {
      const processFile = async () => {
        setError('');
        setIsLoading(true);
        setUploadedFile(fileToUpload);

        try {
          const fileData = await fileToUpload.arrayBuffer();
          const workbook = XLSX.read(fileData, { type: 'array' });
          
          const sheetName = workbook.SheetNames.find(name => 
            name.toLowerCase().includes('data input') || 
            name.toLowerCase().includes('input') ||
            name.toLowerCase().includes('masimba')
          ) || workbook.SheetNames[0];
          
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

          parseExcelData(jsonData);
          setIsEditing(true);
          
        } catch (err) {
          console.error('Error parsing Excel file:', err);
          setError('Failed to parse Excel file. Please ensure it is a valid Excel file.');
        } finally {
          setIsLoading(false);
          setFileToUpload(null); // Clear after processing
        }
      };
      processFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileToUpload]);

  const loadCompanyData = () => {
    if (!user?.companyId) return;

    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const company = storedCompanies.find(c => c.id === user.companyId);

    if (company) {
      setCompanyInfo(company.companyInfo || { name: '', industry: '', ticker: '', exchange: '', country: '' });
      setMarketData(company.marketData || { sharePrice: '', changeFromPreviousDay: '', percentageChange: '', prevClose: '', week52Range: '', marketCap: '' });
      setFinancialData(company.financialData || []);
      setYears(company.years || []);
    } else {
      // Initialize with company name from user
      setCompanyInfo({
        name: user.companyName || user.username || '',
        industry: '',
        ticker: '',
        exchange: '',
        country: ''
      });
    }
  };

  // Auto-save company data
  const saveCompanyData = (showMessage = true) => {
    if (!user?.companyId) {
      setError('User not authenticated');
      return;
    }

    const companyData = {
      id: user.companyId,
      companyInfo,
      marketData,
      financialData,
      years,
      password: JSON.parse(localStorage.getItem('companies') || '[]').find(c => c.id === user.companyId)?.password || '',
      submittedAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };

    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const companyIndex = storedCompanies.findIndex(c => c.id === user.companyId);
    
    if (companyIndex !== -1) {
      storedCompanies[companyIndex] = companyData;
    } else {
      storedCompanies.push(companyData);
    }
    
    localStorage.setItem('companies', JSON.stringify(storedCompanies));

    if (showMessage) {
      setSuccessMessage('Data saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError('');
    setIsLoading(true);
    setUploadedFile(file);

    try {
      const fileData = await file.arrayBuffer();
      const workbook = XLSX.read(fileData, { type: 'array' });
      
      // Get the first sheet (or Data Input sheet if it exists)
      const sheetName = workbook.SheetNames.find(name => 
        name.toLowerCase().includes('data input') || 
        name.toLowerCase().includes('input') ||
        name.toLowerCase().includes('masimba')
      ) || workbook.SheetNames[0];
      
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });

      parseExcelData(jsonData);
      setIsEditing(true);
      
    } catch (err) {
      console.error('Error parsing Excel file:', err);
      setError('Failed to parse Excel file. Please ensure it is a valid Excel file.');
    } finally {
      setIsLoading(false);
    }
  };

  // Parse Excel data into structured format
  const parseExcelData = (data) => {
    if (!data || data.length === 0) {
      setError('Excel file appears to be empty or invalid.');
      return;
    }

    // Find header row (first row with year columns like FY2012, FY2013, etc.)
    let headerRowIndex = -1;
    let yearColumns = [];

    for (let i = 0; i < Math.min(20, data.length); i++) {
      const row = data[i];
      if (Array.isArray(row)) {
        // Look for year patterns (FY2012, FY2013, 2012, etc.)
        const potentialYears = row.slice(1).filter(cell => {
          const cellStr = String(cell).trim();
          return /^(FY)?\d{4}$/.test(cellStr) || /^\d{4}$/.test(cellStr);
        });
        
        if (potentialYears.length >= 2) {
          headerRowIndex = i;
          yearColumns = row.map((cell, idx) => {
            const cellStr = String(cell).trim();
            if (idx === 0) return 'metric';
            if (/^(FY)?\d{4}$/.test(cellStr) || /^\d{4}$/.test(cellStr)) {
              return cellStr.replace('FY', '').replace('FY', ''); // Remove FY prefix
            }
            return null;
          }).filter(Boolean);
          break;
        }
      }
    }

    if (headerRowIndex === -1) {
      setError('Could not find financial data structure. Expected columns with years (e.g., FY2012, FY2013).');
      return;
    }

    // Extract years (remove 'metric' from the array)
    const extractedYears = yearColumns.filter(y => y !== 'metric');
    setYears(extractedYears);

    // Parse financial metrics
    const metrics = [];
    for (let i = headerRowIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (!Array.isArray(row) || row.length === 0) continue;
      
      const metricName = String(row[0]).trim();
      if (!metricName || metricName === '') continue;

      // Skip section headers or empty rows
      if (metricName.toUpperCase() === metricName && metricName.length > 30) {
        continue;
      }

      const metricData = {
        id: `metric-${i}`,
        name: metricName,
        values: {}
      };

      // Extract values for each year
      extractedYears.forEach((year) => {
        const colIndex = yearColumns.indexOf(year);
        if (colIndex !== -1 && row[colIndex] !== undefined) {
          const value = row[colIndex];
          // Try to parse as number
          const numValue = typeof value === 'number' ? value : 
                          typeof value === 'string' ? parseFloat(value.replace(/,/g, '')) : null;
          metricData.values[year] = isNaN(numValue) ? '' : numValue;
        } else {
          metricData.values[year] = '';
        }
      });

      metrics.push(metricData);
    }

    setFinancialData(metrics);
    saveCompanyData(false); // Auto-save after parsing
  };

  // Add new metric row
  const addNewMetric = () => {
    const newMetric = {
      id: `metric-${Date.now()}`,
      name: '',
      values: {}
    };
    
    years.forEach(year => {
      newMetric.values[year] = '';
    });

    setFinancialData([...financialData, newMetric]);
    setIsEditing(true);
  };

  // Delete metric row
  const deleteMetric = (id) => {
    setFinancialData(financialData.filter(metric => metric.id !== id));
    setIsEditing(true);
    saveCompanyData(false);
  };

  // Update metric value
  const updateMetricValue = (metricId, year, value) => {
    setFinancialData(financialData.map(metric => {
      if (metric.id === metricId) {
        return {
          ...metric,
          values: {
            ...metric.values,
            [year]: value === '' ? '' : (isNaN(parseFloat(value)) ? value : parseFloat(value))
          }
        };
      }
      return metric;
    }));
    setIsEditing(true);
  };

  // Update metric name
  const updateMetricName = (metricId, name) => {
    setFinancialData(financialData.map(metric => {
      if (metric.id === metricId) {
        return { ...metric, name };
      }
      return metric;
    }));
    setIsEditing(true);
  };

  // Add new year column
  const addNewYear = () => {
    const newYear = prompt('Enter year (e.g., 2024):');
    if (newYear && /^\d{4}$/.test(newYear)) {
      if (years.includes(newYear)) {
        setError('This year already exists');
        return;
      }
      const sortedYears = [...years, newYear].sort((a, b) => parseInt(a) - parseInt(b));
      setYears(sortedYears);
      
      // Add empty values for all metrics
      setFinancialData(financialData.map(metric => ({
        ...metric,
        values: {
          ...metric.values,
          [newYear]: ''
        }
      })));
      setIsEditing(true);
      saveCompanyData(false);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    
    // Prepare data array
    const exportData = [];
    
    // Header row
    const headerRow = ['Metric', ...years.map(y => `FY${y}`)];
    exportData.push(headerRow);
    
    // Data rows
    financialData.forEach(metric => {
      const row = [
        metric.name,
        ...years.map(year => metric.values[year] || '')
      ];
      exportData.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Data Input');
    
    // Save file
    const fileName = `${companyInfo.name || 'Financial_Data'}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Format number for display
  const formatNumber = (value) => {
    if (value === '' || value === null || value === undefined) return '';
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return value;
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Data Input Sheet</h1>
          <p className="text-sm text-gray-600">
            {companyInfo.name || 'Enter your company financial data'}
          </p>
        </div>
        <div className="flex gap-2">
          {isEditing && (
            <button
              onClick={() => {
                saveCompanyData();
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          )}
          {financialData.length > 0 && (
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export Excel
            </button>
          )}
        </div>
      </div>

      {/* Company Information Section */}
      <div className="bg-white border border-gray-200 p-4 mb-4 rounded">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Company Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => {
                setCompanyInfo({ ...companyInfo, name: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter company name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Industry</label>
            <input
              type="text"
              value={companyInfo.industry}
              onChange={(e) => {
                setCompanyInfo({ ...companyInfo, industry: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter industry"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Ticker Symbol</label>
            <input
              type="text"
              value={companyInfo.ticker}
              onChange={(e) => {
                setCompanyInfo({ ...companyInfo, ticker: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., AAPL"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Exchange</label>
            <input
              type="text"
              value={companyInfo.exchange}
              onChange={(e) => {
                setCompanyInfo({ ...companyInfo, exchange: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., NASDAQ"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Country</label>
            <input
              type="text"
              value={companyInfo.country}
              onChange={(e) => {
                setCompanyInfo({ ...companyInfo, country: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter country"
            />
          </div>
        </div>
      </div>

      {/* Market Data Section */}
      <div className="bg-white border border-gray-200 p-4 mb-4 rounded">
        <h2 className="text-base font-semibold text-gray-900 mb-3">Market Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Share Price</label>
            <input
              type="number"
              value={marketData.sharePrice}
              onChange={(e) => {
                setMarketData({ ...marketData, sharePrice: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Change from Previous Day</label>
            <input
              type="number"
              value={marketData.changeFromPreviousDay}
              onChange={(e) => {
                setMarketData({ ...marketData, changeFromPreviousDay: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Percentage Change (%)</label>
            <input
              type="number"
              value={marketData.percentageChange}
              onChange={(e) => {
                setMarketData({ ...marketData, percentageChange: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Previous Close</label>
            <input
              type="number"
              value={marketData.prevClose}
              onChange={(e) => {
                setMarketData({ ...marketData, prevClose: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">52-Week Range</label>
            <input
              type="text"
              value={marketData.week52Range}
              onChange={(e) => {
                setMarketData({ ...marketData, week52Range: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 10.00 - 50.00"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Market Cap</label>
            <input
              type="number"
              value={marketData.marketCap}
              onChange={(e) => {
                setMarketData({ ...marketData, marketCap: e.target.value });
                setIsEditing(true);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Financial Data Section */}
      <div className="bg-white border border-gray-200 p-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Historical Financial Data</h2>
          <div className="flex gap-2">
            <label className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 cursor-pointer flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Excel
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
            {years.length > 0 && (
              <button
                onClick={addNewYear}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Year
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded text-sm text-red-800">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">
            {successMessage}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm text-gray-600">Processing Excel file...</p>
          </div>
        )}

        {/* Financial Data Table - Similar to Masimba format */}
        {financialData.length > 0 && years.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold min-w-[250px]">
                    {companyInfo.name || 'Company Name'}
                  </th>
                  {years.map(year => (
                    <th key={year} className="border border-gray-300 px-4 py-3 text-center font-semibold min-w-[120px]">
                      FY{year}
                    </th>
                  ))}
                  <th className="border border-gray-300 px-3 py-3 text-center font-semibold w-20">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {financialData.map((metric) => (
                  <tr key={metric.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 bg-gray-50 font-medium">
                      <input
                        type="text"
                        value={metric.name}
                        onChange={(e) => updateMetricName(metric.id, e.target.value)}
                        onBlur={() => saveCompanyData(false)}
                        className="w-full px-2 py-1 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded text-sm"
                        placeholder="Enter metric name"
                      />
                    </td>
                    {years.map(year => (
                      <td key={year} className="border border-gray-300 px-3 py-2">
                        <input
                          type="text"
                          value={metric.values[year] || ''}
                          onChange={(e) => updateMetricValue(metric.id, year, e.target.value)}
                          onBlur={() => saveCompanyData(false)}
                          className="w-full px-2 py-1 border border-gray-200 rounded text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="-"
                        />
                      </td>
                    ))}
                    <td className="border border-gray-300 px-3 py-2 text-center">
                      <button
                        onClick={() => {
                          deleteMetric(metric.id);
                        }}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete row"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex items-center justify-between">
              <button
                onClick={addNewMetric}
                className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add New Metric
              </button>
              {isEditing && (
                <span className="text-xs text-gray-500">You have unsaved changes</span>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-2">No financial data loaded</p>
            <p className="text-xs text-gray-500 mb-4">Upload an Excel file to get started</p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 cursor-pointer">
              <Upload className="h-4 w-4" />
              Upload Excel File
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isLoading}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataInputSheet;
