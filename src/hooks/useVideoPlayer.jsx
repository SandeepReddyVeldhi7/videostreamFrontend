import { useEffect, useState } from "react";
import {
  useVideoById,
  useUpdateVideoViews,
  useNextVideos,
} from "../hooks/video.hook";
import {
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
} from "../api/comment.api";
import addVideoToWatchHistory from "../api/addVideoToWatchHistory";

export const useVideoPlayer = (videoId) => {
    
  const [comments, setComments] = useState([]);
  const [like, setLike] = useState(false);
  const [editComment, setEditComment] = useState(null);
  const [comment, setComment] = useState("");
  const [toggleShow, setToggleShow] = useState(false);

  const { data, isLoading, isError, refetch } = useVideoById(videoId);
  const { mutateAsync: updateViews } = useUpdateVideoViews();
  const {
    data: nextVideosData,
    isLoading: isNextVideosLoading,
    isError: isNextVideosError,
  } = useNextVideos(videoId);

  useEffect(() => {
    if (videoId) {
      refetch();
      addVideoToWatchHistory(videoId);
      updateViews(videoId);

      const fetchComments = async () => {
        try {
          const response = await getAllComments(videoId);
          const fetchedComments = response?.data?.docs || [];
          setComments(Array.isArray(fetchedComments) ? fetchedComments : []);
        } catch (error) {
          console.error("Failed to fetch comments", error);
        }
      };
      fetchComments();
    }
  }, [videoId, refetch, updateViews]);

  const handleCommentChange = (e) => setComment(e.target.value);

  const handleSubmitComment = async () => {
    if (!comment) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      await addComment(videoId, comment);
      setComment("");
      toast.success("Comment added successfully");
      const response = await getAllComments(videoId);
      setComments(response?.data?.docs || []);
    } catch (error) {
      console.error("Failed to add comment", error);
      toast.error(error.message);
    }
  };

  const handleEditComment = async () => {
    try {
      await updateComment(editComment, comment);
      setEditComment(null);
      setComment("");
      toast.success("Comment updated successfully");
      const response = await getAllComments(videoId);
      setComments(response?.data?.docs || []);
    } catch (error) {
      console.error("Failed to update comment", error);
      toast.error("Error updating comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      toast.success("Comment deleted successfully");
      const response = await getAllComments(videoId);
      setComments(response?.data?.docs || []);
    } catch (error) {
      console.error("Failed to delete comment", error);
      toast.error("Error deleting comment");
    }
  };

  const handleToggleShow = () => setToggleShow(!toggleShow);

  return {
    data,
    isLoading,
    isError,
    nextVideosData,
    isNextVideosLoading,
    isNextVideosError,
    comments,
    like,
    editComment,
    toggleShow,
    setLike,
    setEditComment,
    handleCommentChange,
    handleSubmitComment,
    handleEditComment,
    handleDeleteComment,
    handleToggleShow,
  };
};
