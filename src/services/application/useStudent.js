/**
 * Custom Hook: useStudent
 * 
 * Provides easy access to student data throughout the application.
 * Student data is loaded from localStorage (persisted from login response).
 * 
 * Usage:
 *   const { student, isLoading } = useStudent();
 *   const studentName = student?.fullName;
 *   const coursesCount = student?.enrolledCoursesCount;
 */

import { useState, useEffect } from 'react';
import { studentStorage } from '../infrastructure/studentStorage';
import { useAuth } from './AuthContext';

export const useStudent = () => {
  const { isAuthenticated } = useAuth();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setStudent(null);
      setIsLoading(false);
      return;
    }

    // Load student data from localStorage
    const loadStudentData = () => {
      try {
        const studentData = studentStorage.getStudentData();
        setStudent(studentData);
      } catch (error) {
        console.warn('Error loading student data:', error);
        setStudent(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, [isAuthenticated]);

  return {
    student,
    isLoading,
    // Helper methods
    getStudentField: (field) => student?.[field] || null,
    hasStudent: () => !!student,
  };
};

export default useStudent;

