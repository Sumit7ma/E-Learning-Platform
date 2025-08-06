import axios from "axios";

const instructorAxios = axios.create({
  baseURL: "http://localhost:8080/api",
});

instructorAxios.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("courso_user"));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default instructorAxios;
