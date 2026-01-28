// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  useEffect(() => {
    // Listen for changes in localStorage (logout from another tab or manual delete)
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    // Optional: check every second (if you remove token in same tab)
    const interval = setInterval(() => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />; // redirect to login
  }

  return children;
};

export default ProtectedRoute;
