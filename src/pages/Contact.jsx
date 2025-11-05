import React from "react";
import { FaUser, FaEnvelope, FaEdit, FaPhone, FaPen } from "react-icons/fa";

const ContactPage = () => {
  return (
    <>
      {/* Contact Info Section */}
      <div className="contact__section sp_top_100 sp_bottom_50" data-aos="fade-up">
        <div className="container">
          <div className="row">
            {/* Mail */}
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="single__contact">
                <div className="contact__icon">
                  <FaEnvelope size={40} color="#5F2DED" />
                </div>
                <div className="contact__text">
                  <h5>Email Address</h5>
                  <div className="contact__email">
                    <p>maxeducation@gmail.com</p>
                    <span>+91 98100 12345</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Office */}
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="single__contact">
                <div className="contact__icon">
                  <FaUser size={40} color="#5F2DED" />
                </div>
                <div className="contact__text">
                  <h5>Office Address</h5>
                  <div className="contact__email">
                    <p>Max Education</p>
                    <span>Near Jain Garments, Samaypur Badli, Delhi, 110042</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="single__contact">
                <div className="contact__icon">
                  <FaPhone size={40} color="#5F2DED" />
                </div>
                <div className="contact__text">
                  <h5>Phone Number</h5>
                  <div className="contact__email">
                    <p>+91 98100 12345</p>
                    <span>+91 98100 12345</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="contact__form__wraper sp_bottom_100">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="contact__form__inner">
                <div className="contact__form__heading" data-aos="fade-up">
                  <h3>Drop Us a Line</h3>
                  <p>Your email address will not be published. Required fields are marked *</p>
                </div>

                <form id="contact-form" className="contact-form" action="mail.php" method="post">
                  <div className="row">
                    <div className="col-xl-6" data-aos="fade-up">
                      <div className="contact__input__wraper">
                        <input type="text" name="con_name" id="con_name" placeholder="Enter Your Name*" />
                        <div className="contact__icon">
                          <FaUser />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6" data-aos="fade-up">
                      <div className="contact__input__wraper">
                        <input type="text" name="con_email" id="con_email" placeholder="Enter Email Address*" />
                        <div className="contact__icon">
                          <FaEnvelope />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6" data-aos="fade-up">
                      <div className="contact__input__wraper">
                        <input type="text" name="subject" placeholder="Write Service Type" />
                        <div className="contact__icon">
                          <FaEdit />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6" data-aos="fade-up">
                      <div className="contact__input__wraper">
                        <input type="text" name="phone" placeholder="Enter Your Phone" />
                        <div className="contact__icon">
                          <FaPhone />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12" data-aos="fade-up">
                      <div className="contact__input__wraper">
                        <textarea name="con_message" id="con_message" cols="30" rows="10" placeholder="Enter Your Message here"></textarea>
                        <div className="contact__icon">
                          <FaPen />
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-12" data-aos="fade-up">
                      <div className="contact__button">
                        <button type="submit" value="submit" className="default__button" name="submit">
                          Post a Comment
                        </button>
                        <p className="form-message"></p>
                      </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
