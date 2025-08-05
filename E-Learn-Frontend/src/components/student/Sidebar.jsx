import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const studentName = localStorage.getItem("userName") || "Student";

  return (
    <div className="sidebar d-flex flex-column justify-content-between p-3 bg-dark text-white" style={{ height: "100vh", width: "230px" }}>
      <div>
        <h4 className="mb-4 text-primary fw-bold">CoursoLearn</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <Link to="/student/dashboard" className="nav-link text-white">📚 All Courses</Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/student/enrolled" className="nav-link text-white">🧾 Enrollments</Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/student/payment-history" className="nav-link text-white">💳 Payment History</Link>
          </li>
          <li className="nav-item mb-3">
            <Link to="/student/settings" className="nav-link text-white">⚙️ Settings</Link>
          </li>
        </ul>
      </div>
      <div className="text-white text-center border-top pt-3">
        <strong>{studentName}</strong>
        <br />
        <Link to="/logout" className="text-white">↪ Logout</Link>
      </div>
    </div>
  );
}
