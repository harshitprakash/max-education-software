// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <div className="footerarea">
      <div className="container">
        {/* Newsletter Section */}
        <div className="footerarea__newsletter__wraper">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" data-aos="fade-up">
              <div className="footerarea__text">
                <h3>
                  Still You Need Our <span>Support</span>?
                </h3>
                <p>
                  Don’t wait — reach out to us. It’s quick & easy.
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12" data-aos="fade-up">
              <div className="footerarea__newsletter">
                <div className="footerarea__newsletter__input">
                  <form action="#">
                    <input type="email" placeholder="Enter your email here" />
                    <div className="footerarea__newsletter__button">
                      <button type="submit" className="subscribe__btn">
                        Subscribe Now
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/courses">Courses</a></li>
                    <li><a href="/contact">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="col-xl-4 col-lg-3 col-md-6 col-sm-6" data-aos="fade-up">
              <div className="footerarea__inner footerarea__padding__left">
                <div className="footerarea__heading">
                  <h3>Courses</h3>
                </div>
                <div className="footerarea__list">
                  <ul>
                    <li><a href="/courses/ui-ux">UI/UX Design</a></li>
                    <li><a href="/courses/web-dev">Web Development</a></li>
                    <li><a href="/courses/business">Business Strategy</a></li>
                    <li><a href="/courses/software-dev">Software Development</a></li>
                    <li><a href="/courses/english">Business English</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footerarea__copyright__wrapper footerarea__copyright__wrapper__2">
          <div className="row align-items-center">
            <div className="col-xl-3 col-lg-3">
              <div className="copyright__logo">
                <a href="/">
                  <img loading="lazy" src="img/logo/logo_2.png" alt="logo" />
                </a>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="footerarea__copyright__content footerarea__copyright__content__2 text-center">
                <p>
                  Copyright © <span>2024</span> by Max Education. All Rights Reserved.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 text-end">
              <div className="footerarea__icon footerarea__icon__2">
                <ul>
                  <li><a href="//facebook.com/maxeducation" target="_blank"><i className="icofont-facebook"></i></a></li>
                  <li><a href="//twitter.com/maxeducation" target="_blank"><i className="icofont-twitter"></i></a></li>
                  <li><a href="//linkedin.com/company/maxeducation" target="_blank"><i className="icofont-linkedin"></i></a></li>
                  <li><a href="//instagram.com/maxeducation" target="_blank"><i className="icofont-instagram"></i></a></li>
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
