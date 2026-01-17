import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../services/application/AuthContext";
import { studentStorage } from "../../services/infrastructure/studentStorage";
import { showSuccess } from "../../services/application/toastService";
import LogoutConfirmation from "../../components/LogoutConfirmation";

const Sidebar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const getStudentName = () => {
    const studentData = studentStorage.getStudentData();
    if (studentData?.fullName) return studentData.fullName;
    if (studentData?.firstName || studentData?.lastName) {
      return `${studentData.firstName || ""} ${studentData.lastName || ""}`.trim();
    }
    return "Student";
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false);
    await logout();
    showSuccess("Logged out successfully");
    navigate("/login", { replace: true });
  };

  return (
    <div className="col-xl-3 col-lg-3 col-md-12">
      <div className="dashboard__inner sticky-top">
        <div className="dashboard__nav__title">
          <h6>Welcome, {getStudentName()}</h6>
        </div>

        <div className="dashboard__nav">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icofont-dashboard-web me-3"></i> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icofont-user-alt-3 me-3"></i> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/enrolledCourses"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="icofont-book-alt me-3"></i> Enrolled Courses
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/myCertificates"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
              <i className="icofont-award me-3"></i> My Certificates
              </NavLink>
            </li>

            <li>
              <NavLink to="/feeSection" className={({ isActive }) => (isActive ? "active" : "")}>
                <i className="icofont-rupee me-3"></i> Fees Details
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/changePassword"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <i className="icofont-lock me-3"></i> Change Password
              </NavLink>
            </li>

            {/* Logout – aligned using same structure */}
            <li>
              <a
                href="#logout"
                onClick={(e) => {
                  e.preventDefault();
                  setShowLogoutConfirm(true);
                }}
              >
                <i className="icofont-logout me-3"></i> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
};

export default Sidebar;
