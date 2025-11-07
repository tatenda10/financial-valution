import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ValuationDetails from './pages/ValuationDetails';
import FinancialPerformance from './pages/FinancialPerformance';
import RatioAnalysis from './pages/RatioAnalysis';
import NewsInsights from './pages/NewsInsights';
import Reports from './pages/Reports';
import Profile from './pages/Profile';
import DataInputSheet from './pages/input-data/DataInputSheet';
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
        <Route path="valuation" element={<ValuationDetails />} />
        <Route path="financial-performance" element={<FinancialPerformance />} />
        <Route path="ratio-analysis" element={<RatioAnalysis />} />
        <Route path="news" element={<NewsInsights />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
        <Route path="data-input" element={<DataInputSheet />} />
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
