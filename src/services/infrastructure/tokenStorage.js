/**
 * Infrastructure Layer: Token Storage
 * 
 * This module provides secure token storage abstraction.
 * UI components MUST NOT access tokens directly.
 * 
 * Rules:
 * - Tokens MUST NOT be stored in localStorage/sessionStorage in UI
 * - Token storage MUST be abstracted
 * - UI MUST NOT know where tokens are stored
 */

class TokenStorage {
  constructor() {
    // Using sessionStorage as secure storage abstraction
    // In production, this should use HttpOnly cookies via API
    this.ACCESS_TOKEN_KEY = 'auth_access_token';
    this.REFRESH_TOKEN_KEY = 'auth_refresh_token';
  }

  /**
   * Store access token
   * @param {string} token - Access token
   */
  setAccessToken(token) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.ACCESS_TOKEN_KEY, token);
    }
  }

  /**
   * Get access token
   * @returns {string|null} Access token or null
   */
  getAccessToken() {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
    }
    return null;
  }

  /**
   * Store refresh token
   * @param {string} token - Refresh token
   */
  setRefreshToken(token) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
  }

  /**
   * Get refresh token
   * @returns {string|null} Refresh token or null
   */
  getRefreshToken() {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
    }
    return null;
  }

  /**
   * Clear all tokens
   */
  clearTokens() {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  /**
   * Check if user has valid tokens
   * @returns {boolean} True if access token exists
   */
  hasToken() {
    return !!this.getAccessToken();
  }
}

// Export singleton instance
export const tokenStorage = new TokenStorage();
export default tokenStorage;

