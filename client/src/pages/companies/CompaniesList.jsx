import React, { useState, useEffect } from 'react';
import { FileText, Building2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import * as XLSX from 'xlsx';

const CompaniesList = () => {
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Sample financial data matching Masimba format with actual figures
  const getDefaultFinancialData = () => {
    const metrics = [
      { name: 'Intangible assets', values: { '2012': '', '2013': '', '2014': '', '2015': '', '2016': '', '2017': '', '2018': '', '2019': '', '2020': '', '2021': '', '2022': '', '2023': '' } },
      { name: 'Adjusted book value', values: { '2012': '', '2013': '', '2014': '', '2015': '', '2016': '', '2017': '', '2018': '', '2019': '', '2020': '', '2021': '', '2022': '', '2023': '' } },
      { name: 'Interest expense', values: { '2012': '12500000', '2013': '15000000', '2014': '18000000', '2015': '20000000', '2016': '22000000', '2017': '25000000', '2018': '28000000', '2019': '30000000', '2020': '32000000', '2021': '35000000', '2022': '38000000', '2023': '40000000' } },
      { name: 'Capex', values: { '2012': '50000000', '2013': '55000000', '2014': '60000000', '2015': '65000000', '2016': '70000000', '2017': '75000000', '2018': '80000000', '2019': '85000000', '2020': '90000000', '2021': '95000000', '2022': '100000000', '2023': '105000000' } },
      { name: 'Gross profit', values: { '2012': '150000000', '2013': '165000000', '2014': '180000000', '2015': '195000000', '2016': '210000000', '2017': '225000000', '2018': '240000000', '2019': '255000000', '2020': '270000000', '2021': '285000000', '2022': '300000000', '2023': '315000000' } },
      { name: 'DCF', values: { '2012': '1', '2013': '1', '2014': '1', '2015': '1', '2016': '1', '2017': '1', '2018': '1', '2019': '1', '2020': '1', '2021': '1', '2022': 'Price/NAV', '2023': '1' } },
      { name: 'Earnings before interest and tax (EBIT)', values: { '2012': '120000000', '2013': '135000000', '2014': '-936437', '2015': '150000000', '2016': '165000000', '2017': '180000000', '2018': '195000000', '2019': '210000000', '2020': '225000000', '2021': '240000000', '2022': '255000000', '2023': '270000000' } },
      { name: 'Share Price (cents)', values: { '2012': '0.81', '2013': '1.20', '2014': '1.50', '2015': '1.70', '2016': '2.10', '2017': '2.50', '2018': '3.20', '2019': '4.10', '2020': '5.20', '2021': '6.80', '2022': '7.20', '2023': '8.50' } },
      { name: 'Share price (previous day closing price)', values: { '2012': '0.80', '2013': '1.18', '2014': '1.48', '2015': '1.68', '2016': '2.08', '2017': '2.48', '2018': '3.18', '2019': '4.08', '2020': '5.18', '2021': '6.78', '2022': '7.18', '2023': '8.48' } },
      { name: 'Earnings attributable for shareholders', values: { '2012': '80000000', '2013': '95000000', '2014': '110000000', '2015': '125000000', '2016': '140000000', '2017': '155000000', '2018': '170000000', '2019': '185000000', '2020': '200000000', '2021': '215000000', '2022': '230000000', '2023': '245000000' } },
      { name: 'Net profit', values: { '2012': '75000000', '2013': '90000000', '2014': '105000000', '2015': '120000000', '2016': '135000000', '2017': '150000000', '2018': '165000000', '2019': '180000000', '2020': '195000000', '2011': '210000000', '2022': '225000000', '2023': '240000000' } },
      { name: 'Revenue', values: { '2012': '500000000', '2013': '550000000', '2014': '600000000', '2015': '650000000', '2016': '700000000', '2017': '750000000', '2018': '800000000', '2019': '850000000', '2020': '900000000', '2021': '25284481000', '2022': '950000000', '2023': '1000000000' } },
      { name: 'Equity', values: { '2012': '200000000', '2013': '220000000', '2014': '240000000', '2015': '260000000', '2016': '280000000', '2017': '300000000', '2018': '320000000', '2019': '340000000', '2020': '360000000', '2021': '380000000', '2022': '400000000', '2023': '420000000' } },
      { name: 'Issued Shares', values: { '2012': '100000000', '2013': '105000000', '2014': '110000000', '2015': '115000000', '2016': '120000000', '2017': '125000000', '2018': '130000000', '2019': '135000000', '2020': '140000000', '2021': '145000000', '2022': '150000000', '2023': '155000000' } },
      { name: 'Cash and bank balances', values: { '2012': '50000000', '2013': '55000000', '2014': '60000000', '2015': '65000000', '2016': '70000000', '2017': '75000000', '2018': '80000000', '2019': '85000000', '2020': '90000000', '2021': '95000000', '2022': '100000000', '2023': '105000000' } },
      { name: 'Minority interest', values: { '2012': '0', '2013': '0', '2014': '0', '2015': '0', '2016': '0', '2017': '0', '2018': '0', '2019': '0', '2020': '0', '2021': '0', '2022': '0', '2023': '0' } },
      { name: 'Preferred shares', values: { '2012': '', '2013': '', '2014': '', '2015': '', '2016': '', '2017': '', '2018': '', '2019': '', '2020': '', '2021': '', '2022': '', '2023': '' } },
      { name: 'Net Operating cashflow', values: { '2012': '90000000', '2013': '100000000', '2014': '110000000', '2015': '120000000', '2016': '130000000', '2017': '140000000', '2018': '150000000', '2019': '160000000', '2020': '170000000', '2021': '180000000', '2022': '190000000', '2023': '200000000' } },
      { name: 'Cash generated from operations', values: { '2012': '85000000', '2013': '95000000', '2014': '105000000', '2015': '115000000', '2016': '125000000', '2017': '135000000', '2018': '145000000', '2019': '155000000', '2020': '165000000', '2021': '175000000', '2022': '185000000', '2023': '195000000' } },
      { name: 'Current assets', values: { '2012': '300000000', '2013': '330000000', '2014': '360000000', '2015': '390000000', '2016': '420000000', '2017': '450000000', '2018': '480000000', '2019': '510000000', '2020': '540000000', '2021': '570000000', '2022': '600000000', '2023': '630000000' } },
      { name: 'Current liabilities', values: { '2012': '150000000', '2013': '165000000', '2014': '180000000', '2015': '195000000', '2016': '210000000', '2017': '225000000', '2018': '240000000', '2019': '255000000', '2020': '270000000', '2021': '285000000', '2022': '300000000', '2023': '315000000' } },
      { name: 'Non current liabilities', values: { '2012': '100000000', '2013': '110000000', '2014': '120000000', '2015': '130000000', '2016': '140000000', '2017': '150000000', '2018': '160000000', '2019': '170000000', '2020': '180000000', '2021': '190000000', '2022': '200000000', '2023': '210000000' } },
      { name: 'Trade Receivables', values: { '2012': '80000000', '2013': '88000000', '2014': '96000000', '2015': '104000000', '2016': '112000000', '2017': '120000000', '2018': '128000000', '2019': '136000000', '2020': '144000000', '2021': '152000000', '2022': '160000000', '2023': '168000000' } },
      { name: 'Cost of Sales', values: { '2012': '350000000', '2013': '385000000', '2014': '420000000', '2015': '455000000', '2016': '490000000', '2017': '525000000', '2018': '560000000', '2019': '595000000', '2020': '630000000', '2021': '665000000', '2022': '700000000', '2023': '735000000' } },
      { name: 'Total Inventory', values: { '2012': '60000000', '2013': '66000000', '2014': '72000000', '2015': '78000000', '2016': '84000000', '2017': '90000000', '2018': '96000000', '2019': '102000000', '2020': '108000000', '2021': '114000000', '2022': '120000000', '2023': '126000000' } },
      { name: 'Short term debt', values: { '2012': '50000000', '2013': '55000000', '2014': '60000000', '2015': '65000000', '2016': '70000000', '2017': '75000000', '2018': '80000000', '2019': '85000000', '2020': '90000000', '2021': '95000000', '2022': '100000000', '2023': '105000000' } },
      { name: 'Long term debt', values: { '2012': '80000000', '2013': '88000000', '2014': '96000000', '2015': '104000000', '2016': '112000000', '2017': '120000000', '2018': '128000000', '2019': '136000000', '2020': '144000000', '2021': '152000000', '2022': '160000000', '2023': '168000000' } },
      { name: 'Non current assets', values: { '2012': '400000000', '2013': '440000000', '2014': '480000000', '2015': '520000000', '2016': '560000000', '2017': '600000000', '2018': '640000000', '2019': '680000000', '2020': '720000000', '2021': '760000000', '2022': '800000000', '2023': '840000000' } },
      { name: 'Free Cash Flow', values: { '2012': '40000000', '2013': '45000000', '2014': '50000000', '2015': '55000000', '2016': '60000000', '2017': '65000000', '2018': '70000000', '2019': '75000000', '2020': '80000000', '2021': '85000000', '2022': '90000000', '2023': '95000000' } },
      { name: 'Cash balances', values: { '2012': '45000000', '2013': '50000000', '2014': '55000000', '2015': '60000000', '2016': '65000000', '2017': '70000000', '2018': '75000000', '2019': '80000000', '2020': '85000000', '2021': '90000000', '2022': '95000000', '2023': '100000000' } },
      { name: 'Dividend', values: { '2012': '20000000', '2013': '22000000', '2014': '24000000', '2015': '26000000', '2016': '28000000', '2017': '30000000', '2018': '32000000', '2019': '34000000', '2020': '36000000', '2021': '38000000', '2022': '40000000', '2023': '42000000' } },
      { name: 'Enterprise value (EV)', values: { '2012': '810000000', '2013': '1260000000', '2014': '1650000000', '2015': '1955000000', '2016': '2520000000', '2017': '3125000000', '2018': '4160000000', '2019': '5535000000', '2020': '7280000000', '2021': '9860000000', '2022': '10800000000', '2023': '13175000000' } },
      { name: 'Tax Rate', values: { '2012': '25.00%', '2013': '25.50%', '2014': '71.46%', '2015': '26.00%', '2016': '26.50%', '2017': '27.00%', '2018': '27.50%', '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } },
      { name: 'Net book value', values: { '2012': '450000000', '2013': '495000000', '2014': '540000000', '2015': '585000000', '2016': '630000000', '2017': '675000000', '2018': '720000000', '2019': '765000000', '2020': '810000000', '2021': '855000000', '2022': '900000000', '2023': '945000000' } },
      { name: 'Invested Capital', values: { '2012': '550000000', '2013': '605000000', '2014': '660000000', '2015': '715000000', '2016': '770000000', '2017': '825000000', '2018': '880000000', '2019': '935000000', '2020': '990000000', '2021': '1045000000', '2022': '1100000000', '2023': '1155000000' } },
      { name: 'EPS', values: { '2012': '0.00', '2013': '0.00', '2014': '-0.01', '2015': '0.04', '2016': '0.05', '2017': '0.06', '2018': '0.07', '2019': '0.08', '2020': '0.09', '2021': '0.10', '2022': '0.11', '2023': '0.12' } }
    ];
    
    return metrics.map((metric, idx) => ({
      id: `metric-${idx}`,
      name: metric.name,
      values: metric.values
    }));
  };

  // Default years (FY2012 to FY2023)
  const defaultYears = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];

  // Load logged-in company's data
  useEffect(() => {
    loadCompanyData();
  }, [user]);

  const loadCompanyData = () => {
    if (!user?.companyId) {
      setIsLoading(false);
      return;
    }

    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === user.companyId);
    
    if (foundCompany) {
      setCompany(foundCompany);
    }
    setIsLoading(false);
  };

  const exportCompanyData = () => {
    const companyData = company || {
      companyInfo: { name: user?.companyName || 'Company' },
      financialData: getDefaultFinancialData(),
      years: defaultYears
    };

    const wb = XLSX.utils.book_new();
    
    // Financial Data Sheet
    const financialDataSheet = [];
    const years = defaultYears;
    const financialData = company?.financialData && company.financialData.length > 0 
      ? company.financialData 
      : getDefaultFinancialData();
    
    // Header row
    financialDataSheet.push(['Metric', ...years.map(y => `FY${y}`)]);
    
    // Data rows
    financialData.forEach(metric => {
      const row = [
        metric.name,
        ...years.map(year => metric.values?.[year] || '')
      ];
      financialDataSheet.push(row);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(financialDataSheet);
    XLSX.utils.book_append_sheet(wb, ws, 'Financial Data');
    
    const fileName = `${companyData.companyInfo?.name || 'Company'}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  const formatCellValue = (value) => {
    if (value === '' || value === null || value === undefined) return '';
    
    // If it's a percentage or special text, return as is
    if (typeof value === 'string' && (value.includes('%') || value.includes('/') || isNaN(value))) {
      return value;
    }
    
    const num = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(num)) return value;
    
    // For very large numbers, show with commas
    return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  const getDisplayYears = () => {
    return company?.years && company.years.length > 0 ? company.years : defaultYears;
  };

  const getDisplayFinancialData = () => {
    if (company?.financialData && company.financialData.length > 0) {
      return company.financialData;
    }
    
    // Return default data with sample figures
    return getDefaultFinancialData();
  };

  if (isLoading) {
    return (
      <div className="p-3 max-w-7xl mx-auto">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  const companyName = company?.companyInfo?.name || user?.companyName || 'Company';
  const years = getDisplayYears();
  const financialData = getDisplayFinancialData();

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">View Financial Data</h1>
          <p className="text-sm text-gray-600">
            Complete financial statement for {companyName}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportCompanyData}
            className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700 flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export Excel
          </button>
        </div>
      </div>

      {/* Financial Data Table - Masimba Style */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-blue-900 text-white px-4 py-3 text-left font-semibold min-w-[300px] border-r border-blue-800">
                  {companyName}
                </th>
                {years.map(year => (
                  <th 
                    key={year} 
                    className="bg-blue-900 text-white px-4 py-3 text-center font-semibold min-w-[120px] border-r border-blue-800 last:border-r-0"
                  >
                    FY{year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {financialData.map((metric, idx) => (
                <tr 
                  key={metric.id || idx} 
                  className={`${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50`}
                >
                  <td className="px-4 py-3 font-medium text-gray-900 border-r border-gray-200 border-b border-gray-200">
                    {metric.name}
                  </td>
                  {years.map(year => (
                    <td 
                      key={year} 
                      className="px-4 py-3 text-right text-gray-700 border-r border-gray-200 border-b border-gray-200 last:border-r-0"
                    >
                      {formatCellValue(metric.values?.[year])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Company Information Section */}
      {company && company.companyInfo && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="bg-white border border-gray-200 p-3 rounded">
            <span className="text-xs text-gray-600">Industry</span>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {company.companyInfo.industry || '-'}
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-3 rounded">
            <span className="text-xs text-gray-600">Ticker</span>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {company.companyInfo.ticker || '-'}
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-3 rounded">
            <span className="text-xs text-gray-600">Exchange</span>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {company.companyInfo.exchange || '-'}
            </p>
          </div>
          <div className="bg-white border border-gray-200 p-3 rounded">
            <span className="text-xs text-gray-600">Country</span>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {company.companyInfo.country || '-'}
            </p>
          </div>
          {company.lastUpdated && (
            <div className="bg-white border border-gray-200 p-3 rounded">
              <span className="text-xs text-gray-600">Last Updated</span>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {new Date(company.lastUpdated).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompaniesList;
