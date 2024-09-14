import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../constants";



const API = axios.create({
    baseURL: BASE_URL,
    withCredentials:true
})



export const getVideos = async(
    page = 1,
    userId = null,
    sortBy = null,
  sortType = null,
  query = null, 
  limit = null
) => {
    
    try {
        const params = {};
  
        if (userId) params.userId = userId;
        if (sortBy) params.sortBy = sortBy;
        if (sortType) params.sortType = sortType;
        if (query) params.search = query;
        if (page) params.page = page;
        if (limit) params.limit = limit;
        
      
       // console.log("Request parameters:", params);
      
      const response = await API.get("/video/all/option", { params });

 //console.log("Full API response:", response);
         return response?.data
    } catch (error) {
         toast.error(error?.response?.data?.error);
         console.log(error);
         throw error?.response?.data?.error;
    }
}

export const getAllVideos = async () => {
  try {
    const { data } = await API.get("/video");
   // console.log(data);
    return data?.data;
    
  } catch (error) {
     toast.error(error?.response?.data?.error);
     console.log(error);
     throw error?.response?.data?.error;
  }
}

export const getVideoById = async (videoId) => {
 // console.log("Fetching video data for ID:", videoId);

  try {
       // console.log("Fetching video data for ID:", videoId);
    const { data } = await API.get(`/video/v/${videoId}`);
     //console.log("id",data);
     return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    console.log(error);
    throw error?.response?.data?.error;
  }
}


export const uploadVideo = async (data) => {
  const videoData = new FormData();

  videoData.append("title", data.title);
  videoData.append("description", data.description);
  videoData.append("thumbnail", data.thumbnail); // Ensure this is a File object
  videoData.append("videoFile", data.videoFile); // Ensure this is a File object

  try {
    const { data: response } = await API.post("/video/upload", videoData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(response?.message);
    console.log("Response:", response);
    return response?.data;
  } catch (error) {
    if (error?.response) {
      // Server responded with a status other than 2xx
      toast.error(error.response.data?.error || "An error occurred");
      console.error("Error Response:", error.response);
    } else if (error.request) {
      // Request was made but no response received
      toast.error("No response from the server. Please check the server.");
      console.error("Error Request:", error.request);
    } else {
      // Other errors
      toast.error("An unexpected error occurred.");
      console.error("Error:", error.message);
    }
    throw error;
  }
};

export  const handleSubscriptionToggle = async () => {
  try {
    const response = await API.post(
      `/c/${data.owner._id}`
    );
    setIsSubscribed(response.data.isSubscribed); // Update subscription state based on response
  } catch (error) {
    console.error("Failed to toggle subscription", error);
  }
};




export const togglePublishStatus = async (videoId) => {
    try {
            const { data } = await API.patch(
              `/video/toggle/publish/${videoId}`
            );
            toast.success(data?.message);
            return data?.d;
    } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error?.response?.data?.error;
    }
}


export const deleteVideo = async (videoId) => {
  try {
      const { data } = await API.delete(`/video/v/${videoId}`)
    toast.success(data?.message)
    console.log("delete",data)
          return data
  } catch (error) {
        console.log(error);
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
  }  


export const updateVideo = async (videoId, videoData) => {
  try {
    const response = await API.put(`video/v/${videoId}`, videoData);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update video: ${error.message}`);
  }
};

  export const getNextVideos = async (videoId) => {
    try {
      const { data } = await API.get(`/video/next/${videoId}`);
      return data?.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error?.response?.data?.error;
    }
};
  

export const updateVideoViews = async (videoId) => {
  try {
    const data  = await API.put(`/video/update/views/${videoId}`);
    return data?.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error?.response?.data?.error;
  }
};
