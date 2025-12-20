// pages/CourseDetails.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import courses from "../data/courses.json";
import coursesData from "../data/coursesdetails.json";

const CourseDetails = () => {
  const { id } = useParams();

  // Find course in both files
  const courseBasic = courses.courses.find((c) => c.id === parseInt(id));
  const courseDetail = coursesData.courses.find((c) => c.id === parseInt(id));

  // Merge data: details override basic, fallback to basic
  const course = { ...courseBasic, ...courseDetail };

  const [activeTab, setActiveTab] = useState("projects__one");

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h2>Course Not Found</h2>
        <Link to="/courses" className="default__button">
          Back to Courses
        </Link>
      </div>
    );
  }

  const {
    title,
    category,
    img,
    description,
    instructorName,
    price,
    badgeClass,
    syllabus = [],
    totalduration = 0,
  } = course;

  // Render lessons
  const renderLesson = (lesson, index) => {
    if (typeof lesson === "string") {
      return (
        <div className="scc__wrap" key={index}>
          <div className="scc__info">
            <h5>
              <span>Topic :</span> {lesson}
            </h5>
          </div>
         
        </div>
      );
    }

    if (lesson.type === "video") {
      return (
        <div className="scc__wrap" key={index}>
          <div className="scc__info">
            <i className="icofont-video-alt"></i>
            <h5>
              <span>Video :</span> {lesson.title}
            </h5>
          </div>
          <div className="scc__meta">
            {lesson.duration ? (
              <>
                <span className="time">
                  <i className="icofont-clock-time"></i> {lesson.duration}
                </span>
                {lesson.preview ? (
                  <a href={`/lesson/${id}/${index}`}>
                    <span className="question">
                      <i className="icofont-eye"></i> Preview
                    </span>
                  </a>
                ) : (
                  <a href="#">
                    <span>
                      <i className="icofont-lock"></i>
                    </span>
                  </a>
                )}
              </>
            ) : (
              <a href="#">
                <span>
                  <i className="icofont-lock"></i>
                </span>
              </a>
            )}
          </div>
        </div>
      );
    }

    if (lesson.type === "exam") {
      return (
        <div className="scc__wrap" key={index}>
          <div className="scc__info">
            <i className="icofont-file-text"></i>
            <h5>
              <span>Exam :</span>
            </h5>
          </div>
          <div className="scc__meta">
            <span>
              <i className="icofont-lock"></i> {lesson.questions} Ques
            </span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      {/* BREADCRUMB & HEADER */}
      <div className="breadcrumbarea breadcrumbarea--2">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="breadcrumb__content__wraper" data-aos="fade-up">
                <div className="breadcrumb__inner text-start">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/courses">Courses</Link>
                    </li>
                    <li>{title}</li>
                  </ul>
                </div>
              </div>

              <div className="course__details__top--2">
                <div className="course__button__wraper" data-aos="fade-up">
                  <div className="course__button">
                    <a className={`course__2 ${badgeClass || ""}`} href="#">
                      {category}
                    </a>
                  </div>
                </div>
                <div className="course__details__heading mt-3" data-aos="fade-up">
                  <h3>{title}</h3>
                </div>
                <div className="course__details__price mt-3" data-aos="fade-up">
                  <ul>
                    <li>
                      <div className="course__details__date">
                        <i className="icofont-user-alt-3"></i> {instructorName}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="shape__icon__2">
          {[1, 2, 3, 5].map((n) => (
            <img
              key={n}
              loading="lazy"
              className={`shape__icon__img shape__icon__img__${n}`}
              src={`/img/herobanner/herobanner__${n}.png`}
              alt="decor"
            />
          ))}
        </div>
      </div>

      {/* MAIN */}
      <div className="blogarea__2 sp_top_100 sp_bottom_100">
        <div className="container">
          <div className="row">
            {/* LEFT: TABS */}
            <div className="col-xl-8 col-lg-8">
              <div className="blog__details__content__wraper">
                <div className="course__details__tab__wrapper" data-aos="fade-up">
                  <ul className="nav course__tap__wrap" id="myTab" role="tablist">
                    <li className="nav-item">
                      <button
                        className={`single__tab__link ${
                          activeTab === "projects__one" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("projects__one")}
                      >
                        <i className="icofont-paper"></i> Description
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`single__tab__link ${
                          activeTab === "projects__two" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("projects__two")}
                      >
                        <i className="icofont-book-alt"></i> Curriculum
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content tab__content__wrapper" id="myTabContent">
                    {/* DESCRIPTION */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "projects__one" ? "active show" : ""
                      }`}
                      id="projects__one"
                    >
                      <div className="experence__heading">
                        <h5>Course Description</h5>
                      </div>
                      <div className="experence__description">
                        <p className="description__1">{description}</p>
                      </div>
                    </div>

                    {/* CURRICULUM */}
                    <div
                      className={`tab-pane fade ${
                        activeTab === "projects__two" ? "active show" : ""
                      }`}
                      id="projects__two"
                    >
                      {Array.isArray(syllabus) && syllabus.length > 0 ? (
                        <div className="accordion content__cirriculum__wrap" id="accordionExample">
                          {syllabus.map((section, i) => (
                            <div className="accordion-item" key={i}>
                              <h2 className="accordion-header" id={`heading${i}`}>
                                <button
                                  className={`accordion-button ${i === 0 ? "" : "collapsed"}`}
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#collapse${i}`}
                                  aria-expanded={i === 0}
                                >
                                  {section.section} <span>{section.duration || ""}</span>
                                </button>
                              </h2>
                              <div
                                id={`collapse${i}`}
                                className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`}
                                data-bs-parent="#accordionExample"
                              >
                                <div className="accordion-body">
                                  {Array.isArray(section.topics) &&
                                    section.topics.map((lesson, j) =>
                                      renderLesson(lesson, `${i}-${j}`)
                                    )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p>No curriculum available.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="col-xl-4 col-lg-4">
              <div className="course__details__sidebar--2">
                <div className="event__sidebar__wraper" data-aos="fade-up">
                  <div className="blogarae__img__2 course__details__img__2">
                    <img loading="lazy" src={img} alt={title} className="img-fluid rounded" />
                  </div>
                  <div className="text-center my-4">
                    <h3 className="fw-bold">{price}</h3>
                  </div>
                  <div className="course__summery__button">
                    <a className="default__button w-100" href="#">
                      Enroll Now
                    </a>
                  </div>
                  <div className="course__summery__lists mt-4">
                    <ul>
                      <li className="d-flex justify-content-between">
                        <span><i className="icofont-book"></i> Course:</span>
                        <strong className="text-dark">{title}</strong>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span><i className="icofont-tags"></i> Category:</span>
                        <strong className="text-dark">{category}</strong>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span><i className="icofont-user-alt-3"></i> Instructor:</span>
                        <strong className="text-dark">{instructorName}</strong>
                      </li>
                      <li className="d-flex justify-content-between">
                        <span><i className="icofont-clock-time"></i> Duration:</span>
                        <strong className="text-dark">{totalduration} months</strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
