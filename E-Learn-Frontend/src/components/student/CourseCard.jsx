import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Axios with token

export default function CourseCard({ course, onView }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("courso_user"));

  const imageUrl = course.thumbnail?.startsWith("http")
    ? course.thumbnail
    : `http://localhost:8080/uploads/${course.thumbnail}`;

  const handleEnroll = async () => {
    try {
      await api.post(`/student/enroll/${course.id}`);
      alert("Enrolled successfully!");
      navigate("/student/enrollments");
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed.");
    }
  };

  return (
    <div className="card bg-dark text-white" style={{ width: "18rem", margin: "1rem" }}>
      <img
        src={imageUrl || "https://via.placeholder.com/300x160?text=No+Image"}
        className="card-img-top"
        alt="Course Thumbnail"
        style={{ height: "180px", objectFit: "cover" }}
      />

      <div className="card-body">
        <span className="badge bg-warning text-dark me-2">{course.tag || "Tag"}</span>
        <span className="badge bg-secondary">{course.language || "Language"}</span>

        <h5 className="card-title mt-2">{course.title}</h5>
        <p className="card-text small">{course.description}</p>
        <small className="text-muted">{course.instructorName || course.instructor}</small>
        <br />

        {onView && (
          <button className="btn btn-primary mt-2 me-2" onClick={() => onView(course.id)}>
            View Details
          </button>
        )}

        {/* Only show Enroll if student is logged in and not already enrolled */}
        {!onView && user?.role === "ROLE_STUDENT" && (
          <button className="btn btn-success mt-2" onClick={handleEnroll}>
            Enroll Now
          </button>
        )}
      </div>
    </div>
  );
}
