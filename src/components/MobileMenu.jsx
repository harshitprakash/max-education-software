// src/components/MobileMenu.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../services/application/AuthContext";
import { showSuccess } from "../services/application/toastService";
import LogoutConfirmation from "./LogoutConfirmation";

const MobileMenu = ({ isOpen, onClose }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const routePath = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false);
    await logout();
    showSuccess("Logged out successfully");
    navigate("/login", { replace: true });
    onClose();
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className={`mobile-off-canvas-active ${isOpen ? "show" : ""}`}>
      {/* Close button */}
      <a className="mobile-aside-close" onClick={onClose}>
        <i className="icofont icofont-close-line"></i>
      </a>

      <div className="header-mobile-aside-wrap">
        <div className="mobile-menu-wrap">
          <nav>
            <ul className="mobile-menu">
              <li><Link to="/" onClick={onClose}>Home</Link></li>
              <li><Link to="/courses" onClick={onClose}>Courses</Link></li>
              <li><Link to="/about" onClick={onClose}>About</Link></li>
              <li><Link to="/contact" onClick={onClose}>Contact</Link></li>
              <li>
                <Link 
                  to="/verify-certificate" 
                  onClick={onClose}
                  style={{ color: '#5f2ded', fontWeight: '600' }}
                >
                  <i className="icofont-certificate-alt me-2"></i>Verify Certificate
                </Link>
              </li>
              {/* <li><Link to="/profile" onClick={onClose}>View Profile</Link></li> */}
              {routePath.pathname !== '/login' && (
                <li>
                  {isAuthenticated ? (
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogoutClick();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Logout
                    </a>
                  ) : (
                    <Link to="/login" onClick={onClose}>Login</Link>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>

        <div className="mobile-social-wrap">
          <a href="#"><i className="icofont icofont-facebook"></i></a>
          <a href="#"><i className="icofont icofont-twitter"></i></a>
          <a href="#"><i className="icofont icofont-instagram"></i></a>
          <a href="#"><i className="icofont icofont-youtube-play"></i></a>
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


export default MobileMenu;