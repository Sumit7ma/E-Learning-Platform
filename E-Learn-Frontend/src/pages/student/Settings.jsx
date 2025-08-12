import React, { useEffect, useState } from "react";
import Sidebar from "../../components/student/Sidebar";
import api from "../../api/axios";
import { toast } from "react-toastify";
import "../../style/Settings.css";

export default function Settings() {
  const [form, setForm] = useState({ name: "", email: "" });

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    api.get("/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setForm({
          name: res.data.name,
          email: res.data.email,
        });
        localStorage.setItem("courso_user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load user profile");
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, name: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const res = await api.put(
        "/users/me",
        { name: form.name.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.setItem("courso_user", JSON.stringify(res.data));
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="settings-layout">
      <Sidebar />
      <div className="settings-main">
        <div className="settings-header d-flex justify-content-between align-items-center">
          <h4 className="text-white">Account Settings</h4>
          <button className="btn btn-sm btn-secondary">✏️ View</button>
        </div>

        <div className="settings-card mt-3 p-4 rounded">
          <h6 className="text-white mb-3">Profile Information</h6>

          <div className="profile-circle bg-danger text-white d-flex align-items-center justify-content-center">
            {form.name?.charAt(0).toUpperCase()}
          </div>

          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label text-white">Full Name</label>
              <input
                type="text"
                className="form-control bg-dark text-white border-0"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-white">Email</label>
              <input
                type="text"
                value={form.email}
                readOnly
                style={{
                  backgroundColor: "#2b2d33",
                  color: "white",
                  border: "1px solid #3b82f6",
                  padding: "10px",
                  borderRadius: "6px",
                  width: "100%",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              />
              <small style={{ color: "white" }}>
                You cannot change your email address.
              </small>
            </div>

            <button type="submit" className="btn btn-outline-light mt-2">
              Update Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
