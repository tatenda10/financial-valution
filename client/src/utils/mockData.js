// Mock data generator for the Financial Valuation Platform

export const generateMockCompanies = () => {
  const companies = [
    {
      id: 'company-1',
      email: 'masimba@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Masimba Holdings Limited',
        industry: 'Construction',
        ticker: 'MSM',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '8.50',
        changeFromPreviousDay: '0.30',
        percentageChange: '3.66',
        prevClose: '8.20',
        week52Range: '5.20 - 9.80',
        marketCap: '13175000000'
      },
      rating: 8.5,
      financialData: [
        { name: 'Revenue', values: { '2019': '850000000', '2020': '900000000', '2021': '950000000', '2022': '1000000000', '2023': '1050000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '210000000', '2020': '225000000', '2021': '240000000', '2022': '255000000', '2023': '270000000' } },
        { name: 'EBITDA', values: { '2019': '250000000', '2020': '265000000', '2021': '280000000', '2022': '295000000', '2023': '310000000' } },
        { name: 'Net profit', values: { '2019': '180000000', '2020': '195000000', '2021': '210000000', '2022': '225000000', '2023': '240000000' } },
        { name: 'Equity', values: { '2019': '340000000', '2020': '360000000', '2021': '380000000', '2022': '400000000', '2023': '420000000' } },
        { name: 'Total assets', values: { '2019': '1200000000', '2020': '1300000000', '2021': '1400000000', '2022': '1500000000', '2023': '1600000000' } },
        { name: 'Long term debt', values: { '2019': '136000000', '2020': '144000000', '2021': '152000000', '2022': '160000000', '2023': '168000000' } },
        { name: 'Capex', values: { '2019': '85000000', '2020': '90000000', '2021': '95000000', '2022': '100000000', '2023': '105000000' } },
        { name: 'Free Cash Flow', values: { '2019': '75000000', '2020': '80000000', '2021': '85000000', '2022': '90000000', '2023': '95000000' } },
        { name: 'Issued Shares', values: { '2019': '135000000', '2020': '140000000', '2021': '145000000', '2022': '150000000', '2023': '155000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-15').toISOString(),
      lastUpdated: new Date('2024-01-20').toISOString()
    },
    {
      id: 'company-2',
      email: 'sasol@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Sasol Limited',
        industry: 'Energy',
        ticker: 'SOL',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '245.50',
        changeFromPreviousDay: '-5.20',
        percentageChange: '-2.07',
        prevClose: '250.70',
        week52Range: '180.00 - 280.00',
        marketCap: '156800000000'
      },
      rating: 7.2,
      financialData: [
        { name: 'Revenue', values: { '2019': '25000000000', '2020': '22000000000', '2021': '28000000000', '2022': '30000000000', '2023': '32000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '4500000000', '2020': '3500000000', '2021': '5200000000', '2022': '5800000000', '2023': '6200000000' } },
        { name: 'EBITDA', values: { '2019': '5800000000', '2020': '4800000000', '2021': '6500000000', '2022': '7100000000', '2023': '7600000000' } },
        { name: 'Net profit', values: { '2019': '3200000000', '2020': '2500000000', '2021': '3800000000', '2022': '4200000000', '2023': '4500000000' } },
        { name: 'Equity', values: { '2019': '45000000000', '2020': '48000000000', '2021': '52000000000', '2022': '56000000000', '2023': '60000000000' } },
        { name: 'Total assets', values: { '2019': '180000000000', '2020': '190000000000', '2021': '200000000000', '2022': '210000000000', '2023': '220000000000' } },
        { name: 'Long term debt', values: { '2019': '45000000000', '2020': '42000000000', '2021': '40000000000', '2022': '38000000000', '2023': '36000000000' } },
        { name: 'Capex', values: { '2019': '8000000000', '2020': '7500000000', '2021': '8500000000', '2022': '9000000000', '2023': '9500000000' } },
        { name: 'Free Cash Flow', values: { '2019': '2000000000', '2020': '1500000000', '2021': '2500000000', '2022': '3000000000', '2023': '3500000000' } },
        { name: 'Issued Shares', values: { '2019': '638000000', '2020': '638000000', '2021': '638000000', '2022': '638000000', '2023': '638000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-10').toISOString(),
      lastUpdated: new Date('2024-01-18').toISOString()
    },
    {
      id: 'company-3',
      email: 'mtn@company.com',
      password: 'password123',
      companyInfo: {
        name: 'MTN Group Limited',
        industry: 'Telecommunications',
        ticker: 'MTN',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '125.80',
        changeFromPreviousDay: '2.30',
        percentageChange: '1.86',
        prevClose: '123.50',
        week52Range: '95.00 - 145.00',
        marketCap: '234000000000'
      },
      rating: 8.8,
      financialData: [
        { name: 'Revenue', values: { '2019': '180000000000', '2020': '195000000000', '2021': '210000000000', '2022': '225000000000', '2023': '240000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '45000000000', '2020': '50000000000', '2021': '55000000000', '2022': '60000000000', '2023': '65000000000' } },
        { name: 'EBITDA', values: { '2019': '65000000000', '2020': '70000000000', '2021': '75000000000', '2022': '80000000000', '2023': '85000000000' } },
        { name: 'Net profit', values: { '2019': '32000000000', '2020': '36000000000', '2021': '40000000000', '2022': '44000000000', '2023': '48000000000' } },
        { name: 'Equity', values: { '2019': '120000000000', '2020': '135000000000', '2021': '150000000000', '2022': '165000000000', '2023': '180000000000' } },
        { name: 'Total assets', values: { '2019': '280000000000', '2020': '300000000000', '2021': '320000000000', '2022': '340000000000', '2023': '360000000000' } },
        { name: 'Long term debt', values: { '2019': '45000000000', '2020': '42000000000', '2021': '40000000000', '2022': '38000000000', '2023': '36000000000' } },
        { name: 'Capex', values: { '2019': '25000000000', '2020': '27000000000', '2021': '29000000000', '2022': '31000000000', '2023': '33000000000' } },
        { name: 'Free Cash Flow', values: { '2019': '40000000000', '2020': '43000000000', '2021': '46000000000', '2022': '49000000000', '2023': '52000000000' } },
        { name: 'Issued Shares', values: { '2019': '1860000000', '2020': '1860000000', '2021': '1860000000', '2022': '1860000000', '2023': '1860000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-12').toISOString(),
      lastUpdated: new Date('2024-01-19').toISOString()
    },
    {
      id: 'company-4',
      email: 'shoprite@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Shoprite Holdings Limited',
        industry: 'Retail',
        ticker: 'SHP',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '245.30',
        changeFromPreviousDay: '3.50',
        percentageChange: '1.45',
        prevClose: '241.80',
        week52Range: '200.00 - 260.00',
        marketCap: '145000000000'
      },
      rating: 7.8,
      financialData: [
        { name: 'Revenue', values: { '2019': '180000000000', '2020': '195000000000', '2021': '210000000000', '2022': '225000000000', '2023': '240000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '12000000000', '2020': '13000000000', '2021': '14000000000', '2022': '15000000000', '2023': '16000000000' } },
        { name: 'EBITDA', values: { '2019': '15000000000', '2020': '16000000000', '2021': '17000000000', '2022': '18000000000', '2023': '19000000000' } },
        { name: 'Net profit', values: { '2019': '8500000000', '2020': '9200000000', '2021': '9900000000', '2022': '10600000000', '2023': '11300000000' } },
        { name: 'Equity', values: { '2019': '45000000000', '2020': '48000000000', '2021': '51000000000', '2022': '54000000000', '2023': '57000000000' } },
        { name: 'Total assets', values: { '2019': '95000000000', '2020': '100000000000', '2021': '105000000000', '2022': '110000000000', '2023': '115000000000' } },
        { name: 'Long term debt', values: { '2019': '12000000000', '2020': '11000000000', '2021': '10000000000', '2022': '9000000000', '2023': '8000000000' } },
        { name: 'Capex', values: { '2019': '3500000000', '2020': '3800000000', '2021': '4100000000', '2022': '4400000000', '2023': '4700000000' } },
        { name: 'Free Cash Flow', values: { '2019': '11500000000', '2020': '12200000000', '2021': '12900000000', '2022': '13600000000', '2023': '14300000000' } },
        { name: 'Issued Shares', values: { '2019': '590000000', '2020': '590000000', '2021': '590000000', '2022': '590000000', '2023': '590000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-08').toISOString(),
      lastUpdated: new Date('2024-01-17').toISOString()
    },
    {
      id: 'company-5',
      email: 'firstrand@company.com',
      password: 'password123',
      companyInfo: {
        name: 'FirstRand Limited',
        industry: 'Banking',
        ticker: 'FSR',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '68.90',
        changeFromPreviousDay: '-0.80',
        percentageChange: '-1.15',
        prevClose: '69.70',
        week52Range: '55.00 - 75.00',
        marketCap: '385000000000'
      },
      rating: 9.1,
      financialData: [
        { name: 'Revenue', values: { '2019': '95000000000', '2020': '98000000000', '2021': '101000000000', '2022': '104000000000', '2023': '107000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '42000000000', '2020': '43000000000', '2021': '44000000000', '2022': '45000000000', '2023': '46000000000' } },
        { name: 'EBITDA', values: { '2019': '42000000000', '2020': '43000000000', '2021': '44000000000', '2022': '45000000000', '2023': '46000000000' } },
        { name: 'Net profit', values: { '2019': '30000000000', '2020': '31000000000', '2021': '32000000000', '2022': '33000000000', '2023': '34000000000' } },
        { name: 'Equity', values: { '2019': '180000000000', '2020': '190000000000', '2021': '200000000000', '2022': '210000000000', '2023': '220000000000' } },
        { name: 'Total assets', values: { '2019': '1200000000000', '2020': '1250000000000', '2021': '1300000000000', '2022': '1350000000000', '2023': '1400000000000' } },
        { name: 'Long term debt', values: { '2019': '85000000000', '2020': '88000000000', '2021': '91000000000', '2022': '94000000000', '2023': '97000000000' } },
        { name: 'Capex', values: { '2019': '2500000000', '2020': '2600000000', '2021': '2700000000', '2022': '2800000000', '2023': '2900000000' } },
        { name: 'Free Cash Flow', values: { '2019': '39500000000', '2020': '40400000000', '2021': '41300000000', '2022': '42200000000', '2023': '43100000000' } },
        { name: 'Issued Shares', values: { '2019': '5580000000', '2020': '5580000000', '2021': '5580000000', '2022': '5580000000', '2023': '5580000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-05').toISOString(),
      lastUpdated: new Date('2024-01-16').toISOString()
    },
    {
      id: 'company-6',
      email: 'nedbank@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Nedbank Group Limited',
        industry: 'Banking',
        ticker: 'NED',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '245.20',
        changeFromPreviousDay: '1.80',
        percentageChange: '0.74',
        prevClose: '243.40',
        week52Range: '200.00 - 260.00',
        marketCap: '125000000000'
      },
      rating: 8.2,
      financialData: [
        { name: 'Revenue', values: { '2019': '85000000000', '2020': '88000000000', '2021': '91000000000', '2022': '94000000000', '2023': '97000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '38000000000', '2020': '39000000000', '2021': '40000000000', '2022': '41000000000', '2023': '42000000000' } },
        { name: 'EBITDA', values: { '2019': '38000000000', '2020': '39000000000', '2021': '40000000000', '2022': '41000000000', '2023': '42000000000' } },
        { name: 'Net profit', values: { '2019': '27000000000', '2020': '28000000000', '2021': '29000000000', '2022': '30000000000', '2023': '31000000000' } },
        { name: 'Equity', values: { '2019': '150000000000', '2020': '160000000000', '2021': '170000000000', '2022': '180000000000', '2023': '190000000000' } },
        { name: 'Total assets', values: { '2019': '1100000000000', '2020': '1150000000000', '2021': '1200000000000', '2022': '1250000000000', '2023': '1300000000000' } },
        { name: 'Long term debt', values: { '2019': '75000000000', '2020': '78000000000', '2021': '81000000000', '2022': '84000000000', '2023': '87000000000' } },
        { name: 'Capex', values: { '2019': '2200000000', '2020': '2300000000', '2021': '2400000000', '2022': '2500000000', '2023': '2600000000' } },
        { name: 'Free Cash Flow', values: { '2019': '35800000000', '2020': '36700000000', '2021': '37600000000', '2022': '38500000000', '2023': '39400000000' } },
        { name: 'Issued Shares', values: { '2019': '509000000', '2020': '509000000', '2021': '509000000', '2022': '509000000', '2023': '509000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-04').toISOString(),
      lastUpdated: new Date('2024-01-15').toISOString()
    },
    {
      id: 'company-7',
      email: 'standardbank@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Standard Bank Group Limited',
        industry: 'Banking',
        ticker: 'SBK',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '185.40',
        changeFromPreviousDay: '-2.10',
        percentageChange: '-1.12',
        prevClose: '187.50',
        week52Range: '150.00 - 200.00',
        marketCap: '310000000000'
      },
      rating: 8.6,
      financialData: [
        { name: 'Revenue', values: { '2019': '120000000000', '2020': '125000000000', '2021': '130000000000', '2022': '135000000000', '2023': '140000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '55000000000', '2020': '57000000000', '2021': '59000000000', '2022': '61000000000', '2023': '63000000000' } },
        { name: 'EBITDA', values: { '2019': '55000000000', '2020': '57000000000', '2021': '59000000000', '2022': '61000000000', '2023': '63000000000' } },
        { name: 'Net profit', values: { '2019': '39000000000', '2020': '40500000000', '2021': '42000000000', '2022': '43500000000', '2023': '45000000000' } },
        { name: 'Equity', values: { '2019': '200000000000', '2020': '210000000000', '2021': '220000000000', '2022': '230000000000', '2023': '240000000000' } },
        { name: 'Total assets', values: { '2019': '1500000000000', '2020': '1550000000000', '2021': '1600000000000', '2022': '1650000000000', '2023': '1700000000000' } },
        { name: 'Long term debt', values: { '2019': '95000000000', '2020': '98000000000', '2021': '101000000000', '2022': '104000000000', '2023': '107000000000' } },
        { name: 'Capex', values: { '2019': '3000000000', '2020': '3100000000', '2021': '3200000000', '2022': '3300000000', '2023': '3400000000' } },
        { name: 'Free Cash Flow', values: { '2019': '52000000000', '2020': '53900000000', '2021': '55800000000', '2022': '57700000000', '2023': '59600000000' } },
        { name: 'Issued Shares', values: { '2019': '1670000000', '2020': '1670000000', '2021': '1670000000', '2022': '1670000000', '2023': '1670000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-03').toISOString(),
      lastUpdated: new Date('2024-01-14').toISOString()
    },
    {
      id: 'company-8',
      email: 'vodacom@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Vodacom Group Limited',
        industry: 'Telecommunications',
        ticker: 'VOD',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '95.60',
        changeFromPreviousDay: '0.90',
        percentageChange: '0.95',
        prevClose: '94.70',
        week52Range: '80.00 - 105.00',
        marketCap: '180000000000'
      },
      rating: 8.3,
      financialData: [
        { name: 'Revenue', values: { '2019': '90000000000', '2020': '95000000000', '2021': '100000000000', '2022': '105000000000', '2023': '110000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '22000000000', '2020': '23500000000', '2021': '25000000000', '2022': '26500000000', '2023': '28000000000' } },
        { name: 'EBITDA', values: { '2019': '32000000000', '2020': '34000000000', '2021': '36000000000', '2022': '38000000000', '2023': '40000000000' } },
        { name: 'Net profit', values: { '2019': '16000000000', '2020': '17000000000', '2021': '18000000000', '2022': '19000000000', '2023': '20000000000' } },
        { name: 'Equity', values: { '2019': '70000000000', '2020': '75000000000', '2021': '80000000000', '2022': '85000000000', '2023': '90000000000' } },
        { name: 'Total assets', values: { '2019': '150000000000', '2020': '160000000000', '2021': '170000000000', '2022': '180000000000', '2023': '190000000000' } },
        { name: 'Long term debt', values: { '2019': '25000000000', '2020': '24000000000', '2021': '23000000000', '2022': '22000000000', '2023': '21000000000' } },
        { name: 'Capex', values: { '2019': '12000000000', '2020': '13000000000', '2021': '14000000000', '2022': '15000000000', '2023': '16000000000' } },
        { name: 'Free Cash Flow', values: { '2019': '20000000000', '2020': '21000000000', '2021': '22000000000', '2022': '23000000000', '2023': '24000000000' } },
        { name: 'Issued Shares', values: { '2019': '1880000000', '2020': '1880000000', '2021': '1880000000', '2022': '1880000000', '2023': '1880000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-02').toISOString(),
      lastUpdated: new Date('2024-01-13').toISOString()
    },
    {
      id: 'company-9',
      email: 'picknpay@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Pick n Pay Stores Limited',
        industry: 'Retail',
        ticker: 'PIK',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '42.30',
        changeFromPreviousDay: '0.50',
        percentageChange: '1.20',
        prevClose: '41.80',
        week52Range: '35.00 - 48.00',
        marketCap: '18500000000'
      },
      rating: 6.8,
      financialData: [
        { name: 'Revenue', values: { '2019': '95000000000', '2020': '98000000000', '2021': '101000000000', '2022': '104000000000', '2023': '107000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '3500000000', '2020': '3600000000', '2021': '3700000000', '2022': '3800000000', '2023': '3900000000' } },
        { name: 'EBITDA', values: { '2019': '4500000000', '2020': '4600000000', '2021': '4700000000', '2022': '4800000000', '2023': '4900000000' } },
        { name: 'Net profit', values: { '2019': '2500000000', '2020': '2580000000', '2021': '2660000000', '2022': '2740000000', '2023': '2820000000' } },
        { name: 'Equity', values: { '2019': '15000000000', '2020': '15500000000', '2021': '16000000000', '2022': '16500000000', '2023': '17000000000' } },
        { name: 'Total assets', values: { '2019': '45000000000', '2020': '46000000000', '2021': '47000000000', '2022': '48000000000', '2023': '49000000000' } },
        { name: 'Long term debt', values: { '2019': '8000000000', '2020': '7500000000', '2021': '7000000000', '2022': '6500000000', '2023': '6000000000' } },
        { name: 'Capex', values: { '2019': '2000000000', '2020': '2100000000', '2021': '2200000000', '2022': '2300000000', '2023': '2400000000' } },
        { name: 'Free Cash Flow', values: { '2019': '2500000000', '2020': '2500000000', '2021': '2500000000', '2022': '2500000000', '2023': '2500000000' } },
        { name: 'Issued Shares', values: { '2019': '437000000', '2020': '437000000', '2021': '437000000', '2022': '437000000', '2023': '437000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2024-01-01').toISOString(),
      lastUpdated: new Date('2024-01-12').toISOString()
    },
    {
      id: 'company-10',
      email: 'anglo@company.com',
      password: 'password123',
      companyInfo: {
        name: 'Anglo American Platinum Limited',
        industry: 'Mining',
        ticker: 'AMS',
        exchange: 'JSE',
        country: 'South Africa'
      },
      marketData: {
        sharePrice: '850.20',
        changeFromPreviousDay: '-12.50',
        percentageChange: '-1.45',
        prevClose: '862.70',
        week52Range: '700.00 - 950.00',
        marketCap: '225000000000'
      },
      rating: 7.5,
      financialData: [
        { name: 'Revenue', values: { '2019': '180000000000', '2020': '165000000000', '2021': '195000000000', '2022': '210000000000', '2023': '225000000000' } },
        { name: 'Earnings before interest and tax (EBIT)', values: { '2019': '45000000000', '2020': '35000000000', '2021': '50000000000', '2022': '55000000000', '2023': '60000000000' } },
        { name: 'EBITDA', values: { '2019': '55000000000', '2020': '45000000000', '2021': '60000000000', '2022': '65000000000', '2023': '70000000000' } },
        { name: 'Net profit', values: { '2019': '32000000000', '2020': '25000000000', '2021': '36000000000', '2022': '39000000000', '2023': '42000000000' } },
        { name: 'Equity', values: { '2019': '120000000000', '2020': '125000000000', '2021': '130000000000', '2022': '135000000000', '2023': '140000000000' } },
        { name: 'Total assets', values: { '2019': '200000000000', '2020': '210000000000', '2021': '220000000000', '2022': '230000000000', '2023': '240000000000' } },
        { name: 'Long term debt', values: { '2019': '30000000000', '2020': '28000000000', '2021': '26000000000', '2022': '24000000000', '2023': '22000000000' } },
        { name: 'Capex', values: { '2019': '15000000000', '2020': '16000000000', '2021': '17000000000', '2022': '18000000000', '2023': '19000000000' } },
        { name: 'Free Cash Flow', values: { '2019': '40000000000', '2020': '29000000000', '2021': '43000000000', '2022': '47000000000', '2023': '51000000000' } },
        { name: 'Issued Shares', values: { '2019': '264000000', '2020': '264000000', '2021': '264000000', '2022': '264000000', '2023': '264000000' } },
        { name: 'Tax Rate', values: { '2019': '28.00%', '2020': '28.50%', '2021': '29.00%', '2022': '29.50%', '2023': '30.00%' } }
      ],
      years: ['2019', '2020', '2021', '2022', '2023'],
      submittedAt: new Date('2023-12-30').toISOString(),
      lastUpdated: new Date('2024-01-11').toISOString()
    }
  ];

  return companies;
};

export const generateMockArticles = () => {
  const articles = [
    {
      id: 'article-1',
      companyId: 'company-1',
      title: 'Masimba Holdings Reports Strong Q4 Earnings, Exceeds Market Expectations',
      summary: 'Masimba Holdings Limited has reported exceptional fourth-quarter earnings, with revenue growth of 5.6% year-over-year. The construction company\'s strong performance is attributed to successful project completions and expansion into new markets.',
      content: 'Masimba Holdings Limited (JSE: MSM) announced today that it has exceeded market expectations with its Q4 2023 financial results. The company reported revenue of R1.05 billion, representing a 5.6% increase compared to the same period last year. Net profit increased by 6.7% to R240 million, driven by improved operational efficiency and successful completion of several major infrastructure projects. The company\'s management remains optimistic about future growth prospects, citing a strong pipeline of projects and favorable market conditions in the construction sector.',
      author: 'Financial Research Team',
      publishedAt: new Date('2024-01-20').toISOString(),
      category: 'Earnings'
    },
    {
      id: 'article-2',
      companyId: 'company-1',
      title: 'Masimba Holdings Secures R500 Million Infrastructure Contract',
      summary: 'The company has been awarded a major infrastructure development contract worth R500 million, expected to significantly boost revenue over the next 18 months.',
      content: 'Masimba Holdings has secured a significant infrastructure development contract valued at R500 million. The project involves the construction of critical transportation infrastructure and is expected to commence in Q2 2024. This contract represents one of the largest single-project awards in the company\'s history and is expected to contribute substantially to revenue growth over the next 18 months. The project aligns with the company\'s strategic focus on large-scale infrastructure development.',
      author: 'Corporate News',
      publishedAt: new Date('2024-01-15').toISOString(),
      category: 'Corporate'
    },
    {
      id: 'article-3',
      companyId: 'company-2',
      title: 'Sasol Announces Strategic Shift Towards Renewable Energy',
      summary: 'Sasol Limited has unveiled plans to invest R15 billion in renewable energy projects over the next five years, marking a significant shift in the company\'s strategic direction.',
      content: 'Sasol Limited (JSE: SOL) has announced a major strategic initiative to invest R15 billion in renewable energy projects over the next five years. This represents a significant shift in the company\'s focus towards sustainable energy solutions. The investment will include solar and wind energy projects, as well as research and development in green hydrogen technology. The company aims to reduce its carbon footprint by 30% by 2030 while maintaining its position as a leading energy provider in South Africa.',
      author: 'Energy Sector Analyst',
      publishedAt: new Date('2024-01-18').toISOString(),
      category: 'Strategy'
    },
    {
      id: 'article-4',
      companyId: 'company-3',
      title: 'MTN Group Expands 5G Network Coverage Across Africa',
      summary: 'MTN Group has announced the expansion of its 5G network to 15 additional cities across Africa, strengthening its position as a leading telecommunications provider on the continent.',
      content: 'MTN Group Limited (JSE: MTN) has announced a major expansion of its 5G network infrastructure, bringing high-speed connectivity to 15 additional cities across Africa. This expansion represents an investment of over R8 billion and is expected to significantly enhance the company\'s competitive position in the telecommunications market. The rollout is scheduled to be completed by the end of 2024, providing millions of customers with access to next-generation mobile connectivity.',
      author: 'Technology Reporter',
      publishedAt: new Date('2024-01-19').toISOString(),
      category: 'Technology'
    },
    {
      id: 'article-5',
      companyId: 'company-4',
      title: 'Shoprite Holdings Reports Record Black Friday Sales',
      summary: 'Shoprite Holdings achieved record-breaking sales during the Black Friday period, with revenue increasing by 18% compared to the previous year.',
      content: 'Shoprite Holdings Limited (JSE: SHP) has reported exceptional performance during the Black Friday shopping period, with sales increasing by 18% compared to the previous year. The retail giant processed over 2.5 million transactions during the promotional period, with strong performance across all product categories. The company\'s digital platform also saw significant growth, with online sales increasing by 45% year-over-year. This strong performance reflects the company\'s effective marketing strategies and strong customer loyalty.',
      author: 'Retail Analyst',
      publishedAt: new Date('2024-01-17').toISOString(),
      category: 'Sales'
    },
    {
      id: 'article-6',
      companyId: 'company-5',
      title: 'FirstRand Limited Maintains Strong Capital Position',
      summary: 'FirstRand Limited has maintained its strong capital position with a CET1 ratio of 13.2%, well above regulatory requirements, demonstrating financial resilience.',
      content: 'FirstRand Limited (JSE: FSR) has reported a strong capital position with a Common Equity Tier 1 (CET1) ratio of 13.2%, significantly above the regulatory minimum of 10.5%. This strong capital position provides the bank with flexibility to pursue growth opportunities while maintaining financial stability. The bank\'s diversified business model, spanning retail banking, corporate banking, and investment banking, has contributed to its resilient performance in a challenging economic environment.',
      author: 'Banking Analyst',
      publishedAt: new Date('2024-01-16').toISOString(),
      category: 'Financials'
    }
  ];

  return articles;
};

export const initializeMockData = () => {
  // Check if data already exists
  const existingCompanies = localStorage.getItem('companies');
  if (existingCompanies && JSON.parse(existingCompanies).length > 0) {
    console.log('Mock data already exists. Skipping initialization.');
    return;
  }

  // Generate and store companies
  const companies = generateMockCompanies();
  localStorage.setItem('companies', JSON.stringify(companies));
  console.log(`✅ Initialized ${companies.length} mock companies`);

  // Generate and store articles
  const articles = generateMockArticles();
  localStorage.setItem('articles', JSON.stringify(articles));
  console.log(`✅ Initialized ${articles.length} mock articles`);

  // Initialize empty watchlist
  if (!localStorage.getItem('watchlist')) {
    localStorage.setItem('watchlist', JSON.stringify(['company-1', 'company-3']));
    console.log('✅ Initialized watchlist with sample companies');
  }

  console.log('🎉 Mock data initialization complete!');
};

