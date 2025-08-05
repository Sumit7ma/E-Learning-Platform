import React from "react";

export default function CourseCard({ course, onDelete, onView }) {
  const imageUrl = course.thumbnail.startsWith("http")
    ? course.thumbnail
    : `http://localhost:8080/uploads/${course.thumbnail}`;

  return (
    <div className="card bg-dark text-white" style={{ width: "18rem", margin: "1rem" }}>
      <img src={imageUrl} className="card-img-top" alt="Course" />
      <div className="card-body">
        <span className="badge bg-warning text-dark me-2">{course.tag}</span>
        <span className="badge bg-secondary">{course.language}</span>
        <h5 className="card-title mt-2">{course.title}</h5>
        <p className="card-text small">{course.description}</p>
        <small className="text-muted">{course.instructor}</small>
        <br />
        <button className="btn btn-primary mt-2 me-2" onClick={() => onView && onView(course.id)}>
          View Details
        </button>
        {onDelete && (
          <button className="btn btn-danger mt-2" onClick={() => onDelete(course.id)}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
