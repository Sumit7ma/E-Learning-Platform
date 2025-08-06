import React, { useState, useEffect } from "react";
import Sidebar from "../../components/student/Sidebar";
import "../../style/LecturePlayer.css";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function LecturePlayer() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/student/enrolled-course/${courseId}`)
      .then(res => {
        setCourse(res.data);
        const firstLecture = res.data.sections[0]?.lectures[0];
        if (firstLecture) setCurrentVideo(firstLecture);
      })
      .catch(() => alert("Failed to load course or access is denied"));
  }, [courseId]);

  return (
    <div className="lecture-player-layout">
      <Sidebar />

      <div className="lecture-main">
        <div className="lecture-left">
          <h4 className="text-info mb-3">📚 Course Content</h4>
          {course?.sections.map((section, i) => (
            <div key={i} className="section-box">
              <h6>{section.title}</h6>
              <ul className="lecture-list">
                {section.lectures.map((lecture, j) => (
                  <li
                    key={j}
                    className={`lecture-item ${currentVideo?.id === lecture.id ? "active" : ""}`}
                    onClick={() => setCurrentVideo(lecture)}
                  >
                    ▶️ {lecture.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="lecture-right">
          {currentVideo ? (
            <div className="video-container">
              <iframe
                src={currentVideo.videoUrl}
                title={currentVideo.title}
                frameBorder="0"
                allowFullScreen
              />
              <h5 className="mt-3 text-light">{currentVideo.title}</h5>
            </div>
          ) : (
            <p className="text-muted">Select a lecture to begin</p>
          )}
        </div>
      </div>
    </div>
  );
}
