import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { saveToken } from "../utils/storage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Submitting Login:", { email, password });

    try {
      const res = await api.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      if (res.data && res.data.token) {
        saveToken(res.data.token); 

        localStorage.setItem("courso_user", JSON.stringify(res.data));

        navigate("/dashboard");
      } else {
        setError("Login failed! Invalid response from server.");
      }
    } catch (err) {
      console.error("Login Error:", err?.response?.data);
      setError(err.response?.data?.message || "Invalid email or password!");
    }
  };

  return (
    <div className="bg-dark text-white min-vh-100">
      <Navbar />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "90vh" }}>
        <form
          onSubmit={handleLogin}
          className="shadow-lg p-4 rounded"
          style={{ backgroundColor: "#121622", maxWidth: 400, width: "100%" }}
        >
          <h2 className="text-center mb-3">
            Login to <span className="text-primary">Courso</span>
          </h2>

          {error && <div className="alert alert-danger">{error}</div>}

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>

          <div className="text-muted small text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-info">
              Register
            </Link>
            <br />
            <Link to="/forgot-password" className="text-info">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
