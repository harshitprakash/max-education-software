/**
 * Protected Route Component
 * 
 * Rules:
 * - Protected routes MUST be wrapped by this component
 * - Authentication check MUST be centralized
 * - MUST redirect unauthenticated users to /login
 * - No API calls allowed before auth validation
 * 
 * Forbidden ❌:
 * - Inline auth checks in pages
 * - Direct token checks in components
 * - Accessing localStorage in UI components
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/application/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;

