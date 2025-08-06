import React, { useEffect, useState } from "react";
import instructorAxios from "../../api/instructorAxios";
import Sidebar from "../../components/instructor/Sidebar";
import Topbar from "../../components/instructor/Topbar";
import "../../style/InstructorSettings.css";

export default function Setting() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    instructorAxios
      .get("/users/me")
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Failed to load user details.");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    instructorAxios
      .put("/users/me", { name })
      .then((res) => {
        setSuccessMsg("Name updated successfully.");
        setErrorMsg("");
      })
      .catch((err) => {
        console.error(err);
        setSuccessMsg("");
        setErrorMsg("Failed to update name.");
      });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Topbar title="Dashboard / Settings" />

        <div className="settings-card">
          <h2>Update Instructor Profile</h2>

          {successMsg && <div className="alert success">{successMsg}</div>}
          {errorMsg && <div className="alert error">{errorMsg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email (not editable)</label>
              <input type="email" value={email} readOnly disabled />
            </div>

            <div className="form-group">
              <label>Instructor Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="update-btn">
              Update Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
