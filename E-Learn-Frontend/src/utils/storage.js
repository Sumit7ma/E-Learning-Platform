import { jwtDecode } from "jwt-decode";

export const saveToken = (token) => {
  localStorage.setItem("courso_token", token);
};

export const getToken = () => {
  return localStorage.getItem("courso_token");
};

export const removeToken = () => {
  localStorage.removeItem("courso_token");
};

export const getTokenPayload = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};
