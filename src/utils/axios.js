import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
});

export const loginApi = (body) => {
  return axiosInstance.post("/users/login", body);
};
export const getMe = () => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.log("ko co access token");
    return;
  }
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axiosInstance.get("/users/me");
};
export const apiGetUserProfile = (username) => {
  return axiosInstance.get(`/users/${username}`);
};

export const getConversations = (receiver_id) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.log("ko co access token");
    return;
  }
  axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
  return axiosInstance.get(`conversations/receivers/${receiver_id}`);
};
