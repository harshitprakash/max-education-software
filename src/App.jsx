// src/App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './services/application/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/index';
import About from './pages/About';
import Courses from './pages/Courses';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import Login from './pages/Auth/Login';
import CourseDetails from './pages/CoursesDetails';
import Profile from './pages/profile/Profile';
import Dashboard from './pages/profile/Dashboard';
// import EnrolledCourses from './pages/profile/EnrolledCourses';
import MyCourses from './pages/profile/EnrolledCourses';
import FeeSection from './pages/profile/FeeSection';
import ChangePassword from './pages/profile/ChangePassword';
import MyCertificates from './pages/profile/MyCertificates';
import CertificateVerification from './pages/CertificateVerification';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}/>
          <Route path="/courses" element={<Courses />}/>
          <Route path="/coursedetails/:id" element={<CourseDetails />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/verify-certificate" element={<CertificateVerification />}/>
          
          {/* Protected Routes - Require Authentication */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/enrolledCourses" 
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/feeSection" 
            element={
              <ProtectedRoute>
                <FeeSection />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/changePassword" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/myCertificates" 
            element={
              <ProtectedRoute>
                <MyCertificates />
              </ProtectedRoute>
            }
          />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </AuthProvider>
  );
}

export default App;