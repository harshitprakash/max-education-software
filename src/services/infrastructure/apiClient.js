/**
 * Infrastructure Layer: API Client
 * 
 * This module handles API requests with automatic token injection and refresh.
 * 
 * Rules:
 * - Access token MUST be attached automatically
 * - UI MUST NOT manually attach Authorization headers
 * - Token injection MUST be centralized
 * - Refresh MUST be automatic and silent
 * - Multiple refresh calls MUST be deduplicated
 */

import { tokenStorage } from './tokenStorage';

class ApiClient {
  constructor() {
    // Base URL without /api suffix (endpoints include /api in their path)
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    // Deduplication: Track ongoing refresh to prevent multiple simultaneous calls
    this.refreshPromise = null;
  }

  /**
   * Get default headers with authentication
   * @returns {Object} Headers object
   */
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    // Automatically inject access token
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return headers;
  }

  /**
   * Refresh access token using refresh token
   * Rules:
   * - MUST be automatic and silent
   * - MUST be deduplicated (only one refresh at a time)
   * - MUST NOT be called from UI
   * @returns {Promise<boolean>} True if refresh successful
   */
  async refreshToken() {
    // Deduplication: If refresh is already in progress, wait for it
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    // Create refresh promise and store it for deduplication
    this.refreshPromise = (async () => {
      try {
        const response = await fetch(`${this.baseURL}/api/Auth/refresh-token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: refreshToken,
          }),
        });

        if (!response.ok) {
          throw new Error(`Refresh failed: ${response.status}`);
        }

        const apiResponse = await response.json();

        // Validate response structure
        if (apiResponse.status !== 200 || !apiResponse.data) {
          throw new Error(apiResponse.message || 'Invalid refresh response');
        }

        const { accessToken, refreshToken: newRefreshToken } = apiResponse.data;

        if (!accessToken || !newRefreshToken) {
          throw new Error('Invalid response: tokens missing');
        }

        // Store new tokens in Infrastructure layer
        tokenStorage.setAccessToken(accessToken);
        tokenStorage.setRefreshToken(newRefreshToken);

        return true;
      } catch (error) {
        // Refresh failed - clear tokens
        tokenStorage.clearTokens();
        throw error;
      } finally {
        // Clear refresh promise to allow future refreshes
        this.refreshPromise = null;
      }
    })();

    return this.refreshPromise;
  }

  /**
   * Make authenticated API request with automatic token refresh
   * Rules:
   * - On 401, automatically refresh token
   * - Retry original request after refresh
   * - If refresh fails, logout
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Fetch options
   * @param {boolean} isRetry - Internal flag to prevent infinite retry loops
   * @returns {Promise<Response>} Fetch response
   */
  async request(endpoint, options = {}, isRetry = false) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...(options.headers || {}),
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 - token expired or invalid
      if (response.status === 401 && !isRetry) {
        // Attempt automatic token refresh
        try {
          await this.refreshToken();
          
          // Retry original request with new token
          return this.request(endpoint, options, true);
        } catch (refreshError) {
          // Refresh failed - clear tokens and throw
          // Application layer will handle logout
          // Rules: Generic error messages (rule 20.10 - Information Leakage)
          tokenStorage.clearTokens();
          throw new Error('Session expired. Please login again.');
        }
      }

      // If still 401 after retry, it's a real unauthorized error
      if (response.status === 401) {
        tokenStorage.clearTokens();
        throw new Error('Unauthorized');
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * POST request
   */
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * GET request
   */
  async get(endpoint) {
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;

