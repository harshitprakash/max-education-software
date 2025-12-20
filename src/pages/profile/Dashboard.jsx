import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import ProfileHeader from './ProfileHeader';

const Dashboard = () => {
  return (
    <>
      <ProfileHeader />
      <div className="dashboard">
        <div className="container-fluid full__width__padding">
          <div className="row">
            <Sidebar />

            <div className="col-xl-9 col-lg-9 col-md-12">
              {/* Summary Section */}
              <div className="dashboard__content__wraper">
                <div className="dashboard__section__title">
                  <h4>Summery</h4>
                </div>
                <div className="row">
                  {/* Enrolled Courses */}
                  <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                    <div className="dashboard__single__counter">
                      <div className="counterarea__text__wraper">
                        <div className="counter__img">
                          <img
                            loading="lazy"
                            src="/img/counter/counter__1.png"
                            alt="counter"
                          />
                        </div>
                        <div className="counter__content__wraper">
                          <div className="counter__number">
                            <span className="counter">27</span>+
                          </div>
                          <p>Enrolled Courses</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Courses */}
                  <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                    <div className="dashboard__single__counter">
                      <div className="counterarea__text__wraper">
                        <div className="counter__img">
                          <img
                            loading="lazy"
                            src="/img/counter/counter__2.png"
                            alt="counter"
                          />
                        </div>
                        <div className="counter__content__wraper">
                          <div className="counter__number">
                            <span className="counter">08</span>+
                          </div>
                          <p>Active Courses</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Complete Courses */}
                  <div className="col-xl-4 col-lg-6 col-md-12 col-12">
                    <div className="dashboard__single__counter">
                      <div className="counterarea__text__wraper">
                        <div className="counter__img">
                          <img
                            loading="lazy"
                            src="/img/counter/counter__3.png"
                            alt="counter"
                          />
                        </div>
                        <div className="counter__content__wraper">
                          <div className="counter__number">
                            <span className="counter">12</span>
                          </div>
                          <p>Complete Courses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Section */}
              <div className="dashboard__content__wraper">
                <div className="dashboard__section__title">
                  <h4>Feedbacks</h4>
                  <Link to="/course">See More...</Link>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="dashboard__table table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Course Name</th>
                            <th>Enrolled</th>
                            <th>Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: "Javascript", enrolled: 1100 },
                            { name: "PHP", enrolled: 700 },
                            { name: "HTML", enrolled: 1350 },
                            { name: "Graphic", enrolled: 1266 },
                          ].map((course, index) => (
                            <tr
                              key={index}
                              className={
                                index % 2 === 1 ? "dashboard__table__row" : ""
                              }
                            >
                              <th>
                                <Link to="#">{course.name}</Link>
                              </th>
                              <td>{course.enrolled}</td>
                              <td>
                                <div className="dashboard__table__star">
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <i className="icofont-star"></i>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-star"
                                  >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                  </svg>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div> {/* End of col-xl-9 */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
