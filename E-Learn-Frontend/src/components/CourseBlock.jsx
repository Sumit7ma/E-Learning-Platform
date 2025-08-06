import React from "react";
import { FaUser } from "react-icons/fa";
import "../style/CourseBlock.css";

export default function CourseBlock({ image, lang, badge, title, desc, teacherName }) {
  return (
    <div className="course-block">
      <img src={image} alt={`${title} Thumbnail`} className="course-image" />

      <div className="course-info">
        <div className="course-meta">
          <span className="course-badge">{badge}</span>
          <span className="course-lang">{lang}</span>
        </div>

        <h3 className="course-title">{title}</h3>

        <p className="course-description">{desc}</p>

        <p className="course-author">
          <FaUser style={{ marginRight: "6px", opacity: 0.6 }} />
          <span style={{ opacity: 0.8, fontWeight: 500 }}>Teacher:</span> {teacherName}
        </p>

        <button className="course-button">View Details</button>
      </div>
    </div>
  );
}
