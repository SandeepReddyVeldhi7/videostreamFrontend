import React from "react";
import { useVideos } from "../hooks/video.hook";
import { useSelector } from "react-redux";
import LoadingSpinner from "../pages/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast

const ChannelVideo = () => {
 // console.log("ChannelVideo component loaded");

  // Get the channel ID from the Redux state
  const channelId = useSelector((state) => state.channel?.channel?._id);
  //console.log("Channel ID:", channelId);

  if (!channelId) {
    console.warn("Channel ID is undefined");
    toast.error("No channel selected or channel ID not available."); // Toast for missing channel ID
    return <div>No channel selected or channel ID not available.</div>;
  }

  // Fetch videos using the useVideos hook
  const {
    data: channelVideosData,
    isFetching,
    isFetched,
    isError,
    error,
  } = useVideos({ userId: channelId });

  const navigate = useNavigate();
  console.log("Fetched videos data:", channelVideosData);
  console.log("Is Error:", isError, "Error Message:", error);

  const handleClick = (id) => {
    navigate(`/video/v/${id}`);
  };

  if (isFetching) return <LoadingSpinner />; // Show spinner while fetching

  if (isError) {
    toast.error(`Error fetching videos: ${error.message}`); // Error toast
    return <div>Error fetching videos: {error.message}</div>;
  }

  // Access the videos array from the data
  const videos = channelVideosData?.pages?.[0]?.data?.videos || [];

  // Show a success toast message when videos are successfully fetched
  if (isFetched && videos.length > 0) {
    toast.success("Videos loaded successfully!"); // Success toast
  }

  return (
    <div className="p-4">
      {isFetched && videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                onClick={() => handleClick(video._id)}
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-gray-500">{video.description}</p>
                <p className="text-sm text-gray-400">
                  Views: {video.views || "0"}
                </p>
                <p className="text-sm text-gray-400">
                  Duration: {(video.duration || 0).toFixed(2)} seconds
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No videos found for this channel.</div>
      )}
    </div>
  );
};

export default ChannelVideo;
