import React, { useEffect, useRef, useCallback, useState } from "react";
import { useVideos } from "../hooks/video.hook";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NextShimmer from "../Shimmer/NextShimmer";

const Home = () => {
  const searchQuery = useSelector((state) => state.search.query);
  const observerRef = useRef(); // Ref to track the observer
  const [isSearching, setIsSearching] = useState(false); // State to manage search loading

  const {
    data, // The data returned from the API
    fetchNextPage, // Function to fetch the next page of data
    hasNextPage, // Boolean indicating if there's more data to load
    isLoading, // Loading state for the initial load
    isError,
    error,
    isFetchingNextPage, // Loading state for fetching the next page
  } = useVideos({
    sortBy: "createdAt",
    sortType: "desc",
    query: searchQuery,
    page: 1,
    limit: 20,
    onFetching: setIsSearching, // Set isSearching based on fetching status
  });

  const navigate = useNavigate();

  // Observer callback for infinite scrolling
  const lastVideoRef = useCallback(
    (node) => {
      if (isLoading || isSearching) return; // Don't observe if loading or searching
      if (observerRef.current) observerRef.current.disconnect(); // Disconnect the previous observer

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage(); // Fetch the next page when intersecting
        }
      });

      if (node) observerRef.current.observe(node); // Start observing the last video element
    },
    [isLoading, isSearching, fetchNextPage, hasNextPage]
  );

  if ((isLoading && !data) || isSearching) {
    // Show multiple shimmer elements while loading or searching
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <NextShimmer key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    const errorMessage = error?.message || "An unknown error occurred.";
    return <div>Error: {errorMessage}</div>;
  }

  // Check if there are no videos returned
  const noVideosFound =
    !isLoading &&
    !isSearching &&
    (!data || data.pages[0].data.videos.length === 0);

  if (noVideosFound) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 font-bold">No videos found.</p>
      </div>
    );
  }
  const handleThumbnailClick = (videoId) => {
    navigate(`/video/v/${videoId}`);
  };

  return (
    <div className={`hide-scrollbar`}>
      <div className="flex flex-wrap items-center justify-center sm:justify-start mx-1 -z-50 absolute my-4">
        {data?.pages?.map((page, pageIndex) =>
          page?.data?.videos?.map((video, videoIndex) => {
            const isLastVideo =
              pageIndex === data.pages.length - 1 &&
              videoIndex === page.data.videos.length - 1;

            return (
              <div
                key={video._id}
                ref={isLastVideo ? lastVideoRef : null} // Attach observer to the last video
                className="w-screen mx-4 my-2 sm:w-1/2 md:w-1/3 lg:w-[27%] p-2 "
              >
                <div className="bg-violet-400 rounded-lg overflow-hidden shadow-md ">
                  <img
                    className="w-90    h-60 sm:h-56 md:h-64 object-cover cursor-pointer"
                    src={video.thumbnail}
                    alt={video.title}
                    onClick={() => handleThumbnailClick(video._id)}
                    onError={(e) => {
                      e.target.onerror = null; // Prevents looping
                      e.target.src = "path/to/placeholder-image.jpg"; // Fallback image
                    }}
                  />
                  <div className="p-4 flex">
                    <img
                      className="w-10 h-10 rounded-full mr-3"
                      src={video.owner?.avatar}
                      alt={video.owner?.fullName}
                    />
                    <div>
                      <h4 className="text-black font-bold text-sm sm:text-base mb-1">
                        {video.title}
                      </h4>
                      <p className="text-black text-xs sm:text-sm">
                        {video.owner?.fullName}
                      </p>
                      <p className="text-black text-xs sm:text-sm">
                        {video.views} views •{" "}
                        {new Date(video.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {isFetchingNextPage && (
        <div className="flex justify-center mt-4">
          <p className="bg-red-600 font-bold">Loading more videos...</p>{" "}
          {/* Loading indicator while fetching */}
        </div>
      )}
    </div>
  );
};

export default Home;
