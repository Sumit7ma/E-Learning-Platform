import React, { useEffect, useState } from "react";
import instructorAxios from "../../api/instructorAxios";
import Sidebar from "../../components/instructor/Sidebar";
import CourseBlock from "../../components/CourseBlock";
import { FaSearch } from "react-icons/fa";
import "../../style/InstructorDashboard.css";

export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    instructorAxios
      .get("/instructor/courses")
      .then((res) => {
        setCourses(res.data);
        setFilteredCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch instructor courses", err);
      });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(value) ||
        course.language?.toLowerCase().includes(value) ||
        course.level?.toLowerCase().includes(value)
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
      
        <div className="breadcrumb-nav">
          <span>Dashboard</span> <span className="slash">/</span> <span>Courses</span>
        </div>

        
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search by title, category or language"
            value={searchText}
            onChange={handleSearch}
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

       
        <div className="courses-container">
          {filteredCourses.map((course) => (
            <CourseBlock
              key={course.id}
              image={
                course.thumbnail
                  ? `http://localhost:8080/uploads/${course.thumbnail}`
                  : "https://via.placeholder.com/300x160?text=No+Image"
              }
              lang={course.language}
              badge={course.level}
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
