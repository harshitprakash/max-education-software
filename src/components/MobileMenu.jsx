// src/components/MobileMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


const MobileMenu = () => {
  const closeMenu = () => {
    document.body.classList.remove("mobile-off-canvas-active");
  };
const routePath = useLocation();
  return (
    <div className="mobile-off-canvas-active">
      <a className="mobile-aside-close" href="#">
        <i className="icofont icofont-close-line"></i>
      </a>

      <div className="header-mobile-aside-wrap">
       

        {/* Simple Flat Menu - NO DROPDOWNS */}
        <div className="mobile-menu-wrap">
          <nav>
            <ul className="mobile-menu">
              <li><Link to="/" >Home</Link></li>
              <li><Link to="/courses" >Courses</Link></li>
              <li><Link to="/about" >About</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              {routePath.pathname != '/login' &&(
               <li><Link to="/login">Login</Link></li>
              )}
            </ul>
          </nav>
        </div>

        {/* Social Icons */}
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