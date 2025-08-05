import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav
      style={{
        width: "100%",
        padding: "24px 0",
        background: "transparent",
        zIndex: 100,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <h1 className="m-0 fw-bold fs-2" style={{ color: "#3976f6", letterSpacing: "0.5px" }}>
          CoursoLearn
        </h1>

        <div className="d-flex gap-2">
          <Link
            to="/instructor-register"
            className={`btn btn-outline-primary fw-semibold ${pathname === "/instructor-register" ? "active" : ""}`}
          >
            Teach on Courso
          </Link>

          <Link
            to="/login"
            className={`btn btn-outline-light fw-semibold ${pathname === "/login" ? "active" : ""}`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className={`btn btn-primary fw-semibold ${pathname === "/register" ? "active" : ""}`}
          >
            Join now
          </Link>
        </div>
      </div>
    </nav>
  );
}
