
import {
       useMutation,
       useQuery,
       useQueryClient,
} from "@tanstack/react-query";
    import {
      toggleCommentLike,
      toggleVideoLike,
      getLikedVideos,
      
    } from "../api/likes.api"; 

export const useLike = (type) => {
    const queryClient = useQueryClient();
    if (type === "video") {
        return useMutation({
            mutationFn: (videoId) => toggleVideoLike(videoId),
            onSuccess: (data, videoId) => {
                queryClient.invalidateQueries({ queryKey: ["video", videoId] });
            },
        });
    }
    if (type === "comment") {
        return useMutation({
            mutationFn: (commentId) => toggleCommentLike(commentId),
            onSuccess: (data, commentId) => {
                queryClient.invalidateQueries({ queryKey: ["comments"] });
            },
        });
    }
    
}


export const useLikedVideos = ({ enabled }) => {
  return useQuery({
    queryKey: ["likedVideos"],
    queryFn: () => getLikedVideos(),
    enabled,
  });
};