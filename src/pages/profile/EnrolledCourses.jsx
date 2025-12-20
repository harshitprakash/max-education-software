import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
const MyCourses = () => {
  const [key, setKey] = useState("enrolled");

  return (
    <>
    <ProfileHeader/>
        <div className="dashboard">
            <div className="container-fluid full__width__padding">
                <div className="row">
                        <Sidebar/>
                    <div className="col-xl-9 col-lg-9 col-md-12">
                        <div className="dashboard__content__wraper">
                            <div className="dashboard__section__title">
                            <h4>My Courses</h4>
                            </div>

                            <ul className="nav about__button__wrap dashboard__button__wrap" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                className={`single__tab__link ${key === "enrolled" ? "active" : ""}`}
                                onClick={() => setKey("enrolled")}
                                type="button"
                                >
                                Enrolled Courses
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                className={`single__tab__link ${key === "active" ? "active" : ""}`}
                                onClick={() => setKey("active")}
                                type="button"
                                >
                                Active Courses
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                className={`single__tab__link ${key === "completed" ? "active" : ""}`}
                                onClick={() => setKey("completed")}
                                type="button"
                                >
                                Completed Courses
                                </button>
                            </li>
                            </ul>

                            <div className="tab-content tab__content__wrapper" id="myTabContent">

                            {/* ==================== ENROLLED COURSES ==================== */}
                            {key === "enrolled" && (
                                <div className="tab-pane fade show active">
                                <div className="row">

                                    {/* Course 1 - Completed */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <a href="../course-details.html"><img loading="lazy" src="../img/grid/grid_1.png" alt="grid" /></a>
                                        <div className="gridarea__small__button"><div className="grid__badge">Data & Tech</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 23 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 1 hr 30 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="../course-details.html">Foundation course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price">$32.00 <del>/ $67.00</del> <span><del className="del__2">Free</del></span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_1.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Micle Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "100%"}} role="progressbar">100% Complete</div>
                                        </div>
                                        <a className="default__button" href="#">Download Certificate</a>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 2 - Completed */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <img loading="lazy" src="../img/grid/grid_2.png" alt="grid" />
                                        <div className="gridarea__small__button"><div className="grid__badge blue__color">Mechanical</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 29 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 2 hr 10 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="#">Nidnies course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price green__color">$32.00<del>/$67.00</del> <span>.Free</span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_2.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Rinis Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "100%"}} role="progressbar">100% Complete</div>
                                        </div>
                                        <a className="default__button" href="#">Download Certificate</a>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 3 - Completed */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <img loading="lazy" src="../img/grid/grid_3.png" alt="grid" />
                                        <div className="gridarea__small__button"><div className="grid__badge blue__color">Mechanical</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 29 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 2 hr 10 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="#">Nidnies course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price green__color">$32.00<del>/$67.00</del> <span>.Free</span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_2.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Rinis Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "100%"}} role="progressbar">100% Complete</div>
                                        </div>
                                        <a className="default__button" href="#">Download Certificate</a>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 4 - 80% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <a href="../course-details.html"><img loading="lazy" src="../img/grid/grid_1.png" alt="grid" /></a>
                                        <div className="gridarea__small__button"><div className="grid__badge">Data & Tech</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 23 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 1 hr 30 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="../course-details.html">Foundation course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price">$32.00 <del>/ $67.00</del> <span><del className="del__2">Free</del></span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_1.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Micle Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "80%"}} role="progressbar">80% Complete</div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 5 - 70% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <img loading="lazy" src="../img/grid/grid_2.png" alt="grid" />
                                        <div className="gridarea__small__button"><div className="grid__badge blue__color">Mechanical</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 29 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 2 hr 10 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="#">Nidnies course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price green__color">$32.00<del>/$67.00</del> <span>.Free</span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_2.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Rinis Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "70%"}} role="progressbar">70% Complete</div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 6 - 0% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <a href="../course-details.html"><img loading="lazy" src="../img/grid/grid_8.png" alt="grid" /></a>
                                        <div className="gridarea__small__button"><div className="grid__badge pink__color">Development</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 25 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 1 hr 40 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="../course-details.html">Minws course to understand about solution</a></h3>
                                        </div>
                                        <div className="gridarea__price">$40.00 <del>/ $67.00</del> <span><del className="del__2">Free</del></span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_3.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Micle Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                </div>
                            )}

                            {/* ==================== ACTIVE COURSES ==================== */}
                            {key === "active" && (
                                <div className="tab-pane fade show active">
                                <div className="row">
                                    {/* Course 4 - 80% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <a href="../course-details.html"><img loading="lazy" src="../img/grid/grid_1.png" alt="grid" /></a>
                                        <div className="gridarea__small__button"><div className="grid__badge">Data & Tech</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 23 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 1 hr 30 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="../course-details.html">Foundation course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price">$32.00 <del>/ $67.00</del> <span><del className="del__2">Free</del></span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_1.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Micle Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "80%"}} role="progressbar">80% Complete</div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 5 - 70% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <img loading="lazy" src="../img/grid/grid_2.png" alt="grid" />
                                        <div className="gridarea__small__button"><div className="grid__badge blue__color">Mechanical</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 29 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 2 hr 10 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="#">Nidnies course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price green__color">$32.00<del>/$67.00</del> <span>.Free</span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_2.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Rinis Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "70%"}} role="progressbar">70% Complete</div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            )}

                            {/* ==================== COMPLETED COURSES ==================== */}
                            {key === "completed" && (
                                <div className="tab-pane fade show active">
                                <div className="row">
                                    {/* Course 1 - 100% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <a href="../course-details.html"><img loading="lazy" src="../img/grid/grid_1.png" alt="grid" /></a>
                                        <div className="gridarea__small__button"><div className="grid__badge">Data & Tech</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 23 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 1 hr 30 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="../course-details.html">Foundation course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price">$32.00 <del>/ $67.00</del> <span><del className="del__2">Free</del></span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_1.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Micle Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "100%"}} role="progressbar">100% Complete</div>
                                        </div>
                                        <a className="default__button" href="#">Download Certificate</a>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 2 - 100% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <img loading="lazy" src="../img/grid/grid_2.png" alt="grid" />
                                        <div className="gridarea__small__button"><div className="grid__badge blue__color">Mechanical</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 29 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 2 hr 10 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="#">Nidnies course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price green__color">$32.00<del>/$67.00</del> <span>.Free</span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_2.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Rinis Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "100%"}} role="progressbar">100% Complete</div>
                                        </div>
                                        <a className="default__button" href="#">Download Certificate</a>
                                        </div>
                                    </div>
                                    </div>

                                    {/* Course 3 - 100% */}
                                    <div className="col-xl-4 col-lg-6 col-md-6 col-12">
                                    <div className="gridarea__wraper">
                                        <div className="gridarea__img">
                                        <img loading="lazy" src="../img/grid/grid_3.png" alt="grid" />
                                        <div className="gridarea__small__button"><div className="grid__badge blue__color">Mechanical</div></div>
                                        <div className="gridarea__small__icon"><a href="#"><i className="icofont-heart-alt"></i></a></div>
                                        </div>
                                        <div className="gridarea__content">
                                        <div className="gridarea__list">
                                            <ul>
                                            <li><i className="icofont-book-alt"></i> 29 Lesson</li>
                                            <li><i className="icofont-clock-time"></i> 2 hr 10 min</li>
                                            </ul>
                                        </div>
                                        <div className="gridarea__heading">
                                            <h3><a href="#">Nidnies course to understand about software</a></h3>
                                        </div>
                                        <div className="gridarea__price green__color">$32.00<del>/$67.00</del> <span>.Free</span></div>
                                        <div className="gridarea__bottom">
                                            <a href="instructor-details.html">
                                            <div className="gridarea__small__img">
                                                <img loading="lazy" src="../img/grid/grid_small_2.jpg" alt="grid" />
                                                <div className="gridarea__small__content"><h6>Rinis Jhon</h6></div>
                                            </div>
                                            </a>
                                            <div className="gridarea__star">
                                            <i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i><i className="icofont-star"></i>
                                            <span>(44)</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="grid__course__status populerarea__button">
                                        <div className="progress">
                                            <div className="progress-bar" style={{width: "100%"}} role="progressbar">100% Complete</div>
                                        </div>
                                        <a className="default__button" href="#">Download Certificate</a>
                                        </div>
                                    </div>
                                    </div>

                                </div>
                                </div>
                            )}

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