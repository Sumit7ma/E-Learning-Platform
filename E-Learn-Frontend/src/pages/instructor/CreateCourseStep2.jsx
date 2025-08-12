import React, { useState } from "react";
import Sidebar from "../../components/instructor/Sidebar";
import Topbar from "../../components/instructor/Topbar";
import { useNavigate, useLocation } from "react-router-dom";
import instructorAxios from "../../api/instructorAxios";

export default function CreateCourseStep2() {
  const { state } = useLocation();
  const courseType = state?.type || "COURSE";

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "",
    level: "Beginner",
    thumbnail: null,
    type: courseType,
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);

      const payload = new FormData();
      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      const res = await instructorAxios.post("/instructor/courses", payload);
      const courseId = res.data.id;

      navigate(`/instructor/course/${courseId}`);
    } catch (err) {
      alert("Failed to create course.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="d-flex" style={{ backgroundColor: "#0b0f19", minHeight: "100vh" }}>
      <div style={{ width: "250px", position: "fixed", height: "100vh", zIndex: 1 }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Topbar />

        <div className="container py-5 text-light">
          <h4 className="mb-4">Let’s start with the basics</h4>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                className="form-control bg-dark text-white"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Subtitle</label>
              <input
                type="text"
                className="form-control bg-dark text-white"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control bg-dark text-white"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Language</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  name="language"
                  value={formData.language}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Level</label>
                <select
                  name="level"
                  className="form-select bg-dark text-white"
                  value={formData.level}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Course Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                className="form-control bg-dark text-white"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/instructor/course/create")}
                type="button"
              >
                Back
              </button>
              <button className="btn btn-success" type="submit" disabled={uploading}>
                {uploading ? "Saving..." : "Save and Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
