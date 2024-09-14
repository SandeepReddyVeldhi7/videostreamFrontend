import React, { useEffect, useState } from "react";
import { NavLink, useParams, Outlet, Link } from "react-router-dom";
import { getUserChannelProfile } from "../api/user.api";
import { toggleSubscribe } from "../api/subscription.api";
import LoadingSpinner from "../pages/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { setChannel } from "../features/channelSlice";
import { toast } from "react-hot-toast"; // Import toast

const MyChannel = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const authStatus = useSelector((store) => store.auth.user);
console.log(userData);
  useEffect(() => {
    const fetchUserChannel = async () => {
      setIsLoading(true);
      try {
        const response = await getUserChannelProfile(username);
        setUserData(response);
        
        dispatch(setChannel(response));
        setIsLoading(false);
        toast.success("Channel data loaded successfully!"); // Success toast
      } catch (error) {
        console.error("Failed to fetch user channel", error);
        setIsError(true);
        setIsLoading(false);
        toast.error("Failed to fetch user channel. Please try again."); // Error toast
      }
    };

    if (username) {
      fetchUserChannel();
    }
  }, [username, dispatch]);

  const handleSubscribeToggle = async () => {
    try {
      await toggleSubscribe(userData?._id);
      setUserData((prevData) => ({
        ...prevData,
        isSubscribed: !prevData?.isSubscribed,
        subscribersCount: prevData.isSubscribed
          ? prevData.subscribersCount - 1
          : prevData.subscribersCount + 1,
      }));
      toast.success(
        userData?.isSubscribed
          ? "Unsubscribed successfully!"
          : "Subscribed successfully!"
      ); // Success toast
    } catch (error) {
      console.error("Failed to toggle subscription", error);
      toast.error("Failed to toggle subscription. Please try again."); // Error toast
    }
  };

  if (!authStatus) {
    toast.error("Please log in to view liked videos."); // Error toast for not logged-in users
    return (
      <div className=" flex justify-center items-center bg-green-100 h-screen">
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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error fetching channel data.</div>;

  return (
    <div className="p-4 mx-20">
      {/* User Avatar and Details */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={userData?.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{userData?.username}</h1>
          <p className="text-gray-600">{userData?.email}</p>
          <p className="text-sm text-gray-500">
            Full Name: {userData?.fullName}
          </p>
        </div>
      </div>

      {/* User Statistics */}
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-lg font-semibold">Subscribers</p>
            <p>{userData?.subscribersCount}</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Channels Subscribed</p>
            <p>{userData?.channelsSubscribedToCount}</p>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mt-4">
          <button
            onClick={handleSubscribeToggle}
            className={`${
              userData?.isSubscribed ? "bg-green-500" : "bg-blue-500"
            } text-white px-4 py-2 rounded`}
          >
            {userData?.isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-20 mx-6">
        <NavLink
          to={`/channel/${username}/videos`}
          className={({ isActive }) =>
            `font-bold hover:text-pink-400 p-1 rounded ${
              isActive ? "border-b-4 border-red-500" : ""
            }`
          }
        >
          Videos
        </NavLink>
        <NavLink
          to={`/channel/${username}/subscribers`}
          className={({ isActive }) =>
            `font-bold hover:text-pink-400 ${
              isActive ? "border-b-4 border-red-500" : ""
            }`
          }
        >
          Subscribers
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default MyChannel;
