import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/instructor/Sidebar";

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
    level: "",
    tag: "",
    price: "",
    thumbnail: null,
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (name === "thumbnail") {
      setFormData({ ...formData, thumbnail: files[0] });
    } else {
      setFormData({
        ...formData,
        [name]: type === "number" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post("http://localhost:8080/api/instructor/courses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Course created successfully!");
    } catch (err) {
      const error = err.response?.data?.message || "❌ Course creation failed.";
      setMessage(error);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <h2 className="dashboard-title">Add New Course</h2>
        <form onSubmit={handleSubmit} className="add-course-form">
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="language" placeholder="Language" onChange={handleChange} required />
          <input name="level" placeholder="Level" onChange={handleChange} required />
          <input name="tag" placeholder="Tag" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="thumbnail" type="file" accept="image/*" onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
