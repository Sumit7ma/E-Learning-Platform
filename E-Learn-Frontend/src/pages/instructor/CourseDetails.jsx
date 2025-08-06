import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instructorAxios from "../../api/instructorAxios";
import InstructorSidebar from "../../components/instructor/Sidebar";
import "../../style/CourseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [lectureTitle, setLectureTitle] = useState("");
  const [lectureFile, setLectureFile] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = () => {
    instructorAxios
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data))
      .catch(() => alert(" Failed to load course details"));
  };

  const handleUploadLecture = () => {
    if (!selectedSectionId || !lectureTitle || !lectureFile) {
      alert("Please fill all lecture fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", lectureTitle);
    formData.append("file", lectureFile);

    instructorAxios
      .post(`/courses/${id}/sections/${selectedSectionId}/lectures`, formData)
      .then(() => {
        alert("✅ Lecture uploaded");
        setLectureTitle("");
        setLectureFile(null);
        setSelectedSectionId(null);
        fetchCourseDetails();
      })
      .catch(() => alert("Failed to upload lecture"));
  };

  if (!course) return <div>Loading...</div>;

  return (
    <div className="dashboard-layout">
      <InstructorSidebar />
      <div className="dashboard-main">
        <h2 className="dashboard-title">{course.title}</h2>
        <img
          src={`http://localhost:8080/uploads/${course.thumbnail}`}
          className="detail-img"
          alt="thumbnail"
        />
        <p>{course.description}</p>
        <div className="badge-area">
          <span>{course.language}</span>
          <span>{course.level}</span>
          <span>{course.tag}</span>
          <span>₹{course.price}</span>
        </div>

        <h4 className="mt-4">Sections</h4>
        {course.sections && course.sections.length > 0 ? (
          course.sections.map((section, index) => (
            <div key={index} className="section-block">
              <strong>{section.title}</strong>
              <ul className="lecture-list">
                {section.lectures.map((lec, i) => (
                  <li key={i}>{lec}</li>
                ))}
              </ul>

              <div className="upload-lecture-form">
                <input
                  type="text"
                  placeholder="Lecture title"
                  value={selectedSectionId === index ? lectureTitle : ""}
                  onChange={(e) => {
                    setSelectedSectionId(index);
                    setLectureTitle(e.target.value);
                  }}
                />
                <input
                  type="file"
                  accept=".mp4,.pdf"
                  onChange={(e) => {
                    setSelectedSectionId(index);
                    setLectureFile(e.target.files[0]);
                  }}
                />
                <button onClick={() => {
                  const sectionIdFromBackend = course.sections[index].id; 
                  setSelectedSectionId(sectionIdFromBackend);
                  handleUploadLecture();
                }}>
                  Upload
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No sections found.</p>
        )}
      </div>
    </div>
  );
}
