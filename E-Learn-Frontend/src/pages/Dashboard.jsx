import React, { useEffect, useState } from "react";
import Sidebar from "../../components/student/Sidebar";
import Topbar from "../../components/student/Topbar";
import CourseCard from "../../components/student/CourseCard";
import api from "../../api/axios";
import "../../style/Dashboard.css";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/courses/list")
      .then(res => setCourses(res.data))
      .catch(() => alert("Failed to load courses"));
  }, []);

  const filteredCourses = courses.filter((course) =>
    course.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main flex-grow-1" style={{ marginLeft: "220px", minHeight: "100vh", background: "#0b0f19" }}>
        <Topbar title="All Courses" search={search} setSearch={setSearch} />
        <div className="p-4 row">
          {filteredCourses.length === 0 ? (
            <p className="text-white text-center">No courses found.</p>
          ) : (
            filteredCourses.map((course) => (
              <div className="col-md-4 mb-4" key={course.id}>
                <CourseCard {...course} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
