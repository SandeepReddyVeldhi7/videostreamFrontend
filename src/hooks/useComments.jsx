import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const useComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [toggleShow, setToggleShow] = useState(false);
  const authStatus = useSelector((store) => store.auth.user);

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const response = await API.get(`/comment/${videoId}`);
    //  console.log("API response:", response.data); // Log the full response for debugging
      // Access the comments array inside `response.data.data.docs`
      setComments(response.data.data.docs || []);
    } catch (error) {
      toast.error("Error fetching comments");
    }
  };

  const handleChange = (e) => setComment(e.target.value);

  const handleSubmit = async () => {
    if (!comment) return toast.error("Comment cannot be empty");
    if (!authStatus) {
      toast.error("Please log in to add a comment.");
      return;
    }
    try {
      const response = await API.post(`/comment/${videoId}`, {
        content: comment,
      });
      if (response.data && response.data.success && response.data.data) {
        const { content, commentOwner, commentId } = response.data.data;
        setComments([{ content, commentOwner, commentId, }, ...comments]);
        setComment("");
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleEdit = (comment) => setEditComment(comment._id);

  const handleUpdateComment = async (commentId) => {
    try {
      const response = await API.put(`/comment/c/${commentId}`, {
        content: comment,
      });
      if (response.data && response.data.data) {
        const updatedComments = comments.map((c) =>
          c._id === commentId ? response.data.data : c
        );
        setComments(updatedComments);
        setEditComment(null);
        setComment("");
      } else {
        console.error("Unexpected response data:", response.data);
      }
    } catch (error) {
      toast.error("Error updating comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comment/c/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };

  const handleClickShow = () => setToggleShow(!toggleShow);

  return {
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
  };
};

export default useComments;