import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-12">
      <div className="dashboard__inner sticky-top">
        <div className="dashboard__nav__title">
          <h6>Welcome, Dond Tond</h6>
        </div>

        <div className="dashboard__nav">
          <ul>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-dashboard-web me-3"></i> Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-user-alt-3 me-3"></i> My Profile
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/enrolledCourses" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-book-alt me-3"></i> Enrolled Courses
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/feeSection" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-rupee me-3"></i> Fees Details
              </NavLink>
            </li>

            <li>
              <NavLink 
                to="/logout" 
                className={({ isActive }) => isActive ? "active" : ""}
              >
                <i className="icofont-logout me-3"></i> Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;