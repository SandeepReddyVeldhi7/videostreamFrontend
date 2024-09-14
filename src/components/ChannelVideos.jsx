import React from "react";
import { useSelector } from "react-redux";
import { useVideos } from "../hooks/video.hook";
import LoadingSpinner from "../pages/LoadingSpinner";

function ChannelVideos() {
  const channelId = useSelector((store) => store.auth?.user?._id);
  const {
    data: channelVideos,
    isFetching,
    isFetched,
  } = useVideos({ userId: channelId });

  
  if (isFetching) {
    return (
      <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
          {Array(8)
            .fill()
            .map((_, index) => (
              <LoadingSpinner key={index} />
            ))}
        </div>
      </div>
    );
  }

  if (
    isFetched &&
    (!channelVideos?.videos || channelVideos.videos.length === 0)
  ) {
    return (
      <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
        <p className="text-center text-gray-500">No videos found.</p>
      </div>
    );
  }

  return (
    <div className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
        {channelVideos.videos.map((video) => (
          <div
            key={video._id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{video.title}</h3>
              <p className="text-gray-600">{video.description}</p>
              <p className="text-sm text-gray-500">
                By: {video.owner.fullName} | Views: {video.views}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChannelVideos;
