import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

const courses = [
  { img: "img/grid/grid_7.png", duration: "6 Months", price: "800 Rs", oldPrice: "1000 Rs", free: true, title: "Tally Prime" },
  { img: "img/grid/grid_7.png", duration: "6 Months", price: "800 Rs", oldPrice: "1000 Rs", free: true, title: "Basic Computer" },
  { img: "img/grid/grid_8.png", duration: "6 Months", price: "800 Rs", oldPrice: "1000 Rs", title: "Advanced Excel" },
  { img: "img/grid/grid_9.png", duration: "6 Months", price: "800 Rs", oldPrice: "1000 Rs", free: true, title: "Web Development" },
  { img: "img/grid/grid_7.png", duration: "6 Months", price: "800 Rs", oldPrice: "1000 Rs", free: true, title: "Graphic Design" },
  { img: "img/grid/grid_7.png", duration: "6 Months", price: "800 Rs", oldPrice: "1000 Rs", free: true, title: "Digital Marketing" },
];

const FeaturedCourses = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current;
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();

      // Initial state
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);

      // Listen to slide change
      swiper.on("slideChange", () => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
      });
    }
  }, []);

  return (
    <div className="gridarea__2 sp_bottom_100 sp_top_80" data-aos="fade-up">
      <div className="container-fluid full__width__padding">
        <div className="section__title">
          <div className="section__title__heading">
            <h2>Featured Course</h2>
          </div>
        </div>

        <div className="row row__custom__class">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {courses.map((course, index) => (
              <SwiperSlide key={index}>
                <div className="gridarea__wraper">
                  <div className="gridarea__img">
                    <Link to="/course-details">
                      <img loading="lazy" src={course.img} alt="grid" />
                    </Link>
                    <div className="gridarea__small__icon">
                      <a href="#">
                        <i className="icofont-heart-alt"></i>
                      </a>
                    </div>
                  </div>

                  <div className="gridarea__content">
                    <div className="gridarea__list">
                      <ul>
                        <li>
                          <i className="icofont-clock-time"></i> {course.duration}
                        </li>
                      </ul>
                    </div>
                    <div className="gridarea__heading">
                      <h3>
                        <Link to="/course-details">{course.title}</Link>
                      </h3>
                    </div>
                    <div className="gridarea__price">
                      {course.price} <del>/ {course.oldPrice}</del>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="slider__arrows_side">
            <div
              ref={prevRef}
              className={`arrow_btn arrow_btn_prev ${isBeginning ? "disabled" : ""}`}
              aria-label="Previous slide"
              tabIndex={0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
            <div
              ref={nextRef}
              className={`arrow_btn arrow_btn_next ${isEnd ? "disabled" : ""}`}
              aria-label="Next slide"
              tabIndex={0}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;
