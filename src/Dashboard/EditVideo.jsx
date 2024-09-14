import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getVideoById, updateVideo } from "../api/video.api";
import LoadingSpinner from "../pages/LoadingSpinner";

const EditVideo = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null); // State for thumbnail
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      if (videoId) {
        try {
          const videoData = await getVideoById(videoId);
          setVideo(videoData);
          setTitle(videoData.title);
          setDescription(videoData.description);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch video details");
          setLoading(false);
        }
      } else {
        setError("Invalid video ID");
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const handleSave = async () => {
    const formData = new FormData(); // Create FormData to handle file upload
    formData.append("title", title);
    formData.append("description", description);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail); // Append thumbnail if it exists
    }

    try {
      await updateVideo(videoId, formData); // Send FormData
      navigate("/user-Dashboard");
    } catch (err) {
      setError("Failed to update video");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Video</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Thumbnail</label>
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])} // Update state with selected file
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-500 text-white rounded-md"
      >
        Update
      </button>
    </div>
  );
};

export default EditVideo;
