import React, { useEffect, useState } from "react";
import instructorAxios from "../../api/instructorAxios";
import CourseBlock from "../../components/CourseBlock";
import Sidebar from "../../components/instructor/Sidebar";
import "../../style/InstructorDashboard.css";

export default function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    instructorAxios
      .get("/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses", err);
      });
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

 return (
  <div className="dashboard-layout">
    <Sidebar />

    <div className="dashboard-main">
      <div className="topbar">
        <div className="breadcrumb">
          <span>Dashboard</span> / <span>All Courses</span>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title, language or level"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fa fa-search"></i>
        </div>
      </div>

      
      <div className="course-grid-wrapper">
        {filteredCourses.map((course) => (
          <CourseBlock
            key={course.id}
            image={
              course.thumbnail
                ? `http://localhost:8080/uploads/${course.thumbnail}`
                : "https://via.placeholder.com/300x160?text=No+Image"
            }
            lang={course.language || "N/A"}
            badge={course.level || "Premium"}
            title={course.title}
            desc={course.description}
            teacherName={course.instructorName}
          />
        ))}
      </div>
    </div>
  </div>
);

}
