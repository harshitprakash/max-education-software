/**
 * Application Layer: Authentication Service
 * 
 * This module handles authentication logic.
 * 
 * Rules:
 * - Authentication logic MUST live in Application layer
 * - Token handling MUST use Infrastructure layer
 * - UI MUST NOT know token storage details
 */

import { tokenStorage } from '../infrastructure/tokenStorage';
import { apiClient } from '../infrastructure/apiClient';
import { studentStorage } from '../infrastructure/studentStorage';

class AuthService {
  constructor() {
    // Store user data in memory (Application layer)
    // Rules: User data MUST NOT be stored in Infrastructure layer
    this.currentUser = null;
    this.currentStudent = null;
  }

  /**
   * Check if string is a valid email format
   * @param {string} str - String to check
   * @returns {boolean} True if valid email format
   */
  isValidEmail(str) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  }

  /**
   * Parse validation errors from API response
   * @param {Array} validationData - Validation error data array
   * @returns {string} Formatted error message
   */
  parseValidationErrors(validationData) {
    if (!Array.isArray(validationData)) {
      return '';
    }

    const errors = [];
    validationData.forEach((field) => {
      if (field.errors && Array.isArray(field.errors)) {
        errors.push(...field.errors);
      }
    });

    return errors.join(' ');
  }

  /**
   * Login user
   * @param {string} identifier - Username or email
   * @param {string} password - Password
   * @returns {Promise<Object>} User data and tokens
   */
  async login(identifier, password) {
    try {
      // Login endpoint is public, so we need to make request without auth token
      const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      
      // Determine if identifier is email or username
      const isEmail = this.isValidEmail(identifier);
      
      // Build request body based on identifier type
      const requestBody = {
        password: password,
      };
      
      if (isEmail) {
        requestBody.email = identifier;
      } else {
        requestBody.userName = identifier;
      }

      const response = await fetch(`${baseURL}/api/Auth/student/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const apiResponse = await response.json();

      // Handle error responses
      // Rules: Generic error messages in UI (rule 20.10 - Information Leakage)
      if (!response.ok) {
        // Check for validation errors (400)
        if (apiResponse.status === 400 && Array.isArray(apiResponse.data)) {
          // Parse validation errors but use generic message
          const validationMessage = this.parseValidationErrors(apiResponse.data);
          // Use generic message to avoid information leakage
          throw new Error(validationMessage || 'Invalid input. Please check your credentials and try again.');
        }
        
        // Handle authentication errors (401)
        if (apiResponse.status === 401) {
          // Generic message - no auth reason disclosure (rule 20.10)
          throw new Error('Invalid credentials. Please try again.');
        }
        
        // Handle other error responses with generic messages
        // Rules: No stack traces, no auth reason disclosures (rule 20.10)
        throw new Error(apiResponse.message || 'An error occurred. Please try again.');
      }

      // Validate success response structure
      if (apiResponse.status !== 200 || !apiResponse.data) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      const { accessToken, refreshToken, user, student } = apiResponse.data;

      if (!accessToken || !refreshToken) {
        throw new Error('Invalid response: tokens missing');
      }

      // Store tokens in Infrastructure layer
      tokenStorage.setAccessToken(accessToken);
      tokenStorage.setRefreshToken(refreshToken);

      // Store user data in Application layer (memory)
      this.currentUser = user;
      this.currentStudent = student;

      // Store student data in localStorage for persistence across page refreshes
      if (student) {
        studentStorage.setStudentData(student);
      }

      return {
        user: {
          ...user,
          student: student,
        },
        success: true,
      };
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  }

  /**
   * Revoke refresh token on server
   * Rules:
   * - MUST invalidate refresh token on server
   * - Should be called before clearing local tokens
   * @returns {Promise<void>}
   */
  async revokeToken() {
    const refreshToken = tokenStorage.getRefreshToken();
    
    if (!refreshToken) {
      // No refresh token to revoke
      return;
    }

    try {
      // Use apiClient which automatically injects Bearer token
      // Rules: Token injection MUST be centralized (rule 18.3)
      // Try with camelCase first (refreshToken)
      let response = await apiClient.post('/api/Auth/revoke-token', {
        refreshToken: refreshToken,
      });

      // If that fails with 401, try with PascalCase (RefreshToken) as some APIs expect it
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          // Try with capitalized property name
          response = await apiClient.post('/api/Auth/revoke-token', {
            RefreshToken: refreshToken,
          });
        }
      }

      // Even if revoke fails, we continue with logout
      // Best effort: try to revoke, but don't block logout
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.warn('Token revocation failed:', errorData.message || 'Unknown error');
      }
    } catch (error) {
      // Network error or other issues - continue with logout anyway
      // Rules: Best effort - don't block logout if revoke fails
      console.warn('Token revocation error, but continuing with logout:', error.message || error);
    }
  }

  /**
   * Logout user
   * Rules:
   * - MUST clear access token
   * - MUST invalidate refresh token (on server via revoke)
   * - MUST reset application state
   */
  async logout() {
    // First, try to revoke token on server
    // This invalidates the refresh token server-side
    await this.revokeToken();
    
    // Clear tokens via Infrastructure layer
    tokenStorage.clearTokens();
    
    // Clear student data from localStorage
    studentStorage.clearStudentData();
    
    // Clear user data from Application layer
    this.currentUser = null;
    this.currentStudent = null;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated() {
    return tokenStorage.hasToken();
  }

  /**
   * Get current user (if needed)
   * Rules:
   * - User data MUST come from Application layer
   * - MUST NOT decode tokens in UI
   * @returns {Object|null} User object or null
   */
  getCurrentUser() {
    if (!this.isAuthenticated()) {
      return null;
    }

    // Try to get student from memory first, then from localStorage
    let student = this.currentStudent;
    if (!student) {
      student = studentStorage.getStudentData();
    }

    // Return user data stored in Application layer
    if (this.currentUser) {
      return {
        ...this.currentUser,
        student: student || this.currentStudent,
      };
    }

    return null;
  }

  /**
   * Get current student data
   * @returns {Object|null} Student object or null
   */
  getCurrentStudent() {
    if (!this.isAuthenticated()) {
      return null;
    }

    // Try memory first, then localStorage
    return this.currentStudent || studentStorage.getStudentData();
  }

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @param {string} confirmPassword - Confirm new password
   * @returns {Promise<Object>} Change password result
   */
  async changePassword(currentPassword, newPassword, confirmPassword) {
    try {
      // Use apiClient which automatically injects Bearer token
      // Rules: Token injection MUST be centralized (rule 18.3)
      // API expects PascalCase property names
      const response = await apiClient.post('/api/auth/change-password', {
        CurrentPassword: currentPassword,
        NewPassword: newPassword,
        ConfirmPassword: confirmPassword,
      });

      const apiResponse = await response.json();

      // Handle error responses
      // Rules: Generic error messages in UI (rule 20.10 - Information Leakage)
      if (!response.ok) {
        // Check for validation errors (400)
        if (apiResponse.status === 400 && Array.isArray(apiResponse.data)) {
          // Parse validation errors but use generic message
          const validationMessage = this.parseValidationErrors(apiResponse.data);
          throw new Error(validationMessage || 'Invalid input. Please check your password and try again.');
        }
        
        // Handle authentication errors (401)
        if (apiResponse.status === 401) {
          // Generic message - no auth reason disclosure (rule 20.10)
          throw new Error('Invalid current password. Please try again.');
        }
        
        // Handle other error responses with generic messages
        // Rules: No stack traces, no auth reason disclosures (rule 20.10)
        throw new Error(apiResponse.message || 'An error occurred. Please try again.');
      }

      // Validate success response structure
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      return {
        success: true,
        message: apiResponse.message || 'Password changed successfully',
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to change password');
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;

