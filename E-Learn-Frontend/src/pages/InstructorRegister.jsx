import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function InstructorRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); setSuccess("");
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword)
      return "All fields are required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/@/.test(password) || password.length < 6)
      return "Password must include letters, numbers, '@', and be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const err = validate();
  if (err) {
    setError(err);
    setSuccess("");
    return;
  }

  try {
    const res = await api.post("/auth/signup/instructor", {
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (res.status === 201) {
      setSuccess("Registration successful! Check your email.");
      setError(""); 
      setTimeout(() => navigate("/login"), 2000);
    }
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed.");
    setSuccess(""); 
  }
};


  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded" style={{ backgroundColor: "#121622", maxWidth: 420, width: "100%" }}>
          <h2 className="text-center mb-3">Instructor <span className="text-primary">Signup</span></h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <input type="text" name="name" className="form-control mb-3" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" className="form-control mb-3" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>

          <div className="text-muted small text-center">
            Already have an account? <Link to="/login" className="text-info">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
