export const auth = {
  getToken: () => localStorage.getItem("token"),

  setToken: (token) => localStorage.setItem("token", token),

  setStudentId: (studentId) => localStorage.setItem("studentId", studentId),

  getStudentId: () => localStorage.getItem("studentId"),

  // ← THIS WAS MISSING OR WRONG BEFORE
  isLoggedIn: () => {
    const token = localStorage.getItem("token");
    return !!token && token.trim() !== "";  // true if token exists and is not empty
  },

  logout: (redirect = false) => {
    localStorage.removeItem("token");
    localStorage.removeItem("studentId");
    if (redirect) {
      window.location.href = "/login";
    }
  },
};