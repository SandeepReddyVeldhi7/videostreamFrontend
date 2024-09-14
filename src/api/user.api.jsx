import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
 
});




 const getWatchHistory = async () => {
  try {
    const response  = await API.get(`/users/history`);
  //   console.log("response", response);
    return response;
   
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

 const clearWatchHistory = async () => {
  try {
    const response= await API.delete(
      `/users/clear-history`,
    );
    toast.success(response.data?.message);
    console.log("clearWatchHistory", response.data);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
};


const getUserChannelProfile = async (username) => {
  try {
    const { data } = await API.get(
      `users/c/${username}`
    );
  console.log("get",data)
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

const updateUserProfile = async (file) => {
  const formData = new FormData();
  if (file) {
    formData.append("avatar", file); // Ensure the field name matches the backend expectations
  }

  try {
    const response = await API.patch(
      `/users/avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const { data } = response;
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error || "Failed to update profile picture"
    );
    throw error?.response?.data?.error;
  }
};




 const updateUserCoverImage = async (data) => {
  const coverImageForm = new FormData();
  if (data) {
    coverImageForm.append("coverPhoto", data);
  }
  try {
    const { data } = await API.put("/users/coverPhoto", coverImageForm);
    toast.success(data?.message);
    return data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};

const updateAccountDetails = async (details) => {
  try {
    const response = await API.put(
      `/users/update-account`,
      details,
    );
   

    toast.success(response?.message);
    console.log(response.data)
    return response?.data;
  } catch (error) {
    toast.error(
      error?.response?.data?.error || "Failed to update account details"
    );
    throw error?.response?.data?.error;
  }
};





const toggleSubscription = async (channelId) => {
  try {
    console.log("channelId",channelId)
    const response = await API.post(`/subscription/c/${channelId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to toggle subscription", error);
    throw error;
  }
};

export default toggleSubscription;







export {
  updateUserProfile,
  updateUserCoverImage,
  getUserChannelProfile,
  clearWatchHistory,
  getWatchHistory,
  updateAccountDetails
}