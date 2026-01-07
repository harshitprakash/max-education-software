import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../services/application/AuthContext';
import { studentStorage } from '../../services/infrastructure/studentStorage';
import { showSuccess } from '../../services/application/toastService';
import LogoutConfirmation from '../../components/LogoutConfirmation';

const Sidebar = () => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Get student name for welcome message
  const getStudentName = () => {
    const studentData = studentStorage.getStudentData();
    if (studentData?.fullName) {
      return studentData.fullName;
    }
    if (studentData?.firstName || studentData?.lastName) {
      return `${studentData.firstName || ''} ${studentData.lastName || ''}`.trim();
    }
    return 'Student';
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false);
    await logout();
    showSuccess("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
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
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-dashboard-web me-3"></i> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-user-alt-3 me-3"></i> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/enrolledCourses" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-book-alt me-3"></i> Enrolled Courses
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/myCertificates" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-certificate-alt me-3"></i> My Certificates
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/feeSection" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-rupee me-3"></i> Fees Details
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/changePassword" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-lock me-3"></i> Change Password
              </NavLink>
            </li>

            <li>
              <button
                onClick={handleLogoutClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '10px 15px',
                  background: 'none',
                  border: 'none',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                }}
              >
                <i className="icofont-logout me-3"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </div>
  );
};

export default Sidebar;