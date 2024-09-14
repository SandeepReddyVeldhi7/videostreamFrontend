import React, { useCallback, useEffect, useState } from "react";
import { getChannelStats } from "../api/dashboard.api"; // Adjust the path as needed
import LoadingSpinner from "../pages/LoadingSpinner";
import ChannelVideos from "./ChannelVideos";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast

const ChannelStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const authStatus = useSelector((store) => store.auth.user);

  if (!authStatus) {
    return (
      <div className="flex justify-center items-center my-28 mx-20 bg-green-100 h-40 w-88">
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

  const fetchStats = useCallback(async () => {
    try {
      const data = await getChannelStats();
      console.log("data", data);
      setStats(data); // Assuming the response data is in 'data.data'
      setLoading(false);
      toast.success("Channel statistics loaded successfully!"); // Success toast
    } catch (err) {
      setError("Failed to fetch channel statistics");
      setLoading(false);
      toast.error("Failed to fetch channel statistics. Please try again."); // Error toast
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-md mx-8 my-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Channel Statistics</h2>
        <Link
          to="/user-Upload"
          className="text-xl font-bold hover:text-white mb-4 bg-pink-500 p-1 rounded"
        >
          UploadVideos
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Subscribers</h3>
          <p className="text-2xl font-bold">{stats?.totalSubscribers}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Likes</h3>
          <p className="text-2xl font-bold">{stats?.totalLikes}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Views</h3>
          <p className="text-2xl font-bold">{stats?.totalViews}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold">Total Videos</h3>
          <p className="text-2xl font-bold">{stats?.totalVideos}</p>
        </div>
      </div>
      <ChannelVideos onVideoDeleted={fetchStats} />
    </div>
  );
};

export default ChannelStats;
