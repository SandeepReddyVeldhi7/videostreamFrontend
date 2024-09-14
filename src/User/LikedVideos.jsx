import React from "react";
import { useLikedVideos } from "../hooks/like.hook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import NextShimmer from "../Shimmer/NextShimmer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const LikedVideos = () => {
  const authStatus = useSelector((store) => store.auth.user);
  const navigate = useNavigate();

  // Always call the hook, but handle the data conditionally
  const { data, isLoading, isError } = useLikedVideos({
    enabled: Boolean(authStatus), // Only enable the query if the user is authenticated
  });

  const handleClick = (videoId) => {
    navigate(`/video/v/${videoId}`);
  };
  

    useEffect(() => {
      if (!authStatus) {
        toast.error("Please login");
      }
    }, [authStatus]);
  
  
  
  if (!authStatus) {
    return null; // Do not render the component if the user is not authenticated
  }

  if (isLoading) return <NextShimmer/>;
 if (isError) return <p className="mx-10 bg-red-500">Error loading videos</p>;

  

  return (
    <div className=" lg:mx-80 lg:my-52 flex flex-col items-center">
      <h1 className="font-bold text-xl">Liked Videos</h1>
      {data && data.length > 0 ? (
        <ul className="">
          {data.map((item, index) => {
            const video = item.likedVideo; // Accessing likedVideo here
            return (
              <li
                key={index}
                className="flex flex-col lg:flex-row items-center lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4"
              >
                <div className="w-full lg:w-full lg:h-60 ">
                  <img
                    onClick={() => handleClick(video?._id)}
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-80 object-cover cursor-pointer  border border-black"
                  />
                  <div className="text-center my-2 ">
                    <h2 className="font-semibold ">{video.title}</h2>
                    <p className="font-semibold">{video.description}</p>
                    <p>Duration: {video.duration} seconds</p>
                    <p>Views: {video.views}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="">
          <p>No liked videos found</p>
        </div>
      )}
    </div>
  );
};

export default LikedVideos;
