import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaChartLine,
  FaUserGraduate,
  FaCog,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";
import "../../style/Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("courso_user"));

  const handleLogout = () => {
    localStorage.removeItem("courso_user");
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-title">Coursolern</div>

      <ul className="sidebar-nav">
       
        
        <li><Link to="/instructor/all-courses"><FaBook /> All Courses</Link></li>
        <li><Link to="/instructor/manage-courses"><FaBook /> Manage Courses</Link></li>
        <li><Link to="/instructor/performance"><FaChartLine /> Performance</Link></li>
        <li><Link to="/instructor/enrollments"><FaUserGraduate /> Enrollments</Link></li>
        <li><Link to="/instructor/settings"><FaCog /> Settings</Link></li>
        <li><Link to="/instructor/payments"><FaMoneyBill /> Payment History</Link></li>
        <li>
          <button onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>

      <div className="sidebar-user">
        <p className="user-name">{user?.name || "Instructor"}</p>
        <p className="user-email">{user?.email || "email@domain.com"}</p>
      </div>
    </div>
  );
}
