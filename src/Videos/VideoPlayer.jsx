import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useVideoById,
  useNextVideos,
  useUpdateVideoViews,
} from "../hooks/video.hook";
import { AiOutlineLike } from "react-icons/ai";
import { useLike } from "../hooks/like.hook";
import addVideoToWatchHistory from "../api/addVideoToWatchHistory";
import toggleSubscription from "../api/user.api";
import useComments from "../hooks/useComments"; // Import the new hook
import LoadingSpinner from "../pages/LoadingSpinner";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Shimmer from "../Shimmer/Shimmer";
import NextShimmer from "../Shimmer/NextShimmer";

const VideoPlayer = () => {
     const user = useSelector((state) => state.auth.user)
  const { videoId } = useParams();
  const navigate = useNavigate();
  const videoSectionRef = useRef(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [like, setLike] = useState(false);

  const {
    comments,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDeleteComment,
    handleUpdateComment,
    comment,
    editComment,
    toggleShow,
    handleClickShow,
  } = useComments(videoId);

  //console.log("Comment data structure:", comments); // Debugging line

  const { data, isLoading, isError, refetch } = useVideoById(videoId);
  const { mutateAsync: updateViews } = useUpdateVideoViews();
  const {
    data: nextVideosData,
    isLoading: isNextVideosLoading,
    isError: isNextVideosError,
  } = useNextVideos(videoId);

  const likeVideoMutation = useLike("video");
  const authStatus = useSelector((store) => store.auth.user);

const handleNavigation = () => {
  if (authStatus) {
  
    navigate(`/channel/${data?.owner?.username}`);
  } else {

    toast.error("Please login");
  }
};


  
  useEffect(() => {
    if (videoId) {
      refetch();
      if (videoSectionRef.current) {
        videoSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
      if (authStatus) {
        addVideoToWatchHistory(videoId);
        updateViews(videoId);
        
      } 
    }
    if (data?.isLiked !== undefined) {
      setLike(data.isLiked);
    }
  }, [videoId, refetch, data?.isLiked, authStatus]);

  const handleThumbnailClick = (nextVideoId) => {
    navigate(`/video/v/${nextVideoId}`);
  };

  const handleLike = async () => {
    if (!authStatus) {
      toast.error("Please log in to subscribe.");
      return;
    }
    try {
      await likeVideoMutation.mutateAsync(videoId);
      setLike(!like);
    } catch (error) {
      console.error("Failed to like video", error);
    }
  };

  const handleSubscription = async () => {
    if (!authStatus) {
      toast.error("Please log in to like videos.");
      return;
    }
    try {
      console.log(data.owner._id);
      const response = await toggleSubscription(data?.owner?._id);
      setIsSubscribed(response.data.isSubscribed);
    } catch (error) {
      console.error("Failed to toggle subscription", error);
    }
  };

  const formatDateToIndianTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isNextVideosLoading) {
    // Show multiple shimmer elements while loading
    return (
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <NextShimmer key={index} />
        ))}
      </div>
    );
  }
  if (isError) return <div>Error loading video</div>;

 return (
   <div className="sm:w-full    w-[100%]   sm:mx-0 lg:flex lg:flex-row border solid-6px lg:space-x-4 p-4">
     {/* Video Player Section */}
     <div className=" w-full lg:w-3/4 border bordr" ref={videoSectionRef}>
       <div className="w-full">
         <video
           key={videoId}
           className="w-full   sm:w-full sm:h-[27rem] lg:w-[946px] lg:h-[757px] h-auto shadow-lg"
           controls
           autoPlay
         >
           <source src={data?.url} type="video/mp4" />
           Your browser does not support the video tag.
         </video>
       </div>
       <h1 className="text-2xl sm:text-3xl font-bold shadow-lg mx-4 ">
         {" "}
         🔥{data?.title}{" "}
       </h1>

       {/* Video Meta Data */}
       <div className="flex items-center justify-between p-2 bg-black text-white">
         <div
           onClick={handleNavigation}
           className="flex items-center space-x-4"
         >
           <img
             className="w-10 h-10 rounded-full"
             src={data?.owner?.avatar}
             alt="Owner Avatar"
           />
           <div>
             <h2 className="font-bold">{data?.owner?.username}</h2>
             <p>{data?.views} views</p>
           </div>
         </div>
         <button
           className={`px-4 py-2 rounded ${
             isSubscribed ? "bg-green-500" : "bg-blue-500"
           }`}
           onClick={handleSubscription}
         >
           {isSubscribed ? "Subscribed" : "Subscribe"}
         </button>
         <div className="flex space-x-4">
           <div
             className="flex items-center p-1 bg-white text-black rounded cursor-pointer"
             onClick={handleLike}
           >
             <span>{data?.likesCount || 0}</span>
             <AiOutlineLike className={`${like ? "" : "text-blue-500"}`} />
           </div>
         </div>
       </div>

       {/* Comments Section */}
       <div className="mt-4 mx-2">
         <div>
           <input
             type="text"
             value={comment}
             onChange={handleChange}
             placeholder="Add a comment"
             className="border rounded p-1 w-full"
           />
           <button
             onClick={
               editComment
                 ? () => handleUpdateComment(editComment) // Handle update if editing
                 : handleSubmit // Handle add comment if not editing
             }
             className="bg-blue-500 mt-2 p-2 text-white rounded"
           >
             {editComment ? "Update Comment" : "Add Comment"}
           </button>

           <button
             className="lg:mx-[700px]  mr-15 ml-[18.5rem]"
             value={toggleShow}
             onClick={handleClickShow}
           >
             {toggleShow ? "⬆️" : "⬇️"}
           </button>
         </div>
         {toggleShow && (
           <>
             {comments?.length === 0 ? (
               <p>No comments yet</p>
             ) : (
               comments?.map((comment) => (
                 <div key={comment?._id} className="mt-4 border  solid-3px">
                   <div className="flex ">
                     <img
                       className="w-10 h-10 rounded-full"
                       src={comment?.owner?.avatar}
                     />

                     <p className="mx-3 my-2 font-semibold">
                       {comment?.content}
                     </p>
                   </div>
                   <p className="text-lg my-2 text-gray-500">
                     {comment?.owner?.username} •{" "}
                     {formatDateToIndianTime(comment?.createdAt)}
                   </p>

                   {/* Show Edit and Delete buttons only to the comment owner */}
                   {authStatus && authStatus._id === comment?.owner?._id && (
                     <div className="flex justify-end">
                       {editComment === comment?._id ? (
                         <>
                           <button
                             onClick={() => handleUpdateComment(editComment)}
                             className="bg-blue-500 mt-2 p-2 text-white rounded"
                           >
                             Update Comment
                           </button>

                           <button
                             onClick={() => setEditComment(null)} // Cancel editing
                             className="bg-gray-500 p-2 ml-2 rounded text-white"
                           >
                             Cancel
                           </button>
                         </>
                       ) : (
                         <>
                           <button
                             onClick={() => handleEdit(comment)}
                             className="bg-blue-500 p-2 rounded text-white"
                           >
                             Edit
                           </button>
                           <button
                             onClick={() => handleDeleteComment(comment._id)}
                             className="bg-red-500 p-2 ml-2 rounded text-white"
                           >
                             Delete
                           </button>
                         </>
                       )}
                     </div>
                   )}
                 </div>
               ))
             )}
           </>
         )}
       </div>
     </div>

     {/* Suggested Videos Section */}
     <div className="lg:w-1/4 mt-6 lg:mt-0 lg:h-screen lg:overflow-y-auto border lg:bg-black">
       {isNextVideosLoading ? (
         <div>Loading suggested videos...</div>
       ) : isNextVideosError ? (
         <div>Error loading suggested videos</div>
       ) : (
         <div className="space-y-4">
           {nextVideosData?.map((video) => (
             <div
               key={video._id}
               className="flex items-start cursor-pointer shadow-xl my-2"
               onClick={() => handleThumbnailClick(video._id)}
             >
               <img
                 className="w-32 h-26 object-cover rounded"
                 src={video?.thumbnail}
                 alt={video?.title}
               />
               <div className="ml-4">
                 <h2 className="font-bold">{video?.title}</h2>
                 <p className="text-black lg:text-white">
                   {video?.ownerDetails?.username}
                 </p>
                 <p className="text-sm text-black lg:text-white">
                   {video?.views} views
                 </p>
               </div>
             </div>
           ))}
         </div>
       )}
     </div>
   </div>
 );
};
export default VideoPlayer