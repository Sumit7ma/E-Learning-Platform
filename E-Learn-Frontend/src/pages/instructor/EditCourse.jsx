import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instructorAxios from "../../api/instructorAxios";
import Sidebar from "../../components/instructor/Sidebar";
import Topbar from "../../components/instructor/Topbar";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "",
    level: "Beginner",
    thumbnail: null,
    price: "",
    tag: "",
  });

  const [existingThumbnail, setExistingThumbnail] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadCourseDetails();
  }, []);

  const loadCourseDetails = async () => {
    try {
      const res = await instructorAxios.get(`/courses/${id}`);
      const data = res.data;

      setFormData({
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        language: data.language,
        level: data.level,
        price: data.price,
        tag: data.tag,
        thumbnail: null,
      });

      setExistingThumbnail(data.thumbnail);
    } catch (err) {
      alert("Failed to load course.");
      console.error("Course load error:", err);
    } finally {
      setLoading(false);
    }
  };

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
  setUpdating(true);
  try {
    const payload = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    }

    await instructorAxios.put(`/instructor/courses/${id}`, payload);

    alert("Course updated successfully!");
    navigate("/instructor/manage-courses");
  } catch (err) {
    console.error("Update failed", err.response || err);
    alert("Update failed.");
  } finally {
    setUpdating(false);
  }
};


  if (loading) return <div className="text-light p-4">Loading...</div>;

  return (
    <div className="d-flex" style={{ backgroundColor: "#0b0f19", minHeight: "100vh" }}>
      <div style={{ width: "250px", position: "fixed", height: "100vh", zIndex: 1 }}>
        <Sidebar />
      </div>

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Topbar />

        <div className="container py-5 text-light">
          <h4 className="mb-4">Edit Course Details</h4>

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

            <div className="mb-3 row">
              <div className="col-md-6">
                <label className="form-label">Price (INR)</label>
                <input
                  type="number"
                  className="form-control bg-dark text-white"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control bg-dark text-white"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Current Thumbnail</label><br />
              {existingThumbnail && (
                <img
                  src={existingThumbnail}
                  alt="Current Thumbnail"
                  height="100"
                  className="mb-2"
                />
              )}
              <input
                type="file"
                name="thumbnail"
                className="form-control bg-dark text-white"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/instructor/manage-courses")}
                type="button"
              >
                Cancel
              </button>
              <button className="btn btn-success" type="submit" disabled={updating}>
                {updating ? "Updating..." : "Update Course"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
