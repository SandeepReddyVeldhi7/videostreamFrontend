import React, { useEffect, useRef } from "react";
import { useCurrentUser } from "../hooks/auth.hook";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateUserCoverImage } from "../api/user.api"; // Adjust the import path accordingly
import LoadingSpinner from "../pages/LoadingSpinner";

const Settings = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((store) => store.auth.user);
  const { data, isError, isLoading, refetch } = useCurrentUser({
    enabled: !!authStatus, // Only fetch when user is logged in
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (authStatus) {
      refetch(); // Refetch user data whenever the component mounts or authStatus changes
    }
  }, [authStatus, refetch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center my-24">
        Error loading user data. Please{" "}
        <Link to="/login" className="font-bold">
          login
        </Link>
      </div>
    );
  }

  const userData = data;
  const { username, email, fullName, avatar, coverPhoto } = userData || {};

  if (!authStatus) {
    return (
      <div className="flex flex-col justify-center items-center bg-green-100 h-screen">
        <span className="p-1 font-semibold text-center">
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

  const handleEditClick = () => {
    navigate("/user-edit", { state: { user: userData } });
  };

  const handleCoverImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Click the file input element
    }
  };

  const handleCoverImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return; // If no file is selected, do nothing

    try {
      await updateUserCoverImage(file);
      refetch();
      toast.success("Cover image updated successfully!");
    } catch (error) {
      console.error("Failed to update cover image:", error);
      toast.error("Failed to update cover image. Please try again.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-100">
      {/* Cover Photo Section */}
      <div className="relative w-full">
        <div className="w-full h-72 sm:h-80 bg-gray-200">
          <img
            className="w-full h-full object-cover rounded-b-lg"
            src={coverPhoto}
            alt={`${username}'s cover`}
          />
        </div>
        <button
          onClick={handleCoverImageClick}
          className="absolute top-4 right-4 bg-black text-white p-2 rounded-full shadow-md"
        >
          ✍️ Change Cover
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }} // Hide the file input element
          onChange={handleCoverImageChange}
        />
      </div>

      {/* Profile Section */}
      <div className="relative w-full px-4 sm:px-10 flex flex-col sm:flex-row items-center mt-[-64px]">
        {/* Profile Image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white border-4 border-gray-100 rounded-full shadow-lg overflow-hidden z-10">
          <img
            className="w-full h-full object-cover"
            src={avatar}
            alt={`${username}'s avatar`}
          />
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left mt-4 sm:mt-[5.5rem] sm:ml-8 flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {username}
          </h1>
          <p className="text-lg text-gray-600">{fullName}</p>
          <p className="text-md text-gray-500">{email}</p>

          {/* Edit Profile Button */}
          <button
            className="mt-4 sm:mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg"
            onClick={handleEditClick}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
