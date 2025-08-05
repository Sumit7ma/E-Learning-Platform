import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";
import Topbar from "../../components/student/Topbar";
import CourseCard from "../../components/student/CourseCard";

export default function EnrolledCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/student/enrollments")
      .then(res => setCourses(res.data))
      .catch(() => alert("Failed to load enrollments"));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar title="Enrollments" />
        <div className="row p-4">
          {courses.map(course => (
            <div className="col-md-4 mb-4" key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
