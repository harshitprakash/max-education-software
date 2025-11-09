import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import VanillaTilt from "vanilla-tilt";
import Mode from "../components/Mode";
import "../style/about.css";
import FeaturedCourses from "./homePage/FeaturedCourses";
const AboutPage = () => {
  const tiltRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000 });

    // Initialize VanillaTilt
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    }
  }, []);

  return (
    <>
      <Mode />

      {/* Breadcrumb */}
      <div className="breadcrumbarea" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb__content__wraper">
                <div className="breadcrumb__title">
                  <h2 className="heading">About Page</h2>
                </div>
                <div className="breadcrumb__inner">
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li>About Page</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shape__icon__2">
          <img loading="lazy" className="shape__icon__img shape__icon__img__1" src="img/herobanner/herobanner__1.png" alt="banner" />
          <img loading="lazy" className="shape__icon__img shape__icon__img__2" src="img/herobanner/herobanner__2.png" alt="banner" />
          <img loading="lazy" className="shape__icon__img shape__icon__img__3" src="img/herobanner/herobanner__3.png" alt="banner" />
          <img loading="lazy" className="shape__icon__img shape__icon__img__4" src="img/herobanner/herobanner__5.png" alt="banner" />
        </div>
      </div>

      {/* About Section */}
      <div className="aboutarea__5 sp_bottom_100 sp_top_100">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6" data-aos="fade-up">
              <div className="aboutarea__5__img" ref={tiltRef}>
                <img loading="lazy" src="img/about/about_14.png" alt="about" />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6" data-aos="fade-up">
              <div className="aboutarea__content__wraper__5">
                <div className="section__title">
                  <div className="section__title__button">
                    <div className="default__small__button">About Us</div>
                  </div>
                  <div className="section__title__heading">
                    <h2>Welcome to Max Education</h2>
                  </div>
                </div>

                <div className="about__text__5">
                  <p>
                    Located at <strong>Maa Jawala Complex, Near Jain Garments, Samaypur, Samaypur Badli, Delhi – 110042</strong>, Max Education is a reputed institute committed to empowering students and professionals with high-quality computer training and practical skills development.
                  </p>
                </div>

                <div className="aboutarea__5__small__icon__wraper">
                  <div className="aboutarea__5__small__icon">
                    <img loading="lazy" src="img/about/about_15.png" alt="icon" />
                  </div>
                  <div className="aboutarea__small__heading">
                    <span>10+ Years of Experience</span> in Computer Education & Skill Training
                  </div>
                </div>

                <div className="aboutarea__para__5">
                  <p>
                    Our mission is to create a modern, results-driven learning environment where learners develop the confidence and expertise required to excel in today’s fast-paced job market. We combine theoretical understanding with hands-on projects to ensure that every student gains real-world experience and industry-ready capabilities.
                  </p>
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>

   {/* Tabs Section */}
  <div className="abouttabarea sp_bottom_70">
    <div className="container">
      <ul className="nav about__button__wrap" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="single__tab__link active" data-bs-toggle="tab" data-bs-target="#aboutTab" type="button">About</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="single__tab__link" data-bs-toggle="tab" data-bs-target="#whychoose" type="button">Why Choose Us</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="single__tab__link" data-bs-toggle="tab" data-bs-target="#awards" type="button">Certificate</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="single__tab__link" data-bs-toggle="tab" data-bs-target="#education" type="button">Education</button>
        </li>
      </ul>

      <div className="tab-content tab__content__wrapper" id="myTabContent" data-aos="fade-up">
        
        {/* About Tab */}
        <div className="tab-pane fade show active" id="aboutTab" role="tabpanel">
          <div className="aboutarea__content__tap__wraper">
            <p>Max Education has been at the forefront of digital education for over a decade. Our goal is to bridge the gap between classroom learning and real-world skills by offering computer training that is relevant, practical, and industry-focused.</p>
            <h5>Practical Learning Environment</h5>
            <p>We focus on hands-on training to ensure that every learner develops the skills and confidence needed to succeed in their professional journey.</p>
            <h5>Expert Trainers & Updated Curriculum</h5>
            <p>Our instructors bring real-world expertise, ensuring students stay updated with the latest technologies and tools in IT and digital literacy.</p>
            <h5>Student-Centric Approach</h5>
            <p>We provide flexible class timings, personalized attention, and guidance to help every student achieve their learning goals.</p>
          </div>
        </div>

        {/* Why Choose Us Tab */}
        <div className="tab-pane fade" id="whychoose" role="tabpanel">
          <div className="aboutarea__content__tap__wraper">
            <h5>Why Choose Us</h5>
            <p>At Max Education, we are dedicated to providing the best learning environment for our students. Here’s what makes us stand out:</p>
            <ul className="choose-list">
              <li><span className="tick">✔</span> <strong>Experienced Faculty:</strong> Learn from experts with real-world industry experience.</li>
              <li><span className="tick">✔</span> <strong>Practical Approach:</strong> Focus on hands-on projects and application-based training.</li>
              <li><span className="tick">✔</span> <strong>Career Guidance:</strong> We guide students to make the right career choices after completing their courses.</li>
              <li><span className="tick">✔</span> <strong>Flexible Timing:</strong> Weekend and weekday batches designed for both students and professionals.</li>
              <li><span className="tick">✔</span> <strong>Affordable Fees:</strong> Quality education at budget-friendly prices.</li>
              <li><span className="tick">✔</span> <strong>Proven Track Record:</strong> Hundreds of students successfully trained and placed across Delhi.</li>
            </ul>
          </div>
        </div>

        {/* Awards Tab */}
        <div className="tab-pane fade" id="awards" role="tabpanel">
          <div className="aboutarea__content__tap__wraper">
            <h5>Achievements & Recognition</h5>
            <p>Over the years, Max Education has earned recognition from students and the community for delivering consistent, quality education and skill-based training.</p>
          </div>
        </div>

        {/* Education Tab */}
        <div className="tab-pane fade" id="education" role="tabpanel">
          <div className="aboutarea__content__tap__wraper">
            <h5>Our Education Philosophy</h5>
            <p>At Max Education, we believe that true learning combines knowledge, practice, and guidance. Our programs are designed to build confidence, improve technical ability, and prepare students for real-world challenges.</p>
            <h5>Our Teaching Approach</h5>
            <ul className="choose-list">
              <li><span className="tick">✔</span> <strong>Interactive Classes:</strong> Encouraging curiosity and active participation.</li>
              <li><span className="tick">✔</span> <strong>Hands-on Practice:</strong> Each topic includes lab exercises and mini projects.</li>
              <li><span className="tick">✔</span> <strong>Updated Curriculum:</strong> Courses aligned with current industry needs.</li>
              <li><span className="tick">✔</span> <strong>Personal Mentorship:</strong> Trainers guide each student individually to ensure clarity and progress.</li>
            </ul>
            <p>With modern labs, flexible timings, and an encouraging learning environment, Max Education ensures that every learner is not only skilled but also confident to step into the professional world.</p>
          </div>
        </div>

      </div>
    </div>
  </div>

    <FeaturedCourses/>

      {/* Brand Section Start */}
    <div className="brandarea sp_bottom_60">
      <div className="container">
        <div className="row">
          <div className="col-xl-12" data-aos="fade-up">
            <div className="section__title text-center">
              <div className="section__title__heading heading__underline">
                <h2 style={{marginTop:"100px"}}>
                  Relied on by students striving for success  
                  <br />  
                  Trusted by educators, admired by <span>professionals</span>

                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="brandarea__wraper" data-aos="fade-up">
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_1.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_2.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_3.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_4.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_5.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_6.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_7.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_8.png" alt="brand" /></a>
            </div>
            <div className="brandarea__img">
              <a href="#"><img loading="lazy" src="img/brand/brand_9.png" alt="brand" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Brand Section End */}


    </>
  );
};

export default AboutPage;
