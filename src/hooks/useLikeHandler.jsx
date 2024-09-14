import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useLikeHandler = (videoId, like, setLike) => {
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (like) {
        await axios.delete(`/api/videos/${videoId}/like`);
      } else {
        await axios.post(`/api/videos/${videoId}/like`);
      }
    },
    onSuccess: () => {
      setLike(!like);
      toast.success(like ? "Like removed" : "Liked");
    },
    onError: () => {
      toast.error("Error toggling like");
    },
  });

  const handleLike = () => {
    likeMutation.mutate();
  };

  return { handleLike };
};
