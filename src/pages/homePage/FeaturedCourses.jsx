import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Sample courses data
const courses = [
  {
    img: "img/grid/grid_7.png",
    badge: "Data & Tech",
    duration: "6 Months",
    price: "$32.00",
    oldPrice: "$67.00",
    free: true,
    title: "Foundation course to understand software",
  
  },
  {
    img: "img/grid/grid_7.png",
    badge: "Data & Tech",
    duration: "6 Months",
    price: "$32.00",
    oldPrice: "$67.00",
    free: true,
    title: "Foundation course to understand software",
  
  },
  {
    img: "img/grid/grid_8.png",
    badge: "Data & Tech",
    duration: "6 Months",
    price: "800 Rs",
    oldPrice: "1000 Rs",
    title: "Foundation course to understand software"
  
  },
  {
    img: "img/grid/grid_9.png",
    badge: "Data & Tech",
    duration: "6 Months",
    price: "$32.00",
    oldPrice: "$67.00",
    free: true,
    title: "Foundation course to understand software"

  },
  {
    img: "img/grid/grid_7.png",
    badge: "Data & Tech",
    duration: "6 Months",
    price: "$32.00",
    oldPrice: "$67.00",
    free: true,
    title: "Foundation course to understand software"
  },
];

const FeaturedCourses = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    // Ensure Swiper instance exists and refs are ready
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current;

      // Assign refs
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;

      // Re-init and update
      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className="gridarea__2 sp_bottom_100 sp_top_80" data-aos="fade-up">
      <div className="container-fluid full__width__padding">
        {/* Section Title */}
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
                    <div className="gridarea__small__button">
                      <div className="grid__badge">{course.badge}</div>
                    </div>
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

          {/* Custom Arrows - Must be inside Swiper's parent */}
          <div className="slider__controls__wrap slider__controls__arrows">
            <div
              ref={prevRef}
              className="arrow-btn swiper-button-prev"
              style={{ cursor: "pointer" }}
            >
              {/* Optional: Add icon */}
              <i className="icofont-rounded-left"></i>
            </div>
            <div
              ref={nextRef}
              className="arrow-btn swiper-button-next"
              style={{ cursor: "pointer" }}
            >
              <i className="icofont-rounded-right"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCourses;