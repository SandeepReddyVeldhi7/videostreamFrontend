import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL, // Fixed baseURL key
  withCredentials: true,
});

// Request Interceptor to add token to headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request Config:", config); // Debugging line to check config
    return config;
  },
  (error) => {
    console.error("Request Error:", error); // Log request errors
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token expiration
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await API.post("/users/refresh-token");
        if (data?.data?.accessToken) {
          localStorage.setItem("token", data.data.accessToken);
          API.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.data.accessToken}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh Token Error:", refreshError);
        // Handle refresh token failure (e.g., redirect to login)
        window.location.href = "/login"; // Example redirect
      }
    }
    return Promise.reject(error);
  }
);

const handleAPIError = (error) => {
  const errorMessage =
    error?.response?.data?.error || "An unexpected error occurred";
  console.error("API Error:", error); // Log the full error
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

export const login = async (formData) => {
  try {
    const { data } = await API.post("/users/login", formData);
    toast.success(data?.message || "Login successful");
    if (data?.data?.accessToken) {
      localStorage.setItem("token", data.data.accessToken);
    }
    return data?.data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    toast.success(data?.message);
    localStorage.removeItem("token"); // Clear token on logout
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    console.log("Current User Data:", data?.data);
    return data?.data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const registerUser = async (data) => {
  const formData = new FormData();
  if (!data.avatar) {
    toast.error("Avatar is required");
    return;
  }

  formData.append("avatar", data.avatar);
  if (data.coverPhoto) formData.append("coverPhoto", data.coverPhoto);
  formData.append("username", data.username);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("fullName", data.fullName);

  try {
    const { data } = await API.post("/users/register", formData);
    toast.success("Registration successful");
    return data?.data;
  } catch (error) {
    toast.error(error.message || "Registration failed");
  }
};

export const changePassword = async (newPassData) => {
  try {
    const { data } = await API.post("/users/change-password", newPassData);
    toast.success(data?.message);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};
