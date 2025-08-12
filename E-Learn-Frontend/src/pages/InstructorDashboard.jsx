import { useNavigate } from "react-router-dom";
import { removeToken } from "../utils/storage";

export default function InstructorDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="container text-center mt-5">
      <h2>👨‍🏫 Welcome, Instructor</h2>
      <p>You have successfully logged in as an instructor.</p>
      <button className="btn btn-danger mt-3" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
