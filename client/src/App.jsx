import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import DataInputOverview from './pages/input-data/DataInputOverview';
import DataInputSheet from './pages/input-data/DataInputSheet';
import CompaniesList from './pages/companies/CompaniesList';
import CompaniesListPage from './pages/companies/CompaniesListPage';
import CompanyProfile from './pages/companies/CompanyProfile';
import FinancialSummary from './pages/companies/FinancialSummary';
import RatiosScoring from './pages/companies/RatiosScoring';
import ValuationDCF from './pages/companies/ValuationDCF';
import NewsResearch from './pages/companies/NewsResearch';
import UploadData from './pages/upload-data/UploadData';
import { initializeMockData } from './utils/mockData';

function AppRoutes() {
  // Protected Route Component - must be inside AppRoutes to access AuthProvider
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="companies" element={<CompaniesListPage />} />
        <Route path="companies/:id" element={<CompanyProfile />} />
        <Route path="companies/:id/financial-summary" element={<FinancialSummary />} />
        <Route path="companies/:id/ratios" element={<RatiosScoring />} />
        <Route path="companies/:id/valuation" element={<ValuationDCF />} />
        <Route path="companies/:id/news" element={<NewsResearch />} />
        <Route path="data-input" element={<DataInputSheet />} />
        <Route path="data-input/overview" element={<DataInputOverview />} />
        <Route path="upload-data" element={<UploadData />} />
        <Route path="view-data" element={<CompaniesList />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  // Initialize mock data on app load
  useEffect(() => {
    initializeMockData();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
