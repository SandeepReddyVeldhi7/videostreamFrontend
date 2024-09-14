import React, { useState, useRef } from "react";
import { uploadVideo } from "../api/video.api"; // Adjust the import path
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LoadingSpinner from "../pages/LoadingSpinner";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.user);

  if (!authStatus) {
    return (
      <div className=" flex justify-center items-center my-28 mx-20 bg-green-100 h-40 w-88">
        <span className="p-1 font-semibold">
          Please log in to view liked videos.
        </span>
        <Link
          to="/login"
          className="hover:text-blue-400 cursor-pointer text-xl font-bold"
        >
          Login
        </Link>
      </div>
    );
  }

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !description || !thumbnail || !videoFile) {
      toast.error("All fields are required");
      return;
    }

    setIsLoading(true); // Set loading state to true

    try {
      const response = await uploadVideo({
        title,
        description,
        thumbnail,
        videoFile,
      });
      toast.success("Video uploaded successfully");
     console.log("Uploaded Video Data:", response);
      navigate("/");
    } catch (error) {
      toast.error("Error uploading video");
     // console.error("Upload Error:", error);
    } finally {
      setIsLoading(false); // Reset loading state to false
    }
  };

  return (
    <div className=" relative container mx-auto p-4">
      {isLoading && <LoadingSpinner />}
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl mx-auto space-y-6"
      >
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Upload Your Video
        </h1>
        <div>
          <label className="block text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-white">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-white">Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            ref={thumbnailInputRef}
            className="w-full text-gray-500 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none"
          />
          {thumbnailPreview && (
            <div className="relative mt-4 w-64 h-36">
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="object-cover rounded-lg w-88 h-48"
              />
              <button
                type="button"
                onClick={handleRemoveThumbnail}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            Video File
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            ref={videoInputRef}
            className="w-full text-gray-500 px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:outline-none"
          />
          {videoPreview && (
            <div className="relative mt-4 w-full max-w-lg">
              <video
                controls
                src={videoPreview}
                className="rounded-lg w-80 h-44"
              />
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          className={`${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          } text-white font-semibold px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Uploading..." : "Upload Video"}{" "}
          {/*{isLoading ? <LoadingSpinner /> : "Upload Video"}*/}
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
