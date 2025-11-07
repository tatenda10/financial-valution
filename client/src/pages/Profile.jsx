import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Save, User, Building2, Mail, Lock, Users } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [company, setCompany] = useState(null);
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    ticker: '',
    exchange: '',
    country: '',
    email: '',
    contactPerson: '',
    phone: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [activeTab, setActiveTab] = useState('company');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadCompanyData();
  }, [user]);

  const loadCompanyData = () => {
    if (!user?.companyId) return;

    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === user.companyId);
    
    if (foundCompany) {
      setCompany(foundCompany);
      setFormData({
        companyName: foundCompany.companyInfo?.name || '',
        industry: foundCompany.companyInfo?.industry || '',
        ticker: foundCompany.companyInfo?.ticker || '',
        exchange: foundCompany.companyInfo?.exchange || '',
        country: foundCompany.companyInfo?.country || '',
        email: foundCompany.email || user.email || '',
        contactPerson: foundCompany.contactPerson || '',
        phone: foundCompany.phone || ''
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveCompanyInfo = (e) => {
    e.preventDefault();
    
    if (!user?.companyId) return;

    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const companyIndex = storedCompanies.findIndex(c => c.id === user.companyId);
    
    if (companyIndex !== -1) {
      storedCompanies[companyIndex] = {
        ...storedCompanies[companyIndex],
        email: formData.email,
        companyInfo: {
          name: formData.companyName,
          industry: formData.industry,
          ticker: formData.ticker,
          exchange: formData.exchange,
          country: formData.country
        },
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem('companies', JSON.stringify(storedCompanies));
      setCompany(storedCompanies[companyIndex]);
      setMessage({ type: 'success', text: 'Company information updated successfully!' });
      
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (!user?.companyId) return;

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Verify current password
    const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
    const foundCompany = storedCompanies.find(c => c.id === user.companyId);
    
    if (foundCompany && foundCompany.password !== passwordData.currentPassword) {
      setMessage({ type: 'error', text: 'Current password is incorrect!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    // Update password
    const companyIndex = storedCompanies.findIndex(c => c.id === user.companyId);
    if (companyIndex !== -1) {
      storedCompanies[companyIndex].password = passwordData.newPassword;
      localStorage.setItem('companies', JSON.stringify(storedCompanies));
      
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  if (!company) {
    return (
      <div className="p-3 max-w-7xl mx-auto">
        <div className="bg-white border border-gray-200 p-6 text-center">
          <h3 className="text-base font-semibold text-gray-900 mb-2">No Company Data</h3>
          <p className="text-xs text-gray-600">Please ensure your company information is set up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-3">
        <h1 className="text-base font-bold text-gray-900 mb-0.5">Profile</h1>
        <p className="text-xs text-gray-600">Manage your company profile and settings</p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-3 p-2 text-xs ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border border-gray-200 mb-3">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('company')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'company'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Building2 className="h-3 w-3 inline mr-1" />
            Company Info
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'password'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Lock className="h-3 w-3 inline mr-1" />
            Change Password
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex-1 px-3 py-2 text-xs font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-3 w-3 inline mr-1" />
            User Accounts
          </button>
        </div>
      </div>

      {/* Company Info Tab */}
      {activeTab === 'company' && (
        <div className="bg-white border border-gray-200 p-3">
          <h2 className="text-xs font-semibold text-gray-900 mb-3">Update Company Contact Info</h2>
          <form onSubmit={handleSaveCompanyInfo}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Company Name *</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Ticker Symbol</label>
                <input
                  type="text"
                  name="ticker"
                  value={formData.ticker}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Exchange</label>
                <input
                  type="text"
                  name="exchange"
                  value={formData.exchange}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Save className="h-3 w-3" />
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Change Password Tab */}
      {activeTab === 'password' && (
        <div className="bg-white border border-gray-200 p-3">
          <h2 className="text-xs font-semibold text-gray-900 mb-3">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="space-y-3 mb-3">
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Current Password *</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">New Password *</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-600 mb-1">Confirm New Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 px-3 py-1.5 text-xs bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <Lock className="h-3 w-3" />
              Change Password
            </button>
          </form>
        </div>
      )}

      {/* User Accounts Tab */}
      {activeTab === 'users' && (
        <div className="bg-white border border-gray-200 p-3">
          <h2 className="text-xs font-semibold text-gray-900 mb-3">Manage User Accounts</h2>
          <div className="space-y-2 mb-3">
            <div className="p-2 bg-gray-50 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">{user?.email || 'Current User'}</p>
                  <p className="text-[10px] text-gray-600">{user?.role || 'Company User'}</p>
                </div>
                <span className="px-2 py-0.5 text-[10px] bg-green-100 text-green-800">Active</span>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-500">
            Multiple user account management will be available in future updates. Currently, each company 
            has a single user account associated with the login email.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;

