import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  return (
    <div className="sidebar">
      <h2 className="logo">CoursoLearn</h2>
      <nav>
        <p onClick={() => navigate("/student/dashboard")}>All Courses</p>
        <p onClick={() => navigate("/student/enrollments")}>Enrollments</p>
        <p onClick={() => navigate("/student/payments")}>Payment History</p>
        <p onClick={() => navigate("/student/settings")}>Settings</p>
      </nav>
      <div className="student-footer">
        <strong>{user?.name || "Student"}</strong>
        <p onClick={handleLogout} className="logout-btn">Logout</p>
      </div>
    </div>
  );
}
