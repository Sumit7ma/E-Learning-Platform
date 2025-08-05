import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";
import Topbar from "../../components/student/Topbar";
import "../../style/Dashboard.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/courses")
      .then((res) => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / pageSize);
  const visibleCourses = filteredCourses.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar title="All Courses" search={search} setSearch={setSearch} />

        {filteredCourses.length === 0 ? (
          <p className="text-white text-center">No courses found.</p>
        ) : (
          <>
        
            <div className="pagination-controls mb-3">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="btn btn-secondary me-2"
              >
                &lt;
              </button>
              <span className="text-white">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
                className="btn btn-secondary ms-2"
              >
                &gt;
              </button>
            </div>

          
            <div className="horizontal-scroll-wrapper">
              {visibleCourses.map((course) => (
                <div key={course.id} className="course-slide-card">
                  <img
                    src={
                      course.thumbnail?.startsWith("http")
                        ? course.thumbnail
                        : `http://localhost:8080/uploads/${course.thumbnail}`
                    }
                    alt="Course Thumbnail"
                    className="course-image"
                  />
                  <div className="course-meta">
                    <span className="badge bg-warning text-dark">{course.tag}</span>
                    <span className="badge bg-secondary text-capitalize">
                      {course.language}
                    </span>
                  </div>
                  <h5 className="course-title">{course.title}</h5>
                  <p className="course-description">{course.description}</p>
                  <small className="course-instructor">
                    Instructor: {course.instructorName}
                  </small>
                  <button
                    className="btn btn-outline-info mt-2 course-button"
                    onClick={() => navigate(`/student/course/${course.id}`)}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
