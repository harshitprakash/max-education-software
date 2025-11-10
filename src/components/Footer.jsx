// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerarea">
      <div className="container">
      

        {/* Main Footer Content */}
        <div className="footerarea__wrapper footerarea__wrapper__2">
          <div className="row">
            {/* About / Contact */}
            <div className="col-xl-5 col-lg-4 col-md-6 col-sm-12" data-aos="fade-up">
              <div className="footerarea__inner footerarea__about__us">
                <div className="footerarea__heading">
                  <h3>About us</h3>
                </div>
                <div className="footerarea__content">
                  <p>
                    Max Education, near Jain Garments, Samaypur Badli, Delhi — providing professional courses and expert guidance.
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 98101 23456 <br/>
                    <strong>Email:</strong> info@maxeducation.in
                  </p>
                </div>
                <div className="foter__bottom__text">
                  <div className="footer__bottom__icon">
                    <i className="icofont-clock-time"></i>
                  </div>
                  <div className="footer__bottom__content">
                    <h6>Opening Hours</h6>
                    <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
                    <span>Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-xl-3 col-lg-2 col-md-6 col-sm-6" data-aos="fade-up">
              <div className="footerarea__inner">
                <div className="footerarea__heading">
                  <h3>Useful Links</h3>
                </div>
                <div className="footerarea__list">
                  <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up">
              <div className="footerarea__inner footerarea__padding__left">
                <div className="footerarea__heading">
                  <h3>Popular Courses</h3>
                </div>
                <div className="footerarea__list">
                  <ul>
                    <li><Link to="/">Tally Prime</Link></li>
                    <li><Link to="/">Basic Computer</Link></li>
                    <li><Link to="/">Web Development</Link></li>
                    <li><Link to="/">Graphic Design</Link></li>
                    <li><Link to="/">Advance Excel</Link></li>
                    <li><Link to="/">Digital Marketing</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footerarea__copyright__wrapper footerarea__copyright__wrapper__2">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-3 col-sm-12 mb-5">
              <div className="copyright__logo">
              
                <Link to="/">
                  <img
                    loading="lazy"
                    src="/img/logo/logo.jpg"
                    alt="logo"
                    className="site-logo footer-logo"
                  />
                  {/* <span>Max</span><strong style={{color:"#5F2DED"}}>Education</strong>   */}
                </Link>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-md-12">
              <div className="footerarea__copyright__content footerarea__copyright__content__2 text-center">
                <p>
                  Copyright © <span>2024</span> by Max Education. All Rights Reserved.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 text-end">
              <div className="footerarea__icon footerarea__icon__2">
                <ul>
                  <li><a href="#"><i className="icofont-facebook"></i></a></li>
                  <li><a href="#"><i className="icofont-twitter"></i></a></li>
                  <li><a href="#"><i className="icofont-linkedin"></i></a></li>
                  <li><a href="#"><i className="icofont-instagram"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
