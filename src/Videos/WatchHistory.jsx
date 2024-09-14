import React, { useEffect, useState } from "react";
import { getWatchHistory, clearWatchHistory } from "../api/user.api"; // Import your API functions
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const WatchHistory = () => {
  const [history, setHistory] = useState([]);
 const authStatus = useSelector((store) => store.auth.user);
 const navigate=useNavigate()
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
  
  // Fetch the watch history data on component mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getWatchHistory();
       // console.log("Watch history response:", response.data);
        setHistory(response?.data?.data); // Assuming response.data contains the watch history
      } catch (error) {
        console.error("Failed to fetch watch history", error);
      }
    };

    fetchHistory();
  }, []);

  // Function to handle clearing the watch history
  const handleClearHistory = async () => {
    try {
      await clearWatchHistory();
      setHistory([]); // Clear the local state after clearing the history
    } catch (error) {
      console.error("Failed to clear watch history", error);
    }
  };

  const handleClick = (video) => {
   navigate(`/video/v/${video}`);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Watch History</h2>

      {history?.length === 0 ? (
        <p className="text-gray-500">No videos in watch history.</p>
      ) : (
        <ul className="space-y-4">
          {history?.map((video) => (
            <li
              onClick={() => handleClick(video._id)}
              key={video._id}
              className="p-4 bg-white cursor-pointer rounded shadow flex items-center"
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-16 h-16 rounded mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">{video.title}</h3>
                <p className="text-sm text-gray-500">{video.description}</p>
                <p className="text-sm text-gray-500">
                  {video.owner?.fullName} {/* Render specific property */}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleClearHistory}
        className="mt-6 py-2 px-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
      >
        Clear Watch History
      </button>
    </div>
  );
};

export default WatchHistory;
