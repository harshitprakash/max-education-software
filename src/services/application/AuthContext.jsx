/**
 * Application Layer: Authentication Context
 * 
 * Provides authentication state and methods to UI components.
 * 
 * Rules:
 * - Auth state MUST come from a hook (useAuth)
 * - UI MUST NOT access tokens directly
 * - Authentication check MUST be centralized
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Login function
   * @param {string} identifier - Username or email
   * @param {string} password - Password
   * @returns {Promise<Object>} Login result
   */
  const login = async (identifier, password) => {
    try {
      setIsLoading(true);
      const result = await authService.login(identifier, password);
      
      if (result.success) {
        setIsAuthenticated(true);
        setUser(result.user);
        return { success: true };
      }
      
      return { success: false, error: 'Login failed' };
    } catch (error) {
      return { success: false, error: error.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout function
   * Rules:
   * - MUST clear tokens
   * - MUST invalidate refresh token on server
   * - MUST reset application state
   */
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Even if logout fails, clear local state
      console.warn('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      
      // Clear profile header data from localStorage on logout
      try {
        localStorage.removeItem('profile_header_data');
        localStorage.removeItem('profile_courses_count');
        localStorage.removeItem('profile_certificates_count');
        // Student data is cleared by authService.logout() via studentStorage
      } catch (storageError) {
        console.warn('Error clearing localStorage on logout:', storageError);
      }
    }
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access authentication context
 * Rules:
 * - UI MUST use this hook to access auth state
 * - MUST NOT access tokens directly
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;

