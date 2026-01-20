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
      <div key={course.enrollmentId} className="col-xl-6 col-lg-6 col-md-6 col-12 mb-4">
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
                  <b>{course.courseName}</b> 
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
                  {/* {course.paymentStatus && (
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
                  )} */}
                  {course.grade && (
                    <span className="badge bg-info ms-2">
                      Grade: {course.grade}
                    </span>
                  )}
                </div>
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
             
              </ul>
            </div>
              </div>
            </div>
          </div>
          <div className="grid__course__status populerarea__button">
            {/* <div className="progress mb-2">
                <div
                  className={`progress-bar ${
                    progressWidth === 100 ? "bg-success" : "bg-primary"
                  }`}
                  style={{ width: `${progressWidth}%` }}
                  role="progressbar"
                >
                {progressWidth}% Complete
              </div>
            </div> */}
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
            <div className="dashboard__section__title mb-4">
              <h4 className="fw-bold">My Courses</h4>
            </div>

            {/* Responsive Tabs – using #5F2DED theme */}
            <ul className="nav nav-pills mb-4 flex-nowrap overflow-auto gap-3 pb-2" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link px-4 py-2 rounded-pill fw-medium ${
                    key === "enrolled"
                      ? "text-white border-0"
                      : "bg-white text-muted border border-secondary-subtle"
                  }`}
                  style={key === "enrolled" ? { backgroundColor: "#5F2DED" } : {}}
                  onClick={() => setKey("enrolled")}
                  type="button"
                >
                  Enrolled Courses
                  <span
                    className="badge ms-2 px-2 rounded-pill"
                    style={{
                      backgroundColor: "#ffffff",
                      color: key === "enrolled" ? "#5F2DED" : "#6c757d",
                    }}
                  >
                    {courses.length}
                  </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link px-4 py-2 rounded-pill fw-medium ${
                    key === "active"
                      ? "text-white border-0"
                      : "bg-white text-muted border border-secondary-subtle"
                  }`}
                  style={key === "active" ? { backgroundColor: "#5F2DED" } : {}}
                  onClick={() => setKey("active")}
                  type="button"
                >
                  Active Courses
                  <span
                    className="badge ms-2 px-2 rounded-pill"
                    style={{
                      backgroundColor: "#ffffff",
                      color: key === "active" ? "#5F2DED" : "#6c757d",
                    }}
                  >
                    {courses.filter((c) => c.status === "Active").length}
                  </span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link px-4 py-2 rounded-pill fw-medium ${
                    key === "completed"
                      ? "text-white border-0"
                      : "bg-white text-muted border border-secondary-subtle"
                  }`}
                  style={key === "completed" ? { backgroundColor: "#5F2DED" } : {}}
                  onClick={() => setKey("completed")}
                  type="button"
                >
                  Completed Courses
                  <span
                    className="badge ms-2 px-2 rounded-pill"
                    style={{
                      backgroundColor: "#ffffff",
                      color: key === "completed" ? "#5F2DED" : "#6c757d",
                    }}
                  >
                    {courses.filter((c) => c.status === "Completed").length}
                  </span>
                </button>
              </li>
            </ul>

            <div className="tab-content tab__content__wrapper" id="myTabContent">
              <div className="tab-pane fade show active">
                {isLoading ? (
                  <div className="text-center py-5 my-5">
                    <div
                      className="spinner-border"
                      style={{ width: "3rem", height: "3rem", color: "#5F2DED" }}
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-4 text-muted fs-5">Loading your courses...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-5 my-5">
                    <i className="icofont-close-circled text-danger" style={{ fontSize: "4.5rem" }}></i>
                    <p className="mt-3 fs-5 text-danger">{error}</p>
                    <button
                      className="btn btn-lg px-5 mt-3 text-white shadow-sm"
                      style={{ backgroundColor: "#5F2DED", borderColor: "#5F2DED" }}
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </button>
                  </div>
                ) : filteredCourses.length === 0 ? (
                  <div className="text-center py-5 my-5 bg-white rounded-3 border border-secondary-subtle">
                    <i
                      className="icofont-book-alt text-muted"
                      style={{ fontSize: "5.5rem", opacity: 0.4 }}
                    ></i>
                    <h5 className="mt-4 text-muted">
                      No{" "}
                      {key === "enrolled"
                        ? "enrolled"
                        : key === "active"
                        ? "active"
                        : "completed"}{" "}
                      courses found
                    </h5>
                    <p className="text-muted mb-0">
                      {key === "completed"
                        ? "Finish some courses to see them here!"
                        : "Start exploring and enroll in new courses"}
                    </p>
                  </div>
                ) : (
                  <div className="row g-4">
                    {filteredCourses.map(renderCourseCard)}
                  </div>
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
