import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL, // Fixed baseURL key
  withCredentials: true,
});

// Axios interceptor to include JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);





const handleAPIError = (error) => {
  const errorMessage =
    error?.response?.data?.error || "An unexpected error occurred";
  toast.error(errorMessage);
  throw new Error(errorMessage);
};

export const login = async (formData) => {
  try {
    const { data } = await API.post("/users/login", formData, {
      withCredentials: true,
    });
    toast.success(data?.message || "Login successful");
    return data?.data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const logout = async () => {
  try {
    const { data } = await API.post("/users/logout");
    toast.success(data?.message);
    return data;
  } catch (error) {
    handleAPIError(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await API.get("/users/current-user");
    console.log("data",data?.data)
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

export const refreshAccessToken = async () => {
  console.log("Refreshing access token...");
  try {
    const { data } = await API.post("/users/refresh-token");
    return data?.data;                   
  } catch (error) {
    handleAPIError(error);
  }
};
