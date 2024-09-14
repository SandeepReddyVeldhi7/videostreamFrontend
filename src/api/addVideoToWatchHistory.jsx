import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
const addVideoToWatchHistory = async (videoId) => {
  try {
    const response = await API.post("/users/user-addHistory", { videoId });
    return response.data;
  } catch (error) {
    console.error("Failed to add video to watch history", error);
    throw error;
  }
};


export default addVideoToWatchHistory;
