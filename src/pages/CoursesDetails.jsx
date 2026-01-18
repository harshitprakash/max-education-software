// pages/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { courseService } from "../services/application/courseService";
import { toast } from "react-toastify";
import { useAuth } from "../services/application/AuthContext";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Format amount to currency
  const formatAmount = (amount) => {
    if (!amount) return "Free";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Fetch course data from public API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const courseData = await courseService.getCourseDetails(id);
        
        if (!courseData) {
          setError("Course not found");
          return;
        }

        setCourse(courseData);
      } catch (err) {
        setError(err.message || "Failed to load course");
        toast.error(err.message || "Failed to load course");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading course details...</p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container py-5 text-center">
        <h2>{error || "Course Not Found"}</h2>
        <Link to="/courses" className="default__button mt-3">
          Back to Courses
        </Link>
      </div>
    );
  }

  const courseName = course.courseName || "Course";
  const courseCode = course.courseCode || "";
  const description = course.description || "";
  const price = course.price || 0;
  const monthlyPrice = course.monthlyPrice || 0;
  const packagePrice = course.packagePrice || 0;
  const duration = course.duration || "";
  const credits = course.credits || 0;
  const teacherName = course.teacherName || "";
  const branchName = course.branchName || "";
  const categoryName = course.categoryName || "";
  const categoryDescription = course.categoryDescription || "";
  const modules = course.modules || [];
  
  // Get first module image as course image, or use default
  const courseImage =
    modules.length > 0 && modules[0].imageUrl
      ? modules[0].imageUrl
      : "/img/courses/basic_course.jpg";

  return (
    <>
      {/* BREADCRUMB & HEADER */}
      <div className="breadcrumbarea breadcrumbarea--2">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="breadcrumb__content__wraper" data-aos="fade-up">
                <div className="breadcrumb__inner text-start">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/courses">Courses</Link>
                    </li>
                    <li>{courseName}</li>
                  </ul>
                </div>
              </div>

              <div className="course__details__top--2">
                <div className="course__button__wraper" data-aos="fade-up">
                  <div className="course__button">
                    <span className="course__2">{courseCode || "Course"}</span>
                  </div>
                </div>
                <div className="course__details__heading mt-3" data-aos="fade-up">
                  <h3>{courseName}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="blogarea__2 sp_top_100 sp_bottom_100">
        <div className="container">
          <div className="row">
            {/* LEFT: MAIN CONTENT */}
            <div className="col-xl-8 col-lg-8">
              <div className="blog__details__content__wraper">
                {/* Course Info Icons */}
                <div className="mb-4" data-aos="fade-up">
                  <div className="d-flex flex-wrap gap-3 text-muted">
                    {duration && (
                      <span>
                        <i className="icofont-clock-time"></i> {duration}
                      </span>
                    )}
                    {credits > 0 && (
                      <span>
                        <i className="icofont-book-alt"></i> {credits} Credit
                        {credits !== 1 ? "s" : ""}
                      </span>
                    )}
                    {modules.length > 0 && (
                      <span>
                        <i className="icofont-listine-dots"></i> {modules.length} Module
                        {modules.length !== 1 ? "s" : ""}
                      </span>
                    )}
                    {teacherName && (
                      <span>
                        <i className="icofont-user"></i> {teacherName}
                      </span>
                    )}
                    {branchName && (
                      <span>
                        <i className="icofont-location-pin"></i> {branchName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category Badge */}
                {categoryName && (
                  <div className="mb-4" data-aos="fade-up">
                    <span className="badge me-2 p-2" style={{backgroundColor:'#5F2DED'}}>
                      <i className="icofont-tags me-1"></i>
                      {categoryName}
                    </span>
                  </div>
                )}

                {/* Course Description */}
                <div className="mb-4" data-aos="fade-up">
                  <h5 className="mb-3">Course Description</h5>
                  <div 
                    className="text-muted" 
                    style={{ lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{
                      __html: description || "No description available."
                    }}
                  />
                </div>

             {/* Course Modules */}
                {modules.length > 0 && (
                  <div className="mb-4" data-aos="fade-up">
                    <h5 className="mb-3">Course Modules</h5>
                    <div className="row g-4">
                      {modules.map((module, index) => (
                        <div key={module.id} className="col-12">
                          
                          <div
                            className="card border-0 shadow-sm"
                            style={{
                              borderRadius: '10px',
                              backgroundColor: '#ffffff',
                              overflow: 'hidden',
                              border: '1px solid #eee'
                            }}
                          >
                            <div className="row g-0 align-items-stretch">

                              {/* IMAGE */}
                              {module.imageUrl && (
                                <div className="col-md-4">
                                  <img
                                    src={module.imageUrl}
                                    alt={module.title}
                                    className="img-fluid"
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      minHeight: '200px',
                                      objectFit: 'cover'
                                    }}
                                    onError={(e) => {
                                      e.target.src = "/img/courses/basic_course.jpg";
                                    }}
                                  />
                                </div>
                              )}

                              {/* CONTENT */}
                              <div className={module.imageUrl ? "col-md-8" : "col-12"}>
                                <div
                                  className="card-body"
                                  style={{
                                    backgroundColor: '#fafafa',
                                    padding: '20px 22px'
                                  }}
                                >
                                  
                                  <div
                                    style={{
                                      display: 'inline-block',
                                      backgroundColor: '#5F2DED',
                                      color: '#fff',
                                      fontSize: '0.85rem',
                                      padding: '6px 12px',
                                      borderRadius: '6px',
                                      marginBottom: '10px'
                                    }}
                                  >
                                    Module {index + 1}
                                  </div>

                                  <h6
                                    style={{
                                      fontWeight: 600,
                                      fontSize: '1.05rem',
                                      marginTop: '6px',
                                      marginBottom: '6px',
                                      color: '#222'
                                    }}
                                  >
                                    {module.title}
                                  </h6>

                                  {module.subtitle && (
                                    <p
                                      style={{
                                        fontStyle: 'italic',
                                        color: '#6c757d',
                                        fontSize: '0.87rem',
                                        marginBottom: '8px'
                                      }}
                                    >
                                      {module.subtitle}
                                    </p>
                                  )}

                                  {module.description && (
                                    <div
                                      style={{
                                        color: '#555',
                                        lineHeight: '1.6',
                                        fontSize: '0.9rem'
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html: module.description
                                      }}
                                    />
                                  )}
                                </div>
                              </div>

                            </div>
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>

            {/* RIGHT: SIDEBAR */}
            <div className="col-xl-4 col-lg-4">
              <div className="course__details__sidebar--2">
                <div className="event__sidebar__wraper" data-aos="fade-up">
                  <div className="blogarae__img__2 course__details__img__2 mb-3">
                    <img
                      loading="lazy"
                      src={courseImage}
                      alt={courseName}
                      className="img-fluid rounded"
                      onError={(e) => {
                        e.target.src = "/img/courses/basic_course.jpg";
                      }}
                    />
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-4">
                    {packagePrice > 0 && (
                      <>
                        <h3 className="fw-bold text-primary mb-0">
                          {formatAmount(packagePrice)}
                        </h3>
                        <p className="text-muted small mt-1 mb-2">
                          Package Price
                        </p>
                      </>
                    )}
                    {!packagePrice && price > 0 && (
                      <>
                        <h3 className="fw-bold text-black mb-0">
                          {formatAmount(price)}
                        </h3>
                        <p className="text-muted small mt-1 mb-2">
                          Course Price
                        </p>
                      </>
                    )}
                    {monthlyPrice > 0 && packagePrice > 0 && (
                      <div className="mt-3 pt-3 border-top">
                        <p className="text-muted small mb-1">Or pay monthly:</p>
                        <p className="fw-bold text-dark mb-0">
                          {formatAmount(monthlyPrice)}
                          <span className="text-muted small"> / month</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Enroll Button */}
                  <div className="course__summery__button mb-4">
                    {isAuthenticated ? (
                      <button
                        className="default__button w-100"
                        type="button"
                        onClick={() => {
                          toast.info("Enrollment feature coming soon");
                        }}
                      >
                        Enroll Now
                      </button>
                    ) : (
                      <button
                        className="default__button w-100"
                        type="button"
                        onClick={() => {
                          navigate("/login");
                          toast.info("Please login to enroll in this course");
                        }}
                      >
                        Login to Enroll
                      </button>
                    )}
                  </div>

                  {/* Course Summary */}
                  <div className="course__summery__lists">
                    <ul>
                      <li className="d-flex justify-content-between mb-2">
                        <span>
                          <i className="icofont-book"></i> Course:
                        </span>
                        <strong className="text-dark">{courseName}</strong>
                      </li>
                      <li className="d-flex justify-content-between mb-2">
                        <span>
                          <i className="icofont-tags"></i> Code:
                        </span>
                        <strong className="text-dark">{courseCode || "N/A"}</strong>
                      </li>
                      {duration && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-clock-time"></i> Duration:
                          </span>
                          <strong className="text-dark">{duration}</strong>
                        </li>
                      )}
                      {credits > 0 && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-book-alt"></i> Credits:
                          </span>
                          <strong className="text-dark">{credits}</strong>
                        </li>
                      )}
                      {modules.length > 0 && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-listine-dots"></i> Modules:
                          </span>
                          <strong className="text-dark">{modules.length}</strong>
                        </li>
                      )}
                      {teacherName && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-user"></i> Teacher:
                          </span>
                          <strong className="text-dark">{teacherName}</strong>
                        </li>
                      )}
                      {branchName && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-location-pin"></i> Branch:
                          </span>
                          <strong className="text-dark">{branchName}</strong>
                        </li>
                      )}
                      {categoryName && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-tags"></i> Category:
                          </span>
                          <strong className="text-dark">{categoryName}</strong>
                        </li>
                      )}
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
