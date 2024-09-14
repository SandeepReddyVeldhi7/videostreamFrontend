import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAllComments = async (videoId) => {
  try {
    const response = await API.get(`/comment/${videoId}`);
    console.log("e",response)
    return response.data; // Ensure this matches the API response structure
  } catch (error) {
    throw new Error("Failed to fetch comments");
  }
  
};


export const addComment = async (videoId, content) => {
  try {
    const response= await API.post(
      `/comment/${videoId}`,
      {
        content,
      },
      { withCredentials: true }
    );
    console.log("0",response.data)
    toast.success(response.data);
    return response.data;
  } catch (error) {
     console.error("Failed to add comment", error);
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

export const updateComment = async (commentId, content) => {
  try {
    const { data } = await API.put(`/comment/c/${commentId}`, {
      content,
    });

    toast.success(data?.message || "Comment updated successfully");
    return data?.data;
  } catch (error) {
    // Default to a generic error message if specific details are not available
    const errorMessage =
      error?.response?.data?.error || "Failed to update comment";
    toast.error(errorMessage);

    // Log the error for debugging purposes
    console.error("Error updating comment:", error);

    throw new Error(errorMessage); // Propagate the error with a meaningful message
  }
};


export const deleteComment = async (commentId) => {
  try {
    const { data } = await API.delete(`/comment/c/${commentId}`);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
