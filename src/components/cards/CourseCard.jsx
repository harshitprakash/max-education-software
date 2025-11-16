// components/cards/CourseCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import data from "../../data/courses.json"; // Your JSON

const CourseCard = ({
  img,
  category,
  badgeClass = "",
  heartLink = "#",
  discription,
  title,
  instructorLink = "#",
}) => {
  // Find course by title
  const course = data.courses.find((c) => c.title === title);
  const courseId = course?.id;
  const courseLink = courseId ? `/coursedetails/${courseId}` : "#";

  return (
    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12" data-aos="fade-up">
      <div className="gridarea__wraper gridarea__wraper__2">
        <div className="gridarea__img">
          <Link to={courseLink}>
            <img loading="lazy" src={img} alt={title} />
          </Link>
          <div className="gridarea__small__button">
            <div className={`grid__badge ${badgeClass}`}>{category}</div>
          </div>
          <div className="gridarea__small__icon">
            <a href={heartLink} onClick={(e) => e.stopPropagation()}>
              <i className="icofont-heart-alt"></i>
            </a>
          </div>
        </div>

        <div className="gridarea__content">
          <div className="gridarea__heading">
            <h3>
              <Link to={courseLink} className="truncate-text">
                {title}
              </Link>
            </h3>
          </div>

          <div className="gridarea__list">
            <p className="justitfy-center-p">
              {discription?.slice(0, 120)}...
            </p>
          </div>

          <div className="gridarea__bottom">
            <Link to={courseLink}>
              <div className="gridarea__small__img">
                <div className="gridarea__small__content">
                  <h6>View Details</h6>
                </div>
              </div>
            </Link>

            <div className="gridarea__star">
              <Link to={courseLink}>
                <i className="icofont-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;