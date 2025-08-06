
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/student/Dashboard";

import CourseDetails from "./pages/student/CourseDetails";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import LecturePlayer from "./pages/student/LecturePlayer";
import Settings from "./pages/student/Settings";




export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/student/enrollments" element={<ProtectedRoute><EnrolledCourses /></ProtectedRoute>} />        
       <Route path="/student/lecture/:courseId" element={<ProtectedRoute><LecturePlayer /></ProtectedRoute>} /> 
        <Route path="/student/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />


      </Routes>
    </Router>
  );
}
