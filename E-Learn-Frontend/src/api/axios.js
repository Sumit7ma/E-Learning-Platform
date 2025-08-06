import axios from "axios";
import { getToken } from "../utils/storage"; 

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use(
  (config) => {
    const publicRoutes = [
      "/auth/signup/student",
      "/auth/signup/instructor",
      "/auth/login",
      "/auth/forgot-password",
      "/auth/reset-password",
    ];

    const url = config.url || "";
    const isPublic = publicRoutes.some((route) => url.includes(route));

    if (!isPublic) {
      const token = getToken?.();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
