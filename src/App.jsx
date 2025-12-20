// src/App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}/>
        <Route path="/courses" element={<Courses />}/>
        <Route path="/coursedetails/:id" element={<CourseDetails />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/enrolledCourses" element={<MyCourses/>}/>
        <Route path="/feeSection" element={<FeeSection/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;