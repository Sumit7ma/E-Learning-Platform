import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent.");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset email.");
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSend} className="shadow-lg p-4 rounded" style={{ backgroundColor: "#121622", maxWidth: 400, width: "100%" }}>
          <h2 className="text-center mb-3">Forgot Password</h2>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input type="email" className="form-control mb-3" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <button type="submit" className="btn btn-warning w-100 mb-2">Send Reset Link</button>

          <div className="text-muted small text-center">
            <Link to="/login" className="text-info">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
