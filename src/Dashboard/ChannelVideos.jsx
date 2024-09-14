import React, { useEffect, useState } from "react";
import { getChannelVideos } from "../api/dashboard.api"; // Adjust the path as needed
import LoadingSpinner from "../pages/LoadingSpinner"; // Import the LoadingSpinner component
import { useNavigate } from "react-router-dom";
import { deleteVideo } from "../api/video.api"; // Ensure this import is correct
import { toast } from "react-hot-toast"; // Assuming you are using react-toastify

const ChannelVideos = ({ onVideoDeleted  }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await getChannelVideos();
    //  console.log("Fetched videos:", response); // Debugging line
      setVideos(response); // Adjust based on the actual response format
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch channel videos");
      setLoading(false);
    }
  };

  const handleDelete = async (videoId) => {
    try {
      await deleteVideo(videoId);
      await fetchVideos(); // Refetch the videos to get the updated list
      toast.success("Video deleted successfully");
      onVideoDeleted();
    } catch (err) {
      setError("Failed to delete video");
      toast.error("Failed to delete video");
    }
  };

  const handleEdit = (videoId) => {
    navigate(`/edit-video/${videoId}`); // Navigate to the EditVideo page
  };
   const handleVideos = (videoId) => {
     navigate(`/video/v/${videoId}`);
   };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md cursor-pointer">
      <h2 className="text-xl font-bold mb-4">Channel Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos?.length > 0 ? (
          videos?.map((video) => (
            <div key={video._id} className="bg-white p-4 rounded-md shadow-md">
              <h1
                className="flex justify-end cursor-pointer"
                onClick={() => handleDelete(video._id)}
              >
                🗑️
              </h1>
              <h3 className="text-lg font-semibold">Title: {video.title}</h3>
              <p className="text-sm text-gray-600">
                Description: {video.description}
              </p>
              <p className="text-sm text-gray-500">Likes: {video.likesCount}</p>
              <p className="text-sm text-gray-500">
                Published: {video.isPublished ? "Yes" : "No"}
              </p>
              <p className="text-sm text-gray-500">
                Created At: {new Date(video.createdAt).toLocaleDateString()}
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => handleVideos(video._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(video._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No videos found</div>
        )}
      </div>
    </div>
  );
};

export default ChannelVideos;
