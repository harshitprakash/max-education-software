/**
 * Infrastructure Layer: Student Data Storage
 * 
 * This module provides storage abstraction for student data.
 * Student data is stored in localStorage for persistence across page refreshes.
 * 
 * Rules:
 * - Student data MUST be stored in localStorage for persistence
 * - UI components can access student data via this abstraction
 * - Data MUST be cleared on logout
 */

class StudentStorage {
  constructor() {
    this.STUDENT_DATA_KEY = 'student_data';
  }

  /**
   * Store student data
   * @param {Object} studentData - Student object from API
   */
  setStudentData(studentData) {
    if (typeof window !== 'undefined' && studentData) {
      try {
        localStorage.setItem(this.STUDENT_DATA_KEY, JSON.stringify(studentData));
      } catch (error) {
        console.warn('Error saving student data to localStorage:', error);
      }
    }
  }

  /**
   * Get student data
   * @returns {Object|null} Student object or null
   */
  getStudentData() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(this.STUDENT_DATA_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        console.warn('Error reading student data from localStorage:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Get specific student field
   * @param {string} field - Field name (e.g., 'firstName', 'fullName', 'enrolledCoursesCount')
   * @returns {any} Field value or null
   */
  getStudentField(field) {
    const studentData = this.getStudentData();
    return studentData?.[field] || null;
  }

  /**
   * Clear student data
   */
  clearStudentData() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(this.STUDENT_DATA_KEY);
      } catch (error) {
        console.warn('Error clearing student data from localStorage:', error);
      }
    }
  }

  /**
   * Check if student data exists
   * @returns {boolean} True if student data exists
   */
  hasStudentData() {
    return !!this.getStudentData();
  }
}

// Export singleton instance
export const studentStorage = new StudentStorage();
export default studentStorage;

