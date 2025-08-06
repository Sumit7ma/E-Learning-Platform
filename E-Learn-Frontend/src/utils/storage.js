import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenPayload } from "../utils/storage";

export default function RoleRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    const payload = getTokenPayload(); 

    if (payload?.role === "ROLE_STUDENT") {
      navigate("/student/dashboard");
    } else if (payload?.role === "ROLE_INSTRUCTOR") {
      navigate("/instructor-dashboard");
    } else if (payload?.role === "ROLE_ADMIN") {
      navigate("/admin-dashboard"); 
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
}
