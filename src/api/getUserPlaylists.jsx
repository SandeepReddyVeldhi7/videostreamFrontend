import axios from "axios";
import { BASE_URL } from "../../constants";

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getUserPlaylists = async (userId) => {
  try {
    const response = await API.get(`/api/playlists/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching playlists"
    );
  }
};
