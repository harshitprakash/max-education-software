import api from "../services/api";
import { auth } from "../utils/auth";

/**
 * Login - backend expects "userName" field (can be email or username)
 */
export const loginStudent = async (input, password) => {
  try {
    const response = await api.post("/Auth/login", {
      userName: input.trim(),
      password,
    });

    // ←←← FIX: Use response.data ! ←←←
    const data = response.data;

    // Save token and studentId if they exist
    if (data.token) {
      auth.setToken(data.token);
    }
    if (data.studentId) {
      auth.setStudentId(data.studentId);
    }

    // Return the data (or full response if needed elsewhere)
    return data;
  } catch (error) {
    // Properly handle and re-throw error for Login component
    const message =
      error.response?.data?.message ||
      error.message ||
      "Login failed. Please try again.";
    throw new Error(message);
  }
};

/**
 * Get student profile by ID
 */
export const getStudentProfile = async (studentId) => {
  if (!studentId) throw new Error("Student ID is required");

  const response = await api.get(`/Students/${studentId}`);
  return response.data;  // Always return .data for consistency
};