import React, { useEffect, useState } from "react";
import instructorAxios from "../../api/instructorAxios";
import Sidebar from "../../components/instructor/Sidebar";
import { useNavigate } from "react-router-dom";
import "../../style/ManageCourses.css"; 

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await instructorAxios.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching instructor courses:", err);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manage-courses-page">
      
      <div className="sidebar-fixed">
        <Sidebar />
      </div>

      
      <div className="content-area">
        
        <div className="d-flex justify-content-between align-items-center mb-4 breadcrumb-section">
          <div>
            <small>Instructor / Courses</small>
            <h4>Manage Your Courses</h4>
          </div>
          <button
            className="btn-create-course"
            onClick={() => navigate("/instructor/course/create")}
          >
            + New Course
          </button>
        </div>

    
        <div className="mb-4 search-box">
          <input
            type="text"
            placeholder="Search by title, language or level"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

    
        <div className="card-grid">
          {filteredCourses.map((course) => (
            <div className="course-card" key={course.id}>
              <img
                src={course.thumbnail || "/default-thumbnail.jpg"}
                alt={course.title}
              />
              <div className="course-card-body">
                <div className="course-meta">
                  <span>{course.tag || "No Tag"}</span>
                  <span>{course.language || "N/A"}</span>
                </div>
                <div className="course-title">{course.title}</div>
                <div className="course-desc">
                  {course.description?.substring(0, 60)}...
                </div>
                <div className="course-footer">
                  <i className="bi bi-person-fill me-1"></i>
                  <strong>Teacher:</strong> {course.teacherName || "You"}
                </div>
                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/instructor/course/${course.id}/edit`)
                  }
                >
                  Edit / Manage
                </button>
              </div>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <p className="text-center text-muted">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
