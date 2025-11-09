// src/components/MobileMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  const routePath = useLocation();

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
              {routePath.pathname !== '/login' && (
                <li><Link to="/login" onClick={onClose}>Login</Link></li>
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
    </div>
  );
};


export default MobileMenu;