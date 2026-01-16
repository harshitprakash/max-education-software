/**
 * Application Layer: Course Service
 * 
 * This module handles public course-related API operations.
 * 
 * Rules:
 * - Course operations MUST live in Application layer
 * - Public endpoints MUST use direct fetch (no authentication required)
 * - UI MUST NOT know API endpoint details
 */

class CourseService {
  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  /**
   * Get all public courses
   * @returns {Promise<Array>} Array of course objects
   */
  async getAllCourses() {
    try {
      // Public endpoint - no authentication required
      const response = await fetch(`${this.baseURL}/api/courses/public`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log raw response for debugging
      console.log('=== Raw API Response ===');
      console.log('Status:', response.status);
      console.log('OK:', response.ok);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      const apiResponse = await response.json();
      console.log('Response Body:', apiResponse);
      console.log('Response Type:', Array.isArray(apiResponse) ? 'Array' : typeof apiResponse);
      console.log('========================');

      // Handle error responses
      if (!response.ok) {
        console.error('API Error Response:', apiResponse);
        if (response.status === 404) {
          throw new Error('No courses found');
        }
        throw new Error(apiResponse.message || 'Failed to load courses');
      }

      // Handle different response structures
      // Case 1: Response is an array directly
      if (Array.isArray(apiResponse)) {
        console.log('Response is array, returning directly');
        return apiResponse;
      }

      // Case 2: Response has status and data structure
      if (apiResponse.status === 200 && apiResponse.data) {
        console.log('Response has status/data structure');
        return Array.isArray(apiResponse.data) ? apiResponse.data : [];
      }

      // Case 3: Response has status but no data, or different status
      if (apiResponse.status && apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      // Case 4: Response might have courses property
      if (apiResponse.courses && Array.isArray(apiResponse.courses)) {
        console.log('Response has courses property');
        return apiResponse.courses;
      }

      // Case 5: Response has data but no status
      if (apiResponse.data && Array.isArray(apiResponse.data)) {
        console.log('Response has data property (no status)');
        return apiResponse.data;
      }

      // If we get here, the response structure is unexpected
      console.warn('Unexpected response structure:', apiResponse);
      return [];
    } catch (error) {
      console.error('Error in getAllCourses:', error);
      throw new Error(error.message || 'Failed to fetch courses');
    }
  }

  /**
   * Get public course details by ID
   * @param {number|string} courseId - Course ID
   * @returns {Promise<Object>} Course details with modules, teacher, branch, and category
   */
  async getCourseDetails(courseId) {
    try {
      // Validate input
      if (!courseId) {
        throw new Error('Course ID is required');
      }

      const numericId = parseInt(courseId, 10);
      if (isNaN(numericId) || numericId <= 0) {
        throw new Error('Invalid course ID');
      }

      // Public endpoint - no authentication required
      const response = await fetch(`${this.baseURL}/api/courses/public/${numericId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Log raw response for debugging
      console.log('=== Raw Course Details API Response ===');
      console.log('Course ID:', numericId);
      console.log('Status:', response.status);
      console.log('OK:', response.ok);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));

      const apiResponse = await response.json();
      console.log('Response Body:', apiResponse);
      console.log('Response Type:', Array.isArray(apiResponse) ? 'Array' : typeof apiResponse);
      console.log('========================================');

      // Handle error responses
      if (!response.ok) {
        console.error('API Error Response:', apiResponse);
        if (response.status === 404) {
          throw new Error('Course not found');
        }
        if (response.status === 400) {
          throw new Error('Invalid course ID');
        }
        throw new Error(apiResponse.message || 'Failed to load course details');
      }

      // Handle different response structures
      // Case 1: Response is an object directly (course details)
      if (apiResponse && typeof apiResponse === 'object' && !Array.isArray(apiResponse)) {
        // Check if it has course properties (id, courseName, etc.)
        if (apiResponse.id || apiResponse.courseName || apiResponse.courseId) {
          console.log('Response is course object directly');
          return apiResponse;
        }
      }

      // Case 2: Response has status and data structure
      if (apiResponse.status === 200 && apiResponse.data) {
        console.log('Response has status/data structure');
        return apiResponse.data || null;
      }

      // Case 3: Response has status but no data, or different status
      if (apiResponse.status && apiResponse.status !== 200) {
        throw new Error(apiResponse.message || 'Invalid response from server');
      }

      // Case 4: Response might have course property
      if (apiResponse.course && typeof apiResponse.course === 'object') {
        console.log('Response has course property');
        return apiResponse.course;
      }

      // Case 5: Response has data but no status
      if (apiResponse.data && typeof apiResponse.data === 'object' && !Array.isArray(apiResponse.data)) {
        console.log('Response has data property (no status)');
        return apiResponse.data;
      }

      // If we get here, check if response itself is the course object
      if (apiResponse && typeof apiResponse === 'object' && apiResponse.id) {
        console.log('Response is course object (has id property)');
        return apiResponse;
      }

      // If we get here, the response structure is unexpected
      console.warn('Unexpected response structure:', apiResponse);
      return null;
    } catch (error) {
      console.error('Error in getCourseDetails:', error);
      throw new Error(error.message || 'Failed to fetch course details');
    }
  }
}

// Export singleton instance
export const courseService = new CourseService();
export default courseService;
