import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getChannelStats = async () => {
  try {
    const { data } = await API.get("/dashboard/stats");
    return data.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getChannelVideos = async () => {
  try {
    const { data } = await API.get("/dashboard/videos");
   console.log("videos",data)
    return data.data;
  } catch (error) {
    console.log("fail")
    toast.error(error.response.data.message);
  }
};

export const getChannelAbouts = async () => {
  try {
    const { data } = await API.get("/dashboard/about");
    console.log(data.data);
    return data.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};




export const getChannelSubscribers = async (channelId) => {
  try {
    const response = await API.get(`/subscription/c/${channelId}`);
    console.log("response",response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch subscribers", error);
    throw error;
  }
};
