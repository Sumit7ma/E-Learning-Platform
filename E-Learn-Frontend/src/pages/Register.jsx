import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = form;
    if (!name || !email || !password || !confirmPassword)
      return "All fields are required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email format.";
    if (password !== confirmPassword) return "Passwords do not match.";
    if (!/[a-zA-Z]/.test(password) || !/\d/.test(password) || !/@/.test(password) || password.length < 6)
      return "Password must contain letters, numbers, '@', and be at least 6 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);

    try {
      const res = await api.post("/auth/signup/student", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res?.data?.token) {
        setSuccess("Registered successfully!");
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError("Unexpected error occurred.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded" style={{ backgroundColor: "#121622", maxWidth: 400, width: "100%" }}>
          <h2 className="text-center mb-3">Join <span className="text-primary">Courso</span></h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <input type="text" name="name" className="form-control mb-3" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" className="form-control mb-3" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" className="form-control mb-3" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" className="form-control mb-3" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} required />

          <button type="submit" className="btn btn-primary w-100 mb-2">Join now</button>

          <div className="text-muted small text-center">
            Already have an account? <Link to="/login" className="text-info">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
