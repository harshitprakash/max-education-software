import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMobileMenu = () => setMenuOpen(true);
  const closeMobileMenu = () => setMenuOpen(false);

  return (
    <header>
      {/* Desktop Header */}
      <div className="headerarea headerarea__2 header__sticky header__area">
        <div className="container desktop__menu__wrapper">
          <div className="row align-items-center">
            {/* Logo - Always visible */}
            <div className="col-xl-2 col-lg-2 col-md-6 col-6">
              <div className="headerarea__left">
                <div className="headerarea__left__logo">
                  <Link to="/">
                    <img loading="lazy" src="/img/logo/logo_1.png" alt="logo" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Desktop Menu - Hidden on Mobile */}
            <div className="col-xl-7 col-lg-7 d-none d-lg-block main_menu_wrap">
              <div className="headerarea__main__menu">
                <nav>
                  <ul>
                    <li>
                      <Link to="/">
                        Home 
                      </Link>
                    </li>
                    <li>
                      <Link to="/courses">
                        Courses 
                      </Link>
                    </li>
                    <li>
                      <Link to="/about">
                        About 
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Sign In - Hidden on Mobile */}
            <div className="col-xl-3 col-lg-3 d-none d-md-block">
              <div className="headerarea__right">
                <div className="headerarea__button">
                  <Link to="/login">Login</Link>
                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle - Only on Mobile */}
            <div className="col-6 d-block d-md-none text-end">
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

        {/* Mobile Header - Clean & Minimal */}
        <div className="container-fluid mob_menu_wrapper d-block d-md-none">
          <div className="row align-items-center">
            <div className="col-6">
              <div className="mobile-logo">
                <Link to="/">
                  <img loading="lazy" src="/img/logo/logo_1.png" alt="logo" />
                </Link>
              </div>
            </div>
            <div className="col-6 text-end">
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

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={closeMobileMenu} />
    </header>
  );
};

export default Header;