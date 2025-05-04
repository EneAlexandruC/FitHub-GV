import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Check if user is logged in using sessionStorage
  const isLoggedInFromStorage = sessionStorage.getItem('isLoggedIn') === 'true';
  const { isAuthenticated, user } = useAuth(); // Fallback to context if sessionStorage is empty
  const location = useLocation();
  
  // Use either sessionStorage or context
  const isLoggedIn = isLoggedInFromStorage || isAuthenticated;
  
  console.log('Protected route check:', { 
    path: location.pathname,
    isLoggedInFromStorage,
    isAuthenticated,
    userEmail: user?.email || 'No user email',
    isLoggedIn
  });

  // Redirect if not logged in
  if (!isLoggedIn) {
    console.log('User not logged in, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Log for debugging
  console.log('User is logged in, allowing access to:', location.pathname);

  // Allow access to the protected route
  return <>{children}</>;
};

export default ProtectedRoute; 