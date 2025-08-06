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
        <div className="page-animated fade-in-up">

          
          <div className="breadcrumb">
            <span>Dashboard</span> / <span>All Courses</span>
          </div>

          
          <div className="search-bar glow-border">
            <input
              type="text"
              placeholder="Search by title, language or level"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <i className="fa fa-search"></i>
          </div>

          
          <div className="course-grid-wrapper stagger-fade">
            {filteredCourses.map((course, index) => (
              <div
                className="course-grid-item fade-item"
                key={course.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CourseBlock
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
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

