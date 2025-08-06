
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import InstructorRegister from "./pages/InstructorRegister";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/student/Dashboard";
import CourseDetails from "./pages/student/CourseDetails";
import EnrolledCourses from "./pages/student/EnrolledCourses";


import AdminDashboard from "./pages/AdminDashboard";


export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/instructor-register" element={<InstructorRegister />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />


        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/student/enrollments" element={<ProtectedRoute><EnrolledCourses /></ProtectedRoute>} />        

      

      </Routes>
    </Router>
  );
}
