import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    setError(""); setMessage("");

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@]).{6,}$/;
    if (!regex.test(newPassword)) {
      setError("Password must include letters, digits, and @ symbol");
      return;
    }

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        newPassword,
      });
      setMessage(res.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleReset} className="shadow-lg p-4 rounded" style={{ backgroundColor: "#121622", maxWidth: 400, width: "100%" }}>
          <h2 className="text-center mb-3">Reset Password</h2>

          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <input type="password" className="form-control mb-3" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit" className="btn btn-success w-100 mb-2">Reset</button>

          <div className="text-muted small text-center">
            <Link to="/login" className="text-info">Back to login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
