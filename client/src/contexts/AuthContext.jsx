import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if company exists in localStorage (match by email or company name)
      const storedCompanies = JSON.parse(localStorage.getItem('companies') || '[]');
      let company = storedCompanies.find(c => 
        (c.email?.toLowerCase() === email.toLowerCase() ||
         c.companyInfo?.name?.toLowerCase() === email.toLowerCase() ||
         c.companyInfo?.ticker?.toLowerCase() === email.toLowerCase()) &&
        c.password === password
      );

      // If company not found, create new company account
      if (!company) {
        // For demo: allow login with any email/password and create company
        const companyName = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').trim() || 'Company';
        company = {
          id: `company-${Date.now()}`,
          email: email,
          companyInfo: {
            name: companyName,
            industry: '',
            ticker: '',
            exchange: '',
            country: ''
          },
          marketData: {},
          financialData: [],
          years: [],
          password: password,
          submittedAt: new Date().toISOString()
        };
        
        storedCompanies.push(company);
        localStorage.setItem('companies', JSON.stringify(storedCompanies));
      }

      // Create user session
      const mockUserData = {
        id: company.id,
        email: email,
        username: email.split('@')[0],
        companyId: company.id,
        companyName: company.companyInfo?.name || email.split('@')[0],
        role: 'Company User',
        name: company.companyInfo?.name || email.split('@')[0],
        permissions: ['read', 'write']
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      console.log('✅ Login successful, company:', mockUserData);
      
      setUser(mockUserData);
      setToken(mockToken);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('user', JSON.stringify(mockUserData));
      localStorage.setItem('currentCompanyId', company.id);
      
      return { success: true, user: mockUserData };
      
      // Simulate server call for other credentials (commented out for now)
      // const response = await fetch(`${BASE_URL}/auth/login`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ username, password })
      // });

      // Code below is for future API integration
      // // Check if response is JSON before trying to parse it
      // const contentType = response.headers.get('content-type');
      // let data;
      // 
      // if (contentType && contentType.includes('application/json')) {
      //   data = await response.json();
      //   console.log('🔍 Backend response:', data);
      // } else {
      //   // Handle non-JSON responses (like rate limiting errors)
      //   const textResponse = await response.text();
      //   console.log('🔍 Non-JSON response:', textResponse);
      //   
      //   if (response.status === 429) {
      //     throw new Error('Too many login attempts. Please wait a moment and try again.');
      //   } else {
      //     throw new Error(`Server error: ${textResponse}`);
      //   }
      // }
      //
      // if (response.ok) {
      //   const { token: authToken, user: userData } = data;
      //   console.log('✅ Login successful, user:', userData);
      //   
      //   setUser(userData);
      //   setToken(authToken);
      //   localStorage.setItem('token', authToken);
      //   localStorage.setItem('user', JSON.stringify(userData));
      //   
      //   return { success: true, user: userData };
      // } else {
      //   throw new Error(data.error || 'Username or password is wrong');
      // }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
