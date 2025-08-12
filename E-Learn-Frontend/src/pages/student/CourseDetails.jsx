import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Sidebar from "../../components/student/Sidebar";
import Topbar from "../../components/student/Topbar";
import "../../style/CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => alert("Failed to load course details"));
  }, [id]);

  if (!course) return <div className="text-white">Loading...</div>;

  return (
    <div className="dashboard-layout d-flex">
      <Sidebar />
      <div className="dashboard-main-content">
        <Topbar title={course.title} />

        <div className="course-details-content">
          
          <div className="course-info-area">
            <img
              src={
                course.thumbnail?.startsWith("http")
                  ? course.thumbnail
                  : `http://localhost:8080/uploads/${course.thumbnail}`
              }
              alt="Course Thumbnail"
              className="course-image"
            />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-desc">{course.description}</p>

            <div className="course-tags">
              <span className="badge bg-warning me-2">{course.tag}</span>
              <span className="badge bg-secondary me-2">{course.language}</span>
              <span className="badge bg-info">Level: {course.level}</span>
            </div>

            <h5 className="mt-3">Instructor: {course.instructorName}</h5>
          </div>

         
          <div className="section-list">
            <h4 className="text-white">Buy this course</h4>
            <h3 className="text-success">₹{course.price}</h3>

            <button
              className="btn btn-warning mt-3 w-100"
              onClick={() => navigate(`/student/payment/${course.id}`)}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
