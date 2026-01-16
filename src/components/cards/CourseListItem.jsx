import React from "react";
import { Link } from "react-router-dom";

const CourseListItem = ({
  img,
  courseLink = "#",
  category,
  badgeClass = "",
  heartLink = "#",
  description,
  title,
}) => {
  const safeDescription = description || "";
  const displayDescription = safeDescription.length > 200 
    ? safeDescription.slice(0, 200) + "..." 
    : safeDescription;

  return (
    <div className="gridarea__wraper gridarea__wraper__2 gridarea__course__list" data-aos="fade-up">
      <div className="gridarea__img">
        <Link to={courseLink}><img loading="lazy" src={img} alt={title || "course"} /></Link>
        <div className="gridarea__small__button">
          <div className={`grid__badge ${badgeClass}`}>{category}</div>
        </div>
        <div className="gridarea__small__icon">
          <a href={heartLink} onClick={(e) => e.preventDefault()}><i className="icofont-heart-alt"></i></a>
        </div>
      </div>

      <div className="gridarea__content">
        <div className="gridarea__heading">
          <h3>
            <Link to={courseLink}>{title}</Link>
          </h3>
        </div>

        <div className="gridarea__price">
          <p className="justitfy-center-p">{displayDescription}</p>
        </div>

        <div className="gridarea__bottom">
          <div className="gridarea__bottom__left">
          </div>

          <div className="gridarea__details">
            <Link to={courseLink}>
              Know Details <i className="icofont-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;
