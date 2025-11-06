import React, { useState } from 'react';

const DataInputOverview = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'data-input', label: 'Data Input Sheet' },
    { id: 'dcf', label: 'DCF Worksheet' },
  ];

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Data Input Sheet Overview</h1>
        <p className="text-sm text-gray-600">
          Comprehensive guide to understanding the Data Input Sheet structure and DCF valuation methodology
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <div className="flex space-x-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`py-2 px-4 text-xs font-medium border-b-2 transition-colors ${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 p-4">
        <>
        {activeSection === 'overview' && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Introduction</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                The Data Input worksheet contains historical financial and market data for a company, which is essential 
                for analyzing its performance and making forecasts. It's like a big table which represents the interface 
                that organizes all the important numbers about a company in one place.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-3 rounded">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Purpose</h3>
              <p className="text-xs text-blue-800">
                The Data Input Sheet serves as the central repository for all company financial data, enabling comprehensive 
                analysis, forecasting, and valuation calculations. It provides a structured format for organizing historical 
                financials, market data, and supporting information needed for DCF (Discounted Cash Flow) valuation.
              </p>
            </div>
          </div>
        )}

        {activeSection === 'data-input' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Key Sections in the Data Input Sheet</h2>
              
              {/* Section 1: Company Information */}
              <div className="mb-5 p-3 border border-gray-200 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Company Information</h3>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-700 mb-2">
                    Basic details about the company, such as its name, industry, or ticker symbol. This can be used to 
                    identify which company the data belongs to.
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>Company name</li>
                    <li>Industry classification</li>
                    <li>Ticker symbol</li>
                    <li>Exchange information</li>
                    <li>Country/Region</li>
                  </ul>
                </div>
              </div>

              {/* Section 2: Historical Financial Data */}
              <div className="mb-5 p-3 border border-gray-200 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Historical Financial Data</h3>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-700 mb-3">
                    Organized in rows and columns, with each row representing a specific financial metric and each column 
                    representing a specific year (e.g., FY2013, FY2014, etc.). This allows tracking how each metric changes over time.
                  </p>
                  
                  <div className="bg-gray-50 p-3 rounded mb-3">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Examples of Financial Metrics (Rows):</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">Intangible Assets</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">Adjusted Book Value</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">Interest Expense</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">CapEx (Capital Expenditures)</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">Revenue</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">Operating Income</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">Net Profit</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                          <span className="text-gray-700">EBIT (Earnings Before Interest & Taxes)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Columns Structure:</h4>
                    <p className="text-xs text-blue-800">
                      Each column represents a specific fiscal year (e.g., FY2013, FY2014, FY2015, etc.), allowing 
                      you to track how each metric changes over time and identify trends in the company's financial performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Market Data */}
              <div className="mb-5 p-3 border border-gray-200 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Market Data</h3>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-700 mb-2">
                    Includes information about the company's stock performance, updated daily manually or using available API systems.
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">Key Market Metrics:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      <li><strong>Share Price:</strong> The price of one share of the company's stock</li>
                      <li><strong>Change from Previous Day:</strong> How the share price changed compared to the day before</li>
                      <li><strong>Percentage Change (%):</strong> The percentage increase or decrease in the share price</li>
                      <li><strong>52-Week Range:</strong> The highest and lowest stock prices over the past 52 weeks</li>
                      <li><strong>Market Capitalization:</strong> Total market value of the company's outstanding shares</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 4: Ratings & Metrics */}
              <div className="mb-5 p-3 border border-gray-200 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Automated Ratings & Key Financial Ratios</h3>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-700 mb-2">
                    The platform automatically generates ratings as soon as you input your historical and projected financial 
                    data on the back end. These ratings encompass key financial ratios and critical metrics.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Profitability Ratios:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• ROE (Return on Equity)</li>
                        <li>• ROIC (Return on Invested Capital)</li>
                        <li>• EBIT Margins</li>
                        <li>• Net Profit Margin</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Valuation Ratios:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• EV/EBITDA</li>
                        <li>• Price/NAV</li>
                        <li>• P/E Ratio</li>
                        <li>• EV/EBIT</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Growth Ratios:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Revenue Growth</li>
                        <li>• Net Profit Growth</li>
                        <li>• EBIT Growth</li>
                        <li>• Cash Flow Growth</li>
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">Other Metrics:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Current Ratio</li>
                        <li>• Debt Ratio</li>
                        <li>• Interest Cover Ratio</li>
                        <li>• Total Asset Turnover</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Miscellaneous Data */}
              <div className="mb-5 p-3 border border-gray-200 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">5</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Miscellaneous Data</h3>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-700">
                    Some cells may contain additional notes or placeholders for missing data. There may also be columns 
                    for future projections or metrics that are calculated later in other sheets.
                  </p>
                </div>
              </div>

              {/* Section 6: Latest News and Articles */}
              <div className="mb-5 p-3 border border-gray-200 rounded">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm">6</span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900">Latest News and Articles</h3>
                </div>
                <div className="ml-11">
                  <p className="text-sm text-gray-700">
                    The interface includes a section dedicated to articles, which are regularly uploaded through the back 
                    end to provide market updates on every company tracked by the system.
                  </p>
                </div>
              </div>

              {/* Developer Requirements */}
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <h3 className="text-base font-semibold text-yellow-900 mb-3">What Developers Need to Build</h3>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">1. Create a Structure for Storing Data</h4>
                    <ul className="text-xs text-yellow-800 space-y-1 ml-4">
                      <li>• Each financial metric (e.g., CapEx, revenue) should have a row</li>
                      <li>• Each year (e.g., FY2013, FY2014) should have a column</li>
                      <li>• Market data can be stored in separate columns or a related table</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">2. Handle Missing or Extra Data</h4>
                    <ul className="text-xs text-yellow-800 space-y-1 ml-4">
                      <li>• Allow flexibility for metrics that might not always be available</li>
                      <li>• Design the database to support adding new metrics without major changes</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-yellow-800 mb-1">3. Enable Updates</h4>
                    <ul className="text-xs text-yellow-800 space-y-1 ml-4">
                      <li>• Make it easy to add new years, update existing values, or import data in bulk</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
                <h3 className="text-base font-semibold text-green-900 mb-3">Key Features for Developers to Include</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">1. User-Friendly Interface</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Dropdown menus for selecting metrics</li>
                      <li>• Easy-to-use input fields for entering numerical data</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">2. Data Validation</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Ensure numbers are entered in the correct format</li>
                      <li>• No text in numeric fields</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">3. Bulk Upload Capability</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Allow users to upload spreadsheets to populate the database quickly</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">4. Dynamic Updates</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Automatically update projections or dependent metrics when historical data changes</li>
                    </ul>
                  </div>

                  <div className="bg-white p-3 rounded md:col-span-2">
                    <h4 className="text-sm font-semibold text-gray-800 mb-1">5. APIs for Automation</h4>
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• Allow external data sources to update metrics automatically</li>
                      <li>• Support integration with market data providers for real-time updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'dcf' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">DCF (Discounted Cash Flow) Worksheet</h2>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                The DCF worksheet is a crucial part of valuing a company, and it calculates the company's value based 
                on its future cash flows. This section provides a detailed explanation of how it works, what's in the 
                worksheet, and how everything is calculated.
              </p>
            </div>

            {/* What the DCF Worksheet Contains */}
            <div className="border border-gray-200 rounded p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">What the DCF Worksheet Contains</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">1. Revenue and Growth Projections</h4>
                  <p className="text-xs text-gray-700">
                    The section which is always the top line on the DCF worksheet starts with historic data and then 
                    an estimate of the company's future revenues (sales). Growth rates are applied to project revenue 
                    for each future year.
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">2. Operating Costs and Margins</h4>
                  <p className="text-xs text-gray-700">
                    Costs (e.g., production, administration) are subtracted from revenue to calculate operating profit 
                    (EBIT - Earnings Before Interest and Taxes). Margins like EBIT are calculated as percentages of revenue.
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">3. Free Cash Flows (FCF)</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    Free Cash Flow is the actual cash generated by the company after accounting for all expenses, taxes, 
                    investments in assets (CapEx), and changes in working capital.
                  </p>
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <p className="text-xs font-mono text-blue-900">
                      <strong>Formula:</strong> FCF = EBIT × (1 - Tax Rate) - Reinvestment or CapEx
                    </p>
                    <p className="text-xs text-blue-800 mt-1 italic">
                      Note: In Excel spreadsheets where there are no rows for depreciation and changes in working capital, 
                      the simplified formula is used.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">4. Discount Rate</h4>
                  <p className="text-xs text-gray-700">
                    The WACC (Weighted Average Cost of Capital) is used to discount the future cash flows to their present value. 
                    WACC is calculated in a separate worksheet and can be inputted manually in the DCF calculation.
                  </p>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">5. Terminal Value</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    A large portion of the company's value comes from years beyond the projection period. The terminal value 
                    estimates this long-term value using a perpetual growth formula.
                  </p>
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <p className="text-xs font-mono text-blue-900">
                      <strong>Formula:</strong> Terminal Value = [FCF in Final Year × (1 + Terminal Growth Rate)] ÷ (WACC - Terminal Growth Rate)
                    </p>
                    <p className="text-xs text-blue-800 mt-1 italic">
                      Always refer to the Excel sheet for the exact formula implementation.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">6. Present Value (PV)</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    Future cash flows and the terminal value are brought back to today's value using the WACC.
                  </p>
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <p className="text-xs font-mono text-blue-900">
                      <strong>Formula:</strong> PV of Cash Flow = FCF in Year n ÷ (1 + WACC)^n
                    </p>
                    <p className="text-xs text-blue-800 mt-1 italic">
                      Always refer to the worksheet for the correct formula.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How the DCF Worksheet is Built */}
            <div className="border border-gray-200 rounded p-4">
              <h3 className="text-base font-semibold text-gray-900 mb-3">How the DCF Worksheet is Built</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">1. Input Assumptions</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    At the top of the worksheet, you'll typically find the key assumptions:
                  </p>
                  <div className="bg-gray-50 p-3 rounded">
                    <ul className="text-xs text-gray-700 space-y-1">
                      <li>• <strong>Revenue growth rate:</strong> How fast the company's sales are expected to grow</li>
                      <li>• <strong>EBIT margin:</strong> The profitability of the company</li>
                      <li>• <strong>Tax rate:</strong> The percentage of profit paid as taxes</li>
                      <li>• <strong>CapEx:</strong> How much is reinvested into the business</li>
                      <li>• <strong>Terminal growth rate:</strong> The long-term growth rate after the projection period</li>
                      <li>• <strong>WACC:</strong> The discount rate used to calculate present value</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">2. Cash Flow Projections</h4>
                  <div className="bg-gray-50 p-3 rounded space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-gray-800 mb-1">Start with Revenue Projections:</p>
                      <p className="text-xs text-gray-700">
                        Base year revenue is taken from historical data. Future revenues are calculated using: 
                        <span className="font-mono bg-blue-50 px-1">Revenue_Next Year = Revenue_Current Year × (1 + Growth Rate)</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 mb-1">Deduct Costs and Expenses:</p>
                      <p className="text-xs text-gray-700">
                        Operating expenses (e.g., salaries, materials) are subtracted to calculate EBIT.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 mb-1">Adjust for Taxes:</p>
                      <p className="text-xs text-gray-700">
                        Multiply EBIT by (1 - Tax Rate) to get after-tax operating income.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 mb-1">Account for Non-Cash Adjustments:</p>
                      <p className="text-xs text-gray-700">
                        Add back depreciation (it's a non-cash expense). Subtract CapEx and changes in working capital.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">3. Calculate Free Cash Flow (FCF)</h4>
                  <p className="text-xs text-gray-700">
                    Combine all components: After-tax EBIT + Depreciation - CapEx - Working Capital = FCF
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">4. Discount the FCF to Present Value</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    Use the formula for each year's FCF: <span className="font-mono bg-blue-50 px-1">PV of FCF = FCF in Year n ÷ (1 + WACC)^n</span>
                  </p>
                  <p className="text-xs text-gray-600 italic">
                    This step ensures that future cash flows are adjusted for the time value of money (money today is worth more than the same amount in the future).
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">5. Calculate Terminal Value</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    Estimate the value of cash flows after the projection period using the perpetual growth formula, then discount this value back to today using the WACC.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-800 mb-2">6. Add Everything Together</h4>
                  <p className="text-xs text-gray-700 mb-2">
                    <span className="font-mono bg-blue-50 px-1">DCF Value = Sum of Discounted FCFs + Discounted Terminal Value</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Key Drivers */}
            <div className="border border-gray-200 rounded p-4 bg-green-50">
              <h3 className="text-base font-semibold text-green-900 mb-3">Key Drivers of Cash Flow Growth</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">1. Revenue Growth Rate</h4>
                  <p className="text-xs text-gray-700">Higher sales growth increases cash flow</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">2. Operating Efficiency</h4>
                  <p className="text-xs text-gray-700">Improved margins (e.g., EBITDA margin) boost profitability</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">3. Cost Control</h4>
                  <p className="text-xs text-gray-700">Reducing CapEx and better working capital management can free up more cash</p>
                </div>

                <div className="bg-white p-3 rounded">
                  <h4 className="text-sm font-semibold text-gray-800 mb-1">4. Tax Optimization</h4>
                  <p className="text-xs text-gray-700">Lower tax rates mean more cash is retained</p>
                </div>
              </div>
            </div>
          </div>
        )}
        </>
      </div>
    </div>
  );
};

export default DataInputOverview;

