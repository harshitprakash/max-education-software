import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../services/application/AuthContext";
import { apiClient } from "../../services/infrastructure/apiClient";
import { studentStorage } from "../../services/infrastructure/studentStorage";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  const { user } = useAuth();
  
  // localStorage keys
  const STORAGE_KEYS = {
    PROFILE_DATA: 'profile_header_data',
    COURSES_COUNT: 'profile_courses_count',
    CERTIFICATES_COUNT: 'profile_certificates_count',
  };

  // Initialize state from localStorage and studentStorage immediately
  const getInitialState = () => {
    try {
      // First check studentStorage (from login response - most reliable)
      const studentData = studentStorage.getStudentData();
      
      const storedProfileData = localStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
      const storedCoursesCount = localStorage.getItem(STORAGE_KEYS.COURSES_COUNT);
      const storedCertificatesCount = localStorage.getItem(STORAGE_KEYS.CERTIFICATES_COUNT);

      return {
        profileData: storedProfileData ? JSON.parse(storedProfileData) : null,
        // Use enrolledCoursesCount from studentData if available, otherwise from localStorage
        enrolledCoursesCount: studentData?.enrolledCoursesCount || 
                             (storedCoursesCount ? parseInt(storedCoursesCount, 10) : 0),
        certificatesCount: storedCertificatesCount ? parseInt(storedCertificatesCount, 10) : 0,
        // Only loading if no cached data at all
        isLoading: !studentData && !storedProfileData && !storedCoursesCount,
      };
    } catch (error) {
      console.warn('Error loading initial state from localStorage:', error);
      return {
        profileData: null,
        enrolledCoursesCount: 0,
        certificatesCount: 0,
        isLoading: true,
      };
    }
  };

  const initialState = getInitialState();
  const [profileData, setProfileData] = useState(initialState.profileData);
  const [isLoading, setIsLoading] = useState(initialState.isLoading);
  const [enrolledCoursesCount, setEnrolledCoursesCount] = useState(initialState.enrolledCoursesCount);
  const [certificatesCount, setCertificatesCount] = useState(initialState.certificatesCount);
  
  // Use ref to track if we've already fetched data and prevent duplicate calls
  const hasFetchedRef = useRef(false);
  const userIdRef = useRef(null);

  // Save data to localStorage
  const saveToLocalStorage = (data, coursesCount, certificatesCount) => {
    try {
      if (data) {
        localStorage.setItem(STORAGE_KEYS.PROFILE_DATA, JSON.stringify(data));
      }
      if (coursesCount !== undefined && coursesCount !== null) {
        localStorage.setItem(STORAGE_KEYS.COURSES_COUNT, coursesCount.toString());
      }
      if (certificatesCount !== undefined && certificatesCount !== null) {
        localStorage.setItem(STORAGE_KEYS.CERTIFICATES_COUNT, certificatesCount.toString());
      }
    } catch (error) {
      console.warn('Error saving to localStorage:', error);
    }
  };

  // Clear localStorage data
  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE_DATA);
      localStorage.removeItem(STORAGE_KEYS.COURSES_COUNT);
      localStorage.removeItem(STORAGE_KEYS.CERTIFICATES_COUNT);
    } catch (error) {
      console.warn('Error clearing localStorage:', error);
    }
  };

  useEffect(() => {
    // Check if user is authenticated by checking token
    const hasToken = typeof window !== 'undefined' && sessionStorage.getItem('auth_access_token');
    
    // If no token, user is logged out - clear everything
    if (!hasToken) {
      setIsLoading(false);
      setProfileData(null);
      setEnrolledCoursesCount(0);
      setCertificatesCount(0);
      clearLocalStorage();
      hasFetchedRef.current = false;
      userIdRef.current = null;
      return;
    }

    // Get stable user identifier (use email from token or user object)
    const userId = user?.id || user?.userId || user?.email || 
                   (hasToken ? 'authenticated' : null);
    
    // If no user object yet but we have token, wait for user to load
    if (!user && hasToken) {
      // Keep cached data, just ensure loading is false
      setIsLoading(false);
      return;
    }

    // If no user and no token, we already handled it above
    if (!user) {
      return;
    }

    // Reset fetch tracking if user changed
    if (userIdRef.current !== null && userIdRef.current !== userId) {
      hasFetchedRef.current = false;
    }

    // Skip if we've already fetched for this user
    if (hasFetchedRef.current && userIdRef.current === userId) {
      // Ensure loading is false if we're skipping
      setIsLoading(false);
      return;
    }

    // Mark as fetching for this user
    hasFetchedRef.current = true;
    userIdRef.current = userId;

    let isMounted = true;

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch profile data
        let fetchedProfileData = null;
        try {
          const profileResponse = await apiClient.get('/api/students/profile');
          if (isMounted && profileResponse.ok) {
            const profileApiResponse = await profileResponse.json();
            if (profileApiResponse.status === 200 && profileApiResponse.data) {
              fetchedProfileData = profileApiResponse.data;
              setProfileData(fetchedProfileData);
            }
          } else if (isMounted) {
            // If profile fetch fails, log but continue
            const errorData = await profileResponse.json().catch(() => ({}));
            console.warn('Profile fetch failed:', errorData.message || 'Unknown error');
          }
        } catch (profileError) {
          console.warn('Profile fetch error:', profileError);
        }

        // Fetch enrolled courses count
        let fetchedCoursesCount = 0;
        try {
          const coursesResponse = await apiClient.get('/api/students/courses');
          if (isMounted && coursesResponse.ok) {
            const coursesApiResponse = await coursesResponse.json();
            if (coursesApiResponse.status === 200 && coursesApiResponse.data) {
              const courses = Array.isArray(coursesApiResponse.data) 
                ? coursesApiResponse.data 
                : coursesApiResponse.data.courses || [];
              fetchedCoursesCount = courses.length;
              setEnrolledCoursesCount(fetchedCoursesCount);
              
              // Update studentStorage with new enrolledCoursesCount
              const currentStudentData = studentStorage.getStudentData();
              if (currentStudentData) {
                studentStorage.setStudentData({
                  ...currentStudentData,
                  enrolledCoursesCount: fetchedCoursesCount,
                });
              }
            }
          } else if (isMounted) {
            // If courses fetch fails, log but continue
            const errorData = await coursesResponse.json().catch(() => ({}));
            console.warn('Courses fetch failed:', errorData.message || 'Unknown error');
          }
        } catch (coursesError) {
          console.warn('Courses fetch error:', coursesError);
        }

        // Save fetched data to localStorage (only if we got new data)
        if (isMounted) {
          // Only save if we got new data, otherwise keep existing localStorage data
          if (fetchedProfileData) {
            saveToLocalStorage(fetchedProfileData, fetchedCoursesCount, certificatesCount);
          } else if (fetchedCoursesCount > 0) {
            // Update courses count even if profile data fetch failed
            const existingProfileData = localStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
            saveToLocalStorage(
              existingProfileData ? JSON.parse(existingProfileData) : null,
              fetchedCoursesCount,
              certificatesCount
            );
          }
        }
      } catch (error) {
        console.warn('Error fetching profile header data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfileData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [user]);

  // Get user display name - always check studentStorage first for persistence
  const getUserDisplayName = () => {
    // First check studentStorage (most reliable after refresh - from login response)
    const studentData = studentStorage.getStudentData();
    if (studentData?.fullName) {
      return studentData.fullName;
    }
    if (studentData?.firstName || studentData?.lastName) {
      const name = `${studentData.firstName || ''} ${studentData.lastName || ''}`.trim();
      if (name) return name;
    }

    // Then check localStorage profile data (from API fetch)
    try {
      const storedProfileData = localStorage.getItem(STORAGE_KEYS.PROFILE_DATA);
      if (storedProfileData) {
        const parsedData = JSON.parse(storedProfileData);
        if (parsedData?.fullName) {
          return parsedData.fullName;
        }
        if (parsedData?.firstName || parsedData?.lastName) {
          const name = `${parsedData.firstName || ''} ${parsedData.lastName || ''}`.trim();
          if (name) return name;
        }
      }
    } catch (error) {
      console.warn('Error reading from localStorage:', error);
    }

    // Then check profileData from state
    if (profileData?.fullName) {
      return profileData.fullName;
    }
    if (profileData?.firstName || profileData?.lastName) {
      const name = `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim();
      if (name) return name;
    }
    
    // Fallback to user object
    if (user?.userName) {
      return user.userName;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    if (user?.student?.firstName || user?.student?.lastName) {
      return `${user.student.firstName || ''} ${user.student.lastName || ''}`.trim();
    }
    
    // If still loading and no cached data, show loading text
    if (isLoading && !studentStorage.hasStudentData() && !localStorage.getItem(STORAGE_KEYS.PROFILE_DATA)) {
      return 'Loading...';
    }
    
    return 'User';
  };

  // Get user profile image
  const getUserImage = () => {
    if (profileData?.profileImage) {
      return profileData.profileImage;
    }
    if (user?.profileImage) {
      return user.profileImage;
    }
    // Default placeholder image
    return "/img/teacher/teacher__2.png";
  };

  const displayName = getUserDisplayName();
  const userImage = getUserImage();

  return (
    <div className="container-fluid full__width__padding">
      <div className="row">
        <div className="col-xl-12">
          <div className="dashboardarea__wraper">
            <div className="dashboardarea__img">
              <div className="dashboardarea__inner student__dashboard__inner" style={{backgroundColor:'#5f2ded'}}>
                <div className="dashboardarea__left">
                  <div className="dashboardarea__left__img">
                    {isLoading ? (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        borderRadius: '50%'
                      }}>
                        <span style={{ color: '#5f2ded' }}>Loading...</span>
                      </div>
                    ) : (
                      <img
                        loading="lazy"
                        src={userImage}
                        alt={displayName}
                        onError={(e) => {
                          // Fallback to default image if user image fails to load
                          e.target.src = "/img/teacher/teacher__2.png";
                        }}
                      />
                    )}
                  </div>
                  <div className="dashboardarea__left__content">
                    <h4>{displayName}</h4>
                    <ul>
                      <li>
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
                          className="feather feather-book-open"
                        >
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        {(() => {
                          // Get courses count: first from studentStorage (login response), then state, then localStorage
                          const studentData = studentStorage.getStudentData();
                          const count = studentData?.enrolledCoursesCount || 
                                      enrolledCoursesCount || 
                                      (() => {
                                        try {
                                          const stored = localStorage.getItem(STORAGE_KEYS.COURSES_COUNT);
                                          return stored ? parseInt(stored, 10) : 0;
                                        } catch {
                                          return 0;
                                        }
                                      })();
                          return isLoading && !count ? '...' : `${count} Courses Enrolled`;
                        })()}
                      </li>
                      <li>
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
                          className="feather feather-award"
                        >
                          <circle cx="12" cy="8" r="7"></circle>
                          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                        </svg>
                        {isLoading ? '...' : `${certificatesCount} Certificate${certificatesCount !== 1 ? 's' : ''}`}
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
