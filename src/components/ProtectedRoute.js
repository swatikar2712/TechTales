import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  if (!isAuthenticated) {
    // 🚪 If not logged in, send them to the login page
    return <Navigate to="/login" replace />;
  }

  // ✅ If logged in, let them see the page (children)
  return children;
};

export default ProtectedRoute;