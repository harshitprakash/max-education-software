import React, { useState, useMemo, useEffect } from "react";
import BreadcrumbArea from "../components/BreadcrumbArea";
import CourseCard from "../components/cards/CourseCard";
import CourseListItem from "../components/cards/CourseListItem";
import { courseService } from "../services/application/courseService";
import { toast } from "react-toastify";
import Mode from "../components/Mode"; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("new");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const coursesData = await courseService.getAllCourses();
        
        // Log API response for debugging
        console.log('=== Courses API Response ===');
        console.log('API Endpoint: GET /api/courses/public');
        console.log('Full Response Array:', coursesData);
        console.log('Number of Courses:', coursesData?.length || 0);
        
        if (coursesData && coursesData.length > 0) {
          console.log('\n--- First Course Sample ---');
          console.log('Course Object:', coursesData[0]);
          console.log('\nCourse Structure Breakdown:');
          console.log('  - id:', coursesData[0].id);
          console.log('  - courseName:', coursesData[0].courseName);
          console.log('  - courseCode:', coursesData[0].courseCode);
          console.log('  - description:', coursesData[0].description);
          console.log('  - price:', coursesData[0].price);
          console.log('  - monthlyPrice:', coursesData[0].monthlyPrice);
          console.log('  - packagePrice:', coursesData[0].packagePrice);
          console.log('  - duration:', coursesData[0].duration);
          console.log('  - credits:', coursesData[0].credits);
          console.log('  - teacherId:', coursesData[0].teacherId);
          console.log('  - teacherName:', coursesData[0].teacherName);
          console.log('  - branchId:', coursesData[0].branchId);
          console.log('  - branchName:', coursesData[0].branchName);
          console.log('  - categoryId:', coursesData[0].categoryId);
          console.log('  - categoryName:', coursesData[0].categoryName);
          console.log('  - categoryDescription:', coursesData[0].categoryDescription);
          console.log('  - modules:', coursesData[0].modules);
          console.log('    - modules count:', coursesData[0].modules?.length || 0);
          if (coursesData[0].modules && coursesData[0].modules.length > 0) {
            console.log('    - first module:', coursesData[0].modules[0]);
          }
          
          console.log('\n--- All Courses Summary ---');
          coursesData.forEach((course, index) => {
            console.log(`${index + 1}. ${course.courseName} (${course.courseCode}) - ${course.categoryName}`);
          });
        }
        
        console.log('\n=== Mapped Courses Data ===');
        const mappedData = coursesData?.map((course) => {
          const courseImage = 
            course.modules && course.modules.length > 0 && course.modules[0].imageUrl
              ? course.modules[0].imageUrl
              : "/img/courses/basic_course.jpg";

          return {
            id: course.id,
            title: course.courseName || "Untitled Course",
            category: course.categoryName || "General",
            description: course.description || "",
            img: courseImage,
            courseLink: `/coursedetails/${course.id}`,
            instructorName: course.teacherName || "Instructor",
            badgeClass: "",
          };
        }) || [];
        console.log('Mapped Courses:', mappedData);
        console.log('===========================');
        
        setCourses(coursesData || []);
      } catch (err) {
        console.error('=== Error Fetching Courses ===');
        console.error('Error:', err);
        console.error('Error Message:', err.message);
        console.error('=============================');
        setError(err.message || "Failed to load courses");
        toast.error(err.message || "Failed to load courses");
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Map API course data to component props format
  const mappedCourses = useMemo(() => {
    return courses.map((course) => {
      // Get first module image or use default
      const courseImage = 
        course.modules && course.modules.length > 0 && course.modules[0].imageUrl
          ? course.modules[0].imageUrl
          : "/img/courses/basic_course.jpg";

      return {
        id: course.id,
        title: course.courseName || "Untitled Course",
        category: course.categoryName || "General",
        description: course.description || "",
        img: courseImage,
        courseLink: `/coursedetails/${course.id}`,
        instructorName: course.teacherName || "Instructor",
        badgeClass: "", // Can be customized based on category
      };
    });
  }, [courses]);

  // Filter courses based on search query
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) {
      return mappedCourses;
    }

    const query = searchQuery.toLowerCase().trim();
    return mappedCourses.filter((course) => {
      const titleMatch = course.title?.toLowerCase().includes(query);
      const categoryMatch = course.category?.toLowerCase().includes(query);
      const instructorMatch = course.instructorName?.toLowerCase().includes(query);
      
      return titleMatch || categoryMatch || instructorMatch;
    });
  }, [searchQuery, mappedCourses]);

  // Extract unique categories from courses and count them
  const categories = useMemo(() => {
    const categoryMap = {};
    mappedCourses.forEach((course) => {
      const category = course.category;
      if (category) {
        categoryMap[category] = (categoryMap[category] || 0) + 1;
      }
    });
    // Convert to array and sort alphabetically
    return Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [mappedCourses]);

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

  // Loading state
  if (isLoading) {
    return (
      <>
        <Mode/>
        <BreadcrumbArea
          title="Courses"
          items={[{ label: "Home", href: "/" }, { label: "Courses" }]}
          shapeImages={[
            "img/herobanner/herobanner__1.png",
            "img/herobanner/herobanner__2.png",
            "img/herobanner/herobanner__3.png",
            "img/herobanner/herobanner__5.png",
          ]}
        />
        <div className="container py-5 text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading courses...</p>
        </div>
      </>
    );
  }

  // Error state
  if (error && mappedCourses.length === 0) {
    return (
      <>
        <Mode/>
        <BreadcrumbArea
          title="Courses"
          items={[{ label: "Home", href: "/" }, { label: "Courses" }]}
          shapeImages={[
            "img/herobanner/herobanner__1.png",
            "img/herobanner/herobanner__2.png",
            "img/herobanner/herobanner__3.png",
            "img/herobanner/herobanner__5.png",
          ]}
        />
        <div className="container py-5 text-center">
          <h2>{error || "Failed to load courses"}</h2>
          <button 
            className="default__button mt-3"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </>
    );
  }

  return (
    <>
    <Mode/>
        {/* breadcrumb area (replaced with reusable component) */}
        <BreadcrumbArea
          title="Courses"
          items={[{ label: "Home", href: "/" }, { label: "Courses" }]}
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
                                  {paginatedCourses.length > 0 ? (
                                    paginatedCourses.map((c) => (
                                      <CourseCard
                                        key={c.id}
                                        img={c.img}
                                        courseLink={c.courseLink}
                                        category={c.category}
                                        badgeClass={c.badgeClass}
                                        description={c.description}
                                        title={c.title}
                                        instructorLink={c.instructorLink}
                                        heartLink={c.heartLink}
                                      />
                                    ))
                                  ) : (
                                    <div className="col-12 text-center py-5">
                                      <p className="text-muted">No courses found matching your criteria.</p>
                                    </div>
                                  )}
                                </div>

                            </div>


                            <div className="tab-pane fade" id="projects__two" role="tabpanel" aria-labelledby="projects__two">

                                {paginatedCourses.length > 0 ? (
                                  paginatedCourses.map((c) => (
                                    <CourseListItem
                                      key={c.id}
                                      img={c.img}
                                      courseLink={c.courseLink}
                                      category={c.category}
                                      badgeClass={c.badgeClass}
                                      heartLink={c.heartLink}
                                      description={c.description}
                                      title={c.title}
                                    />
                                  ))
                                ) : (
                                  <div className="text-center py-5">
                                    <p className="text-muted">No courses found matching your criteria.</p>
                                  </div>
                                )}

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
