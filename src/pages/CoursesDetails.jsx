// pages/CourseDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { studentService } from "../services/application/studentService";
import { toast } from "react-toastify";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format batch time
  const formatBatchTime = (batch) => {
    if (!batch || !batch.startTime || !batch.endTime) return "";
    return `${batch.startTime} - ${batch.endTime}`;
  };

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const courses = await studentService.getCourses();
        const foundCourse = courses.find((c) => c.courseId === parseInt(id));

        if (!foundCourse) {
          setError("Course not found");
          return;
        }

        setCourse(foundCourse);
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
  const courseDescription = course.courseDescription || "";
  const courseImage =
    course.courseModules && course.courseModules.length > 0
      ? course.courseModules[0].imageUrl
      : "/img/courses/basic_course.jpg";
  const price = course.price || 0;
  const discount = course.discount || 0;
  const courseModules = course.courseModules || [];
  const batches = course.batches || [];

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
                    {batches.length > 0 && (
                      <span>
                        <i className="icofont-clock-time"></i>{" "}
                        {formatBatchTime(batches[0])}
                        {batches.length > 1 && ` (+${batches.length - 1} more)`}
                      </span>
                    )}
                    {course.enrollmentDate && (
                      <span>
                        <i className="icofont-calendar"></i> Enrolled:{" "}
                        {formatDate(course.enrollmentDate)}
                      </span>
                    )}
                    {course.startDate && (
                      <span>
                        <i className="icofont-calendar"></i> Start:{" "}
                        {formatDate(course.startDate)}
                      </span>
                    )}
                    {courseModules.length > 0 && (
                      <span>
                        <i className="icofont-book-alt"></i> {courseModules.length} Module
                        {courseModules.length !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>

                {/* Status Badges */}
                <div className="mb-4" data-aos="fade-up">
                  <span
                    className={`badge me-2 ${
                      course.status === "Active"
                        ? "bg-success"
                        : course.status === "Completed"
                        ? "bg-primary"
                        : "bg-secondary"
                    }`}
                  >
                    {course.status}
                  </span>
                  {course.paymentStatus && (
                    <span
                      className={`badge ${
                        course.paymentStatus === "Paid"
                          ? "bg-success"
                          : course.paymentStatus === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {course.paymentStatus}
                    </span>
                  )}
                </div>

                {/* Course Description */}
                <div className="mb-4" data-aos="fade-up">
                  <h5 className="mb-3">Course Description</h5>
                  <div
                    className="text-muted"
                    dangerouslySetInnerHTML={{
                      __html:
                        courseDescription || "No description available.",
                    }}
                  />
                </div>

                {/* Batches */}
                {batches.length > 0 && (
                  <div className="mb-4" data-aos="fade-up">
                    <h5 className="mb-3">Batches</h5>
                    <div className="list-group">
                      {batches.map((batch) => (
                        <div key={batch.id} className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>{batch.name}</strong>
                              <div className="text-muted small">
                                {formatBatchTime(batch)}
                                {batch.description && ` - ${batch.description}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Summary */}
                {(course.totalPaid > 0 || course.remainingBalance > 0) && (
                  <div className="mb-4 p-3 bg-light rounded" data-aos="fade-up">
                    <h5 className="mb-3">Payment Summary</h5>
                    <div className="row">
                      <div className="col-md-6 mb-2">
                        <strong>Payment:</strong> {formatAmount(course.totalPaid || 0)} /{" "}
                        {formatAmount(price)}
                      </div>
                      {course.remainingBalance > 0 && (
                        <div className="col-md-6 mb-2">
                          <strong className="text-warning">Remaining:</strong>{" "}
                          {formatAmount(course.remainingBalance)}
                        </div>
                      )}
                      {course.feePayments && course.feePayments.length > 0 && (
                        <div className="col-12 mt-2">
                          <small className="text-muted">
                            {course.feePayments.length} Payment
                            {course.feePayments.length !== 1 ? "s" : ""} made
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Modules */}
                {courseModules.length > 0 && (
                  <div className="mb-4" data-aos="fade-up">
                    <h5 className="mb-3">Course Modules</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {courseModules.map((module) => (
                        <span key={module.id} className="badge bg-secondary p-2">
                          {module.title}
                        </span>
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

                  <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary mb-0">
                      {formatAmount(price)}
                    </h3>
                    {discount > 0 && (
                      <p className="text-muted small mt-1">
                        <del>{formatAmount(price)}</del>{" "}
                        <span className="text-success">
                          Save {formatAmount(discount)}
                        </span>
                      </p>
                    )}
                  </div>

                  <div className="course__summery__button mb-4">
                    {course.status === "Active" || course.status === "Completed" ? (
                      <button
                        className="default__button w-100"
                        type="button"
                        onClick={() => {
                          navigate("/enrolledCourses");
                        }}
                      >
                        {course.status === "Completed"
                          ? "View Certificate"
                          : "Continue Learning"}
                      </button>
                    ) : (
                      <button
                        className="default__button w-100"
                        type="button"
                        onClick={() => {
                          toast.info("Enrollment feature coming soon");
                        }}
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>

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
                      {courseModules.length > 0 && (
                        <li className="d-flex justify-content-between mb-2">
                          <span>
                            <i className="icofont-book-alt"></i> Modules:
                          </span>
                          <strong className="text-dark">{courseModules.length}</strong>
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
