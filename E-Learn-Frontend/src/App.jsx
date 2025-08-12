
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./pages/Register";
import InstructorRegister from "./pages/InstructorRegister";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Landing from "./pages/Landing";

import AdminDashboard from "./pages/AdminDashboard";

import RoleRedirector from "./routes/RoleRedirector";
import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/student/Dashboard";
import CourseDetails from "./pages/student/CourseDetails";
import EnrolledCourses from "./pages/student/EnrolledCourses";
import LecturePlayer from "./pages/student/LecturePlayer";
import StudentHome from "./pages/StudentHome";
import Settings from "./pages/student/Settings";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCourseDetails from "./pages/instructor/CourseDetails";
import AllCourses from "./pages/instructor/AllCourses";
import ManageCourses from "./pages/instructor/ManageCourses";
import CreateCourseStep1 from "./pages/instructor/CreateCourseStep1";
import CreateCourseStep2 from "./pages/instructor/CreateCourseStep2";

import PaymentPage from "./pages/student/PaymentPage";
import PaymentSuccess from "./pages/student/PaymentSuccess";
import PaymentFail from "./pages/student/PaymentFail";
import PaymentHistory from "./pages/student/PaymentHistory";








export default function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/instructor-register" element={<InstructorRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        <Route path="/dashboard" element={<RoleRedirector />} />

        <Route path="/student/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
        <Route path="/student/enrollments" element={<ProtectedRoute><EnrolledCourses /></ProtectedRoute>} />
        <Route path="/student/lecture/:courseId" element={<ProtectedRoute><LecturePlayer /></ProtectedRoute>} />
        <Route path="/student-home" element={<ProtectedRoute><StudentHome /></ProtectedRoute>} />
        <Route path="/student/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/student/enrollments" element={<ProtectedRoute><EnrolledCourses /></ProtectedRoute>} />        
        <Route path="/student/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />

        <Route path="/instructor-dashboard" element={<ProtectedRoute><InstructorDashboard /></ProtectedRoute>} />
        <Route path="/instructor/course/:id" element={<ProtectedRoute><InstructorCourseDetails /></ProtectedRoute>} />
        <Route path="/instructor/all-courses" element={<ProtectedRoute><AllCourses /></ProtectedRoute>} />
        <Route path="/instructor/manage-courses" element={<ProtectedRoute><ManageCourses /></ProtectedRoute>} />
        <Route path="/instructor/course/create" element={<ProtectedRoute><CreateCourseStep1 /></ProtectedRoute>}/>
        <Route path="/instructor/course/create/step2" element={<ProtectedRoute><CreateCourseStep2 /></ProtectedRoute>}/>



        <Route path="/student/payment/:id" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
        <Route path="/student/payment/success/:id" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        <Route path="/student/payment/fail/:id" element={<ProtectedRoute><PaymentFail /></ProtectedRoute>} />
         <Route path="/student/payment/cancel/:id" element={<ProtectedRoute><PaymentFail /></ProtectedRoute>} />
         <Route path="/student/enrolled" element={<Navigate to="/student/enrollments" replace />} />
         <Route path="/student/payments" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />

       
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
