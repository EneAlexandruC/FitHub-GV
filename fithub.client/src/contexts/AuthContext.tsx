import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = 'http://localhost:5012';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // For testing purposes - uncomment this line to clear auth state on each app start
  // sessionStorage.removeItem('isLoggedIn'); sessionStorage.removeItem('userEmail');
  
  // Check if there's a logged in user in sessionStorage
  const userEmail = sessionStorage.getItem('userEmail');
  const [user, setUser] = useState<User | null>(userEmail ? { email: userEmail } : null);
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // No need to check auth on initialization anymore as we're using sessionStorage
  // We'll keep this method for potential explicit auth checks
  const checkAuth = useCallback(async () => {
    try {
      console.log('Explicit auth check requested...');
      const response = await fetch(`${API_BASE_URL}/api/User/isAuthenticated`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      console.log('Auth response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Auth response data:', JSON.stringify(data, null, 2));
        
        if (data.isAuthenticated === true) {
          setUser({ email: data.email });
          setIsAuthenticated(true);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userEmail', data.email);
        } else {
          setUser(null);
          setIsAuthenticated(false);
          sessionStorage.removeItem('isLoggedIn');
          sessionStorage.removeItem('userEmail');
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userEmail');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // We no longer need this effect since we're using sessionStorage
  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      const response = await fetch(`${API_BASE_URL}/api/User/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ email, password }),
      });

      console.log('Login response status:', response.status);
      
      const data = await response.json();
      console.log('Login response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.message === 'Login successful') {
        // Set login state in session storage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userEmail', email);
        
        setUser({ email });
        setIsAuthenticated(true);
        navigate('/profile');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      console.log('Attempting logout...');
      const response = await fetch(`${API_BASE_URL}/api/User/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors'
      });

      console.log('Logout response status:', response.status);
      
      // Always clear session storage regardless of response
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userEmail');
      
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      
      // Clear session storage even on error
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userEmail');
      
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 