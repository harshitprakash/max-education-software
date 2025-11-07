import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    const panel = document.querySelector(".mobile-off-canvas");
    const overlay = document.querySelector(".body-overlay");

    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Add base class
      panel?.classList.add("mobile-off-canvas-active");

      // Trigger slide-in after a tick
      requestAnimationFrame(() => {
        panel?.classList.add("inside");
      });

      overlay?.classList.add("active");
    } else {
      document.body.style.overflow = "";
      panel?.classList.remove("inside");
      // Remove base class after animation
      setTimeout(() => {
        panel?.classList.remove("mobile-off-canvas-active");
      }, 400);
      overlay?.classList.remove("active");
    }

    return () => {
      document.body.style.overflow = "";
      panel?.classList.remove("inside", "mobile-off-canvas-active");
      overlay?.classList.remove("active");
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleLinkClick = () => onClose();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="body-overlay" onClick={handleOverlayClick}></div>

      {/* Mobile Panel */}
      <div className="mobile-off-canvas">
        {/* Close Button */}
        <a className="mobile-aside-close" onClick={onClose}>
          <i className="icofont icofont-close-line"></i>
        </a>

        <div className="header-mobile-aside-wrap">
          {/* Search */}
          <div className="mobile-search">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search entire store…" />
              <button type="submit">
                <i className="icofont icofont-search-2"></i>
              </button>
            </form>
          </div>

          {/* Menu */}
          <div className="mobile-menu-wrap">
            <nav className="mobile-navigation">
              <ul className="mobile-menu">
                <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
                <li><Link to="/about" onClick={handleLinkClick}>About</Link></li>
                <li><Link to="/courses" onClick={handleLinkClick}>Courses</Link></li>
                <li><Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link></li>
                <li><Link to="/shop" onClick={handleLinkClick}>Shop</Link></li>
                <li><Link to="/cart" onClick={handleLinkClick}>Cart</Link></li>
                <li><Link to="/login" onClick={handleLinkClick}>Login</Link></li>
              </ul>
            </nav>
          </div>

          {/* Social */}
          <div className="mobile-social-wrap">
            <a href="#"><i className="icofont icofont-facebook"></i></a>
            <a href="#"><i className="icofont icofont-twitter"></i></a>
            <a href="#"><i className="icofont icofont-instagram"></i></a>
            <a href="#"><i className="icofont icofont-youtube-play"></i></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;