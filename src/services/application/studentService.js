/**
 * Application Layer: Student Service
 * 
 * This module handles student-related API operations.
 * 
 * Rules:
 * - Student operations MUST live in Application layer
 * - API calls MUST use Infrastructure layer (apiClient)
 * - UI MUST NOT know API endpoint details
 */

import { apiClient } from '../infrastructure/apiClient';

class StudentService {
  /**
   * Get student's enrolled courses
   * @returns {Promise<Object>} Courses data with enrollment details
   */
  async getCourses() {
    try {
      const response = await apiClient.get('/api/students/courses');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to load courses');
      }

      const apiResponse = await response.json();
      
      // Validate response structure
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      return apiResponse.data || [];
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch courses');
    }
  }

  /**
   * Get student's payment history
   * @param {Object} options - Query options
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.pageSize - Items per page (default: 10)
   * @returns {Promise<Object>} Payment data with pagination and summary
   */
  async getPayments(options = {}) {
    try {
      const { page = 1, pageSize = 10 } = options;
      
      // Build query string
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      });
      
      const response = await apiClient.get(`/api/students/payments?${queryParams}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to load payment history');
      }

      const apiResponse = await response.json();
      
      // Validate response structure
      if (apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      return apiResponse.data || {
        payments: [],
        pagination: {},
        summary: {},
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch payment history');
    }
  }
}

// Export singleton instance
export const studentService = new StudentService();
export default studentService;

