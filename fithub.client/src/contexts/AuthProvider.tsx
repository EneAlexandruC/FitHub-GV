import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './auth';
import { API_BASE_URL } from '../config/api';

interface User {
  email: string;
}

const checkSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/User/check-session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors'
    });

    if (response.ok) {
      const data = await response.json();
      return data.isAuthenticated;
    }
    return false;
  } catch (error) {
    console.error('Session check error:', error);
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userEmail = sessionStorage.getItem('userEmail');
  const [user, setUser] = useState<User | null>(userEmail ? { email: userEmail } : null);
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isValidSession = await checkSession();
      const userEmail = sessionStorage.getItem('userEmail');

      if (isValidSession && userEmail) {
        setUser({ email: userEmail });
        setIsAuthenticated(true);
      } else {
        // Dacă sesiunea nu este validă, ștergem datele locale
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Verificăm sesiunea la fiecare 5 minute
    const sessionCheckInterval = setInterval(checkAuth, 5 * 60 * 1000);

    return () => clearInterval(sessionCheckInterval);
  }, []);

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
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Întotdeauna curățăm datele locale
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userEmail');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
