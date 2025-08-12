import React, { useEffect, useState } from "react";
import instructorAxios from "../../api/instructorAxios";
import Sidebar from "../../components/instructor/Sidebar";
import Topbar from "../../components/instructor/Topbar";
import { useNavigate } from "react-router-dom";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await instructorAxios.get("/instructor/courses");
      setCourses(res.data);
    } catch (err) {
      console.error("Error fetching instructor courses:", err);
    }
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="d-flex" style={{ backgroundColor: "#0b0f19", minHeight: "100vh" }}>
      <div style={{ width: "250px", position: "fixed", height: "100vh", zIndex: 1 }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Topbar />

        <div className="container-fluid px-4 pt-3 text-light">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <small className="text-white">Instructor / Courses</small>
              <h4 className="mt-1">Manage Your Courses</h4>
            </div>
            <button className="btn btn-primary" onClick={() => navigate("/instructor/course/create")}>
              New Course
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Search by title, language or level"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="row">
            {filteredCourses.map((course) => (
              <div className="col-md-6 col-lg-4 col-xl-3 mb-4" key={course.id}>
                <div className="card bg-dark text-light h-100 shadow-sm border border-secondary">
                  <img
                    src={course.thumbnail}
                    alt={`${course.title} Thumbnail`}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-warning text-dark">{course.badge}</span>
                      <span className="text-warning text-uppercase small">{course.language}</span>
                    </div>

                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text small">{course.description?.substring(0, 60)}...</p>

                    <p className="small text-muted mt-auto">
                      <i className="bi bi-person-fill me-1"></i>
                      <strong>Teacher:</strong> {course.teacherName}
                    </p>

                    <button
                      className="btn btn-outline-primary w-100"
                      onClick={() => navigate(`/instructor/course/${course.id}`)}
                    >
                      Edit / Manage
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredCourses.length === 0 && (
              <p className="text-muted text-center">No courses found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
