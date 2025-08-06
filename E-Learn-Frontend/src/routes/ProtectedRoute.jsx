import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/storage";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = getToken();

  if (!token) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    return children;
  } catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
}
