import React, { useState, useMemo, useEffect } from "react";
import BreadcrumbArea from "../components/BreadcrumbArea";
import CourseCard from "../components/cards/CourseCard";
import CourseListItem from "../components/cards/CourseListItem";
import courses from "../data/courses.json";

const Courses = () => {
  const [sortBy, setSortBy] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter courses based on search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      return courses.courses;
    }

    const query = searchQuery.toLowerCase().trim();
    return courses.courses.filter((course) => {
      const titleMatch = course.title?.toLowerCase().includes(query);
      const badgeMatch = course.badge?.toLowerCase().includes(query);
      const instructorMatch = course.instructorName?.toLowerCase().includes(query);
      
      return titleMatch || badgeMatch || instructorMatch;
    });
  }, [searchQuery]);

  // Extract unique categories from course badges and count them
  const categories = useMemo(() => {
    const categoryMap = {};
    courses.courses.forEach((course) => {
      const badge = course.category;
      if (badge) {
        categoryMap[badge] = (categoryMap[badge] || 0) + 1;
      }
    });
    // Convert to array and sort alphabetically
    return Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Sort courses based on selected option (after filtering)
  const sortedCourses = useMemo(() => {
    const coursesArray = [...filteredCourses];
    
    switch (sortBy) {
      case "new":
        // Sort by ID descending (newest first)
        return coursesArray.sort((a, b) => b.id - a.id);
      
      case "title-asc":
        // Sort by title A-Z
        return coursesArray.sort((a, b) => a.title.localeCompare(b.title));
      
      case "title-desc":
        // Sort by title Z-A
        return coursesArray.sort((a, b) => b.title.localeCompare(a.title));
      
      default:
        return coursesArray;
    }
  }, [sortBy, filteredCourses]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = sortedCourses.slice(startIndex, endIndex);

  // Reset to page 1 when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled by onChange, but we prevent form submission
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of course list
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <>
        {/* breadcrumb area (replaced with reusable component) */}
        <BreadcrumbArea
          title="Courses"
          items={[{ label: "Home", href: "index.html" }, { label: "Courses" }]}
          shapeImages={[
            "img/herobanner/herobanner__1.png",
            "img/herobanner/herobanner__2.png",
            "img/herobanner/herobanner__3.png",
            "img/herobanner/herobanner__5.png",
          ]}
/>

        {/* <!-- course__section__start   --> */}
        <div className="coursearea sp_top_50 sp_bottom_50">
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div className="course__text__wraper" data-aos="fade-up">
                            <div className="course__text">
                                <p>
                                  Showing {sortedCourses.length > 0 ? startIndex + 1 : 0}–
                                  {Math.min(endIndex, sortedCourses.length)} of {sortedCourses.length} Results
                                </p>
                            </div>
                            <div className="course__icon">
                                <ul className="nav property__team__tap" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a href="#" className="single__tab__link active" data-bs-toggle="tab" data-bs-target="#projects__one"><i className="icofont-layout"></i>
                                            </a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a href="#" className="single__tab__link" data-bs-toggle="tab" data-bs-target="#projects__two"><i className="icofont-listine-dots"></i>
                                        </a>
                                    </li>

                                    <li className="short__by__new">
                                        <select 
                                          className="form-select" 
                                          aria-label="Sort select" 
                                          value={sortBy}
                                          onChange={handleSortChange}
                                        >
                                            <option value="new">Sort by New</option>
                                            <option value="title-asc">Title: A-Z</option>
                                            <option value="title-desc">Title: Z-A</option>
                                        </select>
                                    </li>



                                </ul>
                            </div>
                        </div>

                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-12">
                        <div className="course__sidebar__wraper" data-aos="fade-up">
                            <div className="course__heading">
                                <h5>Search here</h5>
                            </div>
                            <div className="course__input">
                                <form onSubmit={handleSearchSubmit}>
                                    <input 
                                        type="text" 
                                        placeholder="Search courses..." 
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="search__button">
                                        <button type="submit"><i className="icofont-search-1"></i></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="course__sidebar__wraper" data-aos="fade-up">
                            <div className="categori__wraper">
                                <div className="course__heading">
                                    <h5>Categories</h5>
                                </div>
                                <div className="course__categories__list">
                                    <ul>
                                        {categories.map((category, index) => (
                                            <li key={index}>
                                                <a href="#">
                                                    {category.name}
                                                    <span>{String(category.count).padStart(2, '0')}</span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                       


                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-8 col-12">

                        <div className="tab-content tab__content__wrapper with__sidebar__content" id="myTabContent">


                            <div className="tab-pane fade  active show" id="projects__one" role="tabpanel" aria-labelledby="projects__one">

                                <div className="row">
                                  {paginatedCourses.map((c) => (
                                    <CourseCard
                                      key={c.id}
                                      img={c.img}
                                      courseLink={c.courseLink}
                                      category={c.category}
                                      badgeClass={c.badgeClass}
                                      discription={c.discription}
                                      title={c.title}
                                      instructorLink={c.instructorLink}
                                      heartLink={c.heartLink}
                                    />
                                  ))}
                                </div>

                            </div>


                            <div className="tab-pane fade" id="projects__two" role="tabpanel" aria-labelledby="projects__two">

                                {paginatedCourses.map((c) => (
                                  <CourseListItem
                                    key={c.id}
                                    img={c.img}
                                    courseLink={c.courseLink}
                                    category={c.category}
                                    badgeClass={c.badgeClass}
                                    heartLink={c.heartLink}
                                    discription={c.discription}
                                    title={c.title}
                                  />
                                ))}

                            </div>

                        </div>

                        {totalPages > 1 && (
                          <div className="main__pagination__wrapper" data-aos="fade-up">
                            <ul className="main__page__pagination">
                              <li>
                                <a 
                                  className={currentPage === 1 ? "disable" : ""}
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handlePrevPage();
                                  }}
                                >
                                  <i className="icofont-double-left"></i>
                                </a>
                              </li>
                              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <li key={page}>
                                  <a
                                    className={currentPage === page ? "active" : ""}
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePageChange(page);
                                    }}
                                  >
                                    {page}
                                  </a>
                                </li>
                              ))}
                              <li>
                                <a
                                  className={currentPage === totalPages ? "disable" : ""}
                                  href="#"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleNextPage();
                                  }}
                                >
                                  <i className="icofont-double-right"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        )}

                    </div>


                </div>
            </div>
        </div>
        {/* <!-- course__section__end   --> */}

    </>
  );
};

export default Courses;
