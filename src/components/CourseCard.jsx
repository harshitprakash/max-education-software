import React from "react";

const CourseCard = ({
  img,
  courseLink = "#",
  category,
  badgeClass = "",
  heartLink = "#",
    discription,
  title,
  instructorLink = "#",
}) => {

  return (
    <div className="col-xl-4 col-lg-6 col-md-12 col-sm-6 col-12" data-aos="fade-up">
      <div className="gridarea__wraper gridarea__wraper__2">
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
            <h3><a href={courseLink} className="truncate-text">{title}</a></h3>
          </div>
        
          <div className="gridarea__list">
          <p className="justitfy-center-p">{discription.slice(0, 120)}...</p>
          </div>
          {/* <div className="gridarea__price">
            {price} <del>{priceDel}</del>
            <span> <del className="del__2">{freeLabel}</del></span>

          </div> */}
          <div className="gridarea__bottom">

            <a href={instructorLink}>
              <div className="gridarea__small__img">
                {/* <img loading="lazy" src={instructorImg} alt="instructor" /> */}
                <div className="gridarea__small__content">
                  <h6>View Details</h6>
                </div>
              </div>
            </a>

            <div className="gridarea__star">
            
              <span><i className="icofont-arrow-right"></i> </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
