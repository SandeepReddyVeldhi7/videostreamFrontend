import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { updateAccountDetails, updateUserProfile } from "../api/user.api"; // Adjust import paths as needed

const EditProfile = () => {
  console.log("hello");
  const location = useLocation();
  const { user } = location.state || {};
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");

  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    if (!fullName || !email) {
      console.log("all fields required");
      toast.error("Full Name and Email are required.");
      return;
    }

    try {
      await updateAccountDetails({ fullName, email });

      toast.success("Profile updated successfully");
      navigate("/user-details");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleProfileUpdate} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-lg">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
