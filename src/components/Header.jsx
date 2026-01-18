import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useAuth } from "../services/application/AuthContext";
import { showSuccess } from "../services/application/toastService";
import LogoutConfirmation from "./LogoutConfirmation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("is_dark")
  );

  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogoutClick = () => setShowLogoutConfirm(true);

  const handleLogoutConfirm = async () => {
    setShowLogoutConfirm(false);
    await logout();
    showSuccess("Logged out successfully");
    navigate("/login", { replace: true });
  };

  const handleLogoutCancel = () => setShowLogoutConfirm(false);

  const openMobileMenu = () => setMenuOpen(true);
  const closeMobileMenu = () => setMenuOpen(false);

  // Listen for dark mode changes on <html> class
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("is_dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header>
      <div className="headerarea headerarea__2 header__sticky header__area">

        {/* Desktop & Large Screens */}
        <div
          className="container desktop__menu__wrapper d-none d-lg-flex"
          style={{ flexWrap: "wrap" }}
        >
          <div className="row align-items-center" style={{ width: "100%", flexWrap: "wrap" }}>

            {/* Logo */}
            <div
              className="col-xl-4 col-lg-4 col-md-3 col-sm-4 col-6"
              style={{ minWidth: "120px", flexGrow: 0 }}
            >
              <div className="headerarea__left">
                <div className="headerarea__left__logo">
                  <Link
                    to="/"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <div style={{ display: "flex", gap: "8px" }}>
                      <img
                        loading="lazy"
                        src="/img/logo/logo_3.png"
                        alt="light logo"
                        className="site-logo light-logo"
                        style={{ height: "60px", width: "auto" }}
                      />
                      <img
                        loading="lazy"
                        src="/img/logo/logo.jpg"
                        alt="dark logo"
                        className="site-logo dark-logo"
                        style={{ height: "50px", width: "auto" }}
                      />
                    </div>
                    <strong style={{ fontSize: "1rem" }}>
                      <span>Max</span>Education
                    </strong>
                  </Link>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div
              className="col-xl-6 col-lg-6 col-md-6 col-sm-4 col-6"
              style={{
                flexGrow: 1,
                minWidth: "160px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                className="headerarea__main__menu"
                style={{ overflowX: "auto", width: "100%" }}
              >
                <nav>
                  <ul
                    style={{
                      display: "flex",
                      flexWrap: "nowrap",
                      gap: "8px",
                      paddingLeft: 0,
                      margin: 0,
                      listStyle: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <li><Link to="/" style={{ whiteSpace: "nowrap" }}>Home</Link></li>
                    <li><Link to="/courses" style={{ whiteSpace: "nowrap" }}>Courses</Link></li>
                    <li><Link to="/about" style={{ whiteSpace: "nowrap" }}>About</Link></li>
                    <li><Link to="/contact" style={{ whiteSpace: "nowrap" }}>Contact Us</Link></li>
                    <li>
                      <Link
                        to="/verify-certificate"
                        style={{ color: "#5f2ded", fontWeight: "600", whiteSpace: "nowrap" }}
                      >
                        <i className="icofont-certificate-alt me-2"></i>Verify Certificate
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Profile Icon & Dropdown */}
            <div
              className="col-xl-1 col-lg-1 col-md-2 col-sm-3 col-4"
              style={{ display: "flex", justifyContent: "flex-end", minWidth: "50px" }}
              ref={profileRef}
            >
              {location.pathname !== "/login" && (
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* Profile Icon */}
                  <div
                    onClick={() => setProfileOpen(!profileOpen)}
                    tabIndex={0}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: isDarkMode ? "#2c2c2c" : "#f0f0f0",
                      color: isDarkMode ? "#eee" : "#333",
                      fontSize: "18px",
                      userSelect: "none",
                      outline: "none",
                    }}
                  >
                    <i className="fas fa-user" style={{ pointerEvents: "none" }}></i>
                  </div>

                  {/* Dropdown */}
                  {profileOpen && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        marginTop: "45px",
                        background: isDarkMode ? "#17093E" : "#fff",
                        border: "1px solid",
                        borderColor: isDarkMode ? "#333" : "#ddd",
                        borderRadius: "6px",
                        width: "160px",
                        minWidth: "140px",
                        boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                        zIndex: 1000,
                        overflow: "hidden",
                      }}
                    >
                      {isAuthenticated && (
                        <Link
                          to="/profile"
                          style={{
                            display: "block",
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isDarkMode ? "#eee" : "#333",
                            background: "transparent",
                            textAlign: "left",
                            fontSize: "14px",
                            lineHeight: "1.4",
                            borderBottom: `1px solid ${isDarkMode ? "#333" : "#eee"}`,
                          }}
                          onClick={() => setProfileOpen(false)}
                        >
                          View Profile
                        </Link>
                      )}

                      {!isAuthenticated && (
                        <Link
                          to="/login"
                          style={{
                            display: "block",
                            padding: "10px 15px",
                            textDecoration: "none",
                            color: isDarkMode ? "#eee" : "#333",
                            background: "transparent",
                            textAlign: "left",
                            fontSize: "14px",
                            lineHeight: "1.4",
                          }}
                          onClick={() => setProfileOpen(false)}
                        >
                          Login
                        </Link>
                      )}

                      {isAuthenticated && (
                        <div
                          onClick={() => {
                            setProfileOpen(false);
                            handleLogoutClick();
                          }}
                          style={{
                            display: "block",
                            padding: "10px 15px",
                            cursor: "pointer",
                            color: isDarkMode ? "#eee" : "#333",
                            background: "transparent",
                            textAlign: "left",
                            fontSize: "14px",
                            lineHeight: "1.4",
                          }}
                        >
                          Logout
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Mobile & Tablet View */}
        <div className="container-fluid mob_menu_wrapper d-block d-lg-none">
          <div className="row align-items-center">
            <div className="col-8">
              <div className="mobile-logo">
                <Link
                  to="/"
                  style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}
                >
                  <div style={{ display: "flex", gap: "6px" }}>
                    <img
                      loading="lazy"
                      src="/img/logo/logo_3.png"
                      alt="light logo"
                      className="mobiles-logo light-logo"
                      style={{ height: "60px", width: "auto" }}
                    />
                    <img
                      loading="lazy"
                      src="/img/logo/logo.jpg"
                      alt="dark logo"
                      className="mobiles-logo dark-logo"
                      style={{ height: "60px", width: "auto" }}
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
