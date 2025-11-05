import React from "react";

const CourseListItem = ({
  img,
  courseLink = "#",
  category,
  badgeClass = "",
  heartLink = "#",
  discription,
  title,
}) => {

  return (
    <div className="gridarea__wraper gridarea__wraper__2 gridarea__course__list" data-aos="fade-up">
      <div className="gridarea__img">
        <a href={courseLink}><img loading="lazy" src={img} alt="grid" /></a>
        <div className="gridarea__small__button">
          <div className={`grid__badge ${badgeClass}`}>{category}</div>
        </div>
        <div className="gridarea__small__icon">
          <a href={heartLink}><i className="icofont-heart-alt"></i></a>
        </div>
      </div>

      <div className="gridarea__content">
       

        <div className="gridarea__heading">
          <h3>
            <a href={courseLink}>{title}</a>
          </h3>
        </div>

        <div className="gridarea__price">
          <p className="justitfy-center-p">{discription.slice(0, 200)}...</p>
        </div>

        <div className="gridarea__bottom">
          <div className="gridarea__bottom__left">
           

          
          </div>

          <div className="gridarea__details">
            <a href={courseLink}>
              Know Details <i className="icofont-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseListItem;
