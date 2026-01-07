import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../services/application/AuthContext";
import { showSuccess } from "../services/application/toastService";
import LogoutConfirmation from "./LogoutConfirmation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const location = useLocation();
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
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const openMobileMenu = () => setMenuOpen(true);
  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <header>
      <div className="headerarea headerarea__2 header__sticky header__area">

        {/* Desktop View - Only on Large Screens */}
        <div className="container desktop__menu__wrapper d-none d-lg-block">
          <div className="row align-items-center">

            {/* Logo */}
            <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
              <div className="headerarea__left">
                <div className="headerarea__left__logo">
                  <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <img
                        loading="lazy"
                        src="/img/logo/logo_3.png"
                        alt="light logo"
                        className="site-logo light-logo"
                        style={{ height: '80px', width: 'auto' }}
                      />
                      <img
                        loading="lazy"
                        src="/img/logo/logo.jpg"
                        alt="dark logo"
                        className="site-logo dark-logo"
                        style={{ height: '60px', width: 'auto' }}
                      />
                    </div>
                    <strong><span>Max</span>Education</strong>
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="col-xl-7 col-lg-7">
              <div className="headerarea__main__menu">
                <nav>
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/verify-certificate" style={{ color: '#5f2ded', fontWeight: '600' }}>
                      <i className="icofont-certificate-alt me-2"></i>Verify Certificate
                    </Link></li>
                    {/* <li><Link to="/profile">View Profile</Link></li> */}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Login/Logout Button */}
            <div className="col-xl-3 col-lg-3">
              <div className="headerarea__right">
                {location.pathname !== '/login' && (
                  <div className="headerarea__button">
                    {isAuthenticated ? (
                      <button 
                        onClick={handleLogoutClick}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          fontSize: 'inherit',
                          fontFamily: 'inherit',
                          textDecoration: 'none',
                          padding: '8px 16px',
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <Link to="/login">Login</Link>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Mobile & Tablet View (including iPad Pro) */}
        <div className="container-fluid mob_menu_wrapper d-block d-lg-none">
          <div className="row align-items-center">
            <div className="col-8">
              <div className="mobile-logo">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <img
                      loading="lazy"
                      src="/img/logo/logo_3.png"
                      alt="light logo"
                      className="mobiles-logo light-logo"
                      style={{ height: '60px', width: 'auto' }}
                    />
                    <img
                      loading="lazy"
                      src="/img/logo/logo.jpg"
                      alt="dark logo"
                      className="mobiles-logo dark-logo"
                      style={{ height: '60px', width: 'auto' }}
                    />
                  </div>
                  <strong><span>Max</span>Education</strong>
                </Link>
              </div>
            </div>
            <div className="col-4 text-end">
              <button
                className="mobile-aside-button"
                onClick={openMobileMenu}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  color: "#333",
                  cursor: "pointer",
                  padding: "8px",
                }}
              >
                <i className="icofont-navigation-menu"></i>
              </button>
            </div>
          </div>
        </div>

      </div>

      <MobileMenu isOpen={menuOpen} onClose={closeMobileMenu} />
      
      {/* Logout Confirmation Dialog */}
      <LogoutConfirmation
        isOpen={showLogoutConfirm}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </header>
  );
};

export default Header;