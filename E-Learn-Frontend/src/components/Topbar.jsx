import React from "react";
import { useLocation } from "react-router-dom";
import "../style/Topbar.css"; 

export default function Topbar({ search, setSearch }) {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes("/student/dashboard")) return "All Courses";
    if (location.pathname.includes("/student/enrollments")) return "Enrollments";
    if (location.pathname.includes("/student/payments")) return "Payment History";
    if (location.pathname.includes("/student/settings")) return "Settings";
    return "Dashboard";
  };

  return (
    <div className="topbar">
      <div className="topbar-left">Dashboard / {getPageTitle()}</div>

      {location.pathname.includes("/student/dashboard") && (
        <input
          type="text"
          className="search-box"
          placeholder="Search for courses"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    </div>
  );
}
