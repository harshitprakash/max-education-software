import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import { studentService } from "../../services/application/studentService";
import { toast } from "react-toastify";

const MyCourses = () => {
  const [key, setKey] = useState("enrolled");
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Format date to display format
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format amount to currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format batch time
  const formatBatchTime = (batch) => {
    if (!batch || !batch.startTime || !batch.endTime) return "";
    return `${batch.startTime} - ${batch.endTime}`;
  };

  // Fetch courses data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await studentService.getCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load courses");
        toast.error(err.message || "Failed to load courses");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on selected tab
  const getFilteredCourses = () => {
    if (key === "enrolled") {
      return courses; // Show all enrolled courses
    } else if (key === "active") {
      return courses.filter((course) => course.status === "Active");
    } else if (key === "completed") {
      return courses.filter((course) => course.status === "Completed");
    }
    return [];
  };

  const filteredCourses = getFilteredCourses();

  // Render course card
  const renderCourseCard = (course) => {
    const isCompleted = course.status === "Completed";
    const progressWidth = isCompleted ? 100 : course.progress || 0;
    const discount = course.discount || 0;
    const finalPrice = course.price - discount;
    const hasDiscount = discount > 0;
    const courseImage = course.courseModules && course.courseModules.length > 0 
      ? course.courseModules[0].imageUrl 
      : "/img/grid/grid_1.png";

    return (
      <div key={course.enrollmentId} className="col-xl-4 col-lg-6 col-md-6 col-12 mb-4">
        <div className="gridarea__wraper">
          <div className="gridarea__img">
            <button
              type="button"
              className="border-0 bg-transparent p-0 w-100"
              onClick={() => {
                navigate(`/coursedetails/${course.courseId}`);
              }}
            >
              <img
                loading="lazy"
                src={courseImage}
                alt={course.courseName}
                onError={(e) => {
                  e.target.src = "/img/grid/grid_1.png";
                }}
              />
            </button>
            <div className="gridarea__small__button">
              <div className="grid__badge">{course.courseCode || "Course"}</div>
            </div>
          </div>
          <div className="gridarea__content">
            <div className="gridarea__list">
              <ul>
                {course.batches && course.batches.length > 0 && (
                  <li>
                    <i className="icofont-clock-time"></i>{" "}
                    {formatBatchTime(course.batches[0])}
                    {course.batches.length > 1 && ` (+${course.batches.length - 1} more)`}
                  </li>
                )}
                <li>
                  <i className="icofont-calendar"></i> Enrolled:{" "}
                  {formatDate(course.enrollmentDate)}
                </li>
                {course.startDate && (
                  <li>
                    <i className="icofont-calendar"></i> Start:{" "}
                    {formatDate(course.startDate)}
                  </li>
                )}
                {course.completionDate && (
                  <li>
                    <i className="icofont-check-circled"></i> Completed:{" "}
                    {formatDate(course.completionDate)}
                  </li>
                )}
                {course.courseModules && course.courseModules.length > 0 && (
                  <li>
                    <i className="icofont-book-alt"></i> {course.courseModules.length} Module{course.courseModules.length !== 1 ? 's' : ''}
                  </li>
                )}
              </ul>
            </div>
            <div className="gridarea__heading">
              <h3>
                <button
                  type="button"
                  className="border-0 bg-transparent p-0 text-start text-decoration-none"
                  onClick={() => {
                    navigate(`/coursedetails/${course.courseId}`);
                  }}
                  title={course.courseDescription || course.courseName}
                >
                  {course.courseName}
                </button>
              </h3>
              {course.courseDescription && (
                <p className="text-muted small mt-2" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {course.courseDescription.replace(/<[^>]*>/g, '').substring(0, 100)}...
                </p>
              )}
            </div>
            <div className="gridarea__price">
              {hasDiscount ? (
                <>
                  {formatAmount(finalPrice)}{" "}
                  <del>{formatAmount(course.price)}</del>
                  <span className="text-success ms-2">
                    <small>(Save {formatAmount(discount)})</small>
                  </span>
                </>
              ) : (
                formatAmount(course.price)
              )}
              {course.pricingType && (
                <span className="ms-2">
                  <small className="badge bg-secondary">({course.pricingType})</small>
                </span>
              )}
            </div>
            <div className="gridarea__bottom">
              <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
                <div>
                  <span className={`badge ${
                    course.status === "Active" ? "bg-success" :
                    course.status === "Completed" ? "bg-primary" :
                    "bg-secondary"
                  } me-2`}>
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
                  {course.grade && (
                    <span className="badge bg-info ms-2">
                      Grade: {course.grade}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Batches Information */}
            {course.batches && course.batches.length > 0 && (
              <div className="mt-2">
                <small className="text-muted d-block mb-1">
                  <i className="icofont-users-alt"></i> <strong>Batches:</strong>
                </small>
                {course.batches.map((batch, idx) => (
                  <small key={batch.id} className="d-block text-muted ms-3 mb-1">
                    • {batch.name} ({formatBatchTime(batch)})
                    {batch.description && (
                      <span className="text-muted"> - {batch.description}</span>
                    )}
                  </small>
                ))}
              </div>
            )}

            {/* Payment Information */}
            <div className="mt-2 p-2 bg-light rounded">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-muted">
                  <i className="icofont-wallet"></i> <strong>Payment:</strong>
                </small>
                <small className="fw-bold text-primary">
                  {formatAmount(course.totalPaid || 0)} / {formatAmount(course.totalDue || course.price)}
                </small>
              </div>
              {course.remainingBalance > 0 && (
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-warning">
                    <i className="icofont-exclamation-circle"></i> Remaining:
                  </small>
                  <small className="fw-bold text-warning">
                    {formatAmount(course.remainingBalance)}
                  </small>
                </div>
              )}
              {course.feePayments && course.feePayments.length > 0 && (
                <div className="mt-1">
                  <small className="text-muted">
                    <i className="icofont-list"></i> {course.feePayments.length} Payment{course.feePayments.length !== 1 ? 's' : ''} made
                  </small>
                </div>
              )}
            </div>

            {/* Course Modules Preview */}
            {course.courseModules && course.courseModules.length > 0 && (
              <div className="mt-2">
                <small className="text-muted d-block mb-1">
                  <i className="icofont-book"></i> <strong>Modules:</strong>
                </small>
                <div className="d-flex flex-wrap gap-1">
                  {course.courseModules.slice(0, 3).map((module) => (
                    <span key={module.id} className="badge bg-light text-dark">
                      {module.title}
                    </span>
                  ))}
                  {course.courseModules.length > 3 && (
                    <span className="badge bg-secondary">
                      +{course.courseModules.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="grid__course__status populerarea__button">
            <div className="progress mb-2">
              <div
                className={`progress-bar ${
                  progressWidth === 100 ? "bg-success" : "bg-primary"
                }`}
                style={{ width: `${progressWidth}%` }}
                role="progressbar"
              >
                {progressWidth}% Complete
              </div>
            </div>
            {isCompleted ? (
              <button 
                className="default__button" 
                type="button"
                onClick={() => {
                  toast.info("Certificate download feature coming soon");
                }}
              >
                Download Certificate
              </button>
            ) : (
              <button
                className="default__button"
                type="button"
                onClick={() => {
                  navigate(`/coursedetails/${course.courseId}`);
                }}
              >
                Continue Learning
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ProfileHeader />
        <div className="dashboard">
            <div className="container-fluid full__width__padding">
                <div className="row">
            <Sidebar />
                    <div className="col-xl-9 col-lg-9 col-md-12">
                        <div className="dashboard__content__wraper">
                            <div className="dashboard__section__title">
                            <h4>My Courses</h4>
                            </div>

                <ul
                  className="nav about__button__wrap dashboard__button__wrap"
                  id="myTab"
                  role="tablist"
                >
                            <li className="nav-item" role="presentation">
                                <button
                      className={`single__tab__link ${
                        key === "enrolled" ? "active" : ""
                      }`}
                                onClick={() => setKey("enrolled")}
                                type="button"
                                >
                      Enrolled Courses ({courses.length})
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                      className={`single__tab__link ${
                        key === "active" ? "active" : ""
                      }`}
                                onClick={() => setKey("active")}
                                type="button"
                                >
                      Active Courses (
                      {courses.filter((c) => c.status === "Active").length})
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                      className={`single__tab__link ${
                        key === "completed" ? "active" : ""
                      }`}
                                onClick={() => setKey("completed")}
                                type="button"
                                >
                      Completed Courses (
                      {courses.filter((c) => c.status === "Completed").length})
                                </button>
                            </li>
                            </ul>

                            <div className="tab-content tab__content__wrapper" id="myTabContent">
                                <div className="tab-pane fade show active">
                    {isLoading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                                        </div>
                        <p className="mt-3">Loading courses...</p>
                                        </div>
                    ) : error ? (
                      <div className="text-center py-5 text-danger">
                        <i className="icofont-close-circled fs-1"></i>
                        <p className="mt-3">{error}</p>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => window.location.reload()}
                        >
                          Retry
                        </button>
                                        </div>
                    ) : filteredCourses.length === 0 ? (
                      <div className="text-center py-5 text-muted">
                        <i className="icofont-book fs-1"></i>
                        <p className="mt-3">
                          No {key === "enrolled" ? "enrolled" : key === "active" ? "active" : "completed"}{" "}
                          courses found
                        </p>
                                            </div>
                    ) : (
                      <div className="row">{filteredCourses.map(renderCourseCard)}</div>
                    )}
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

export default MyCourses;
