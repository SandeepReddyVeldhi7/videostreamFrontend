import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteVideo,
  getAllVideos,
  getNextVideos,
  getVideoById,
  getVideos,
  togglePublishStatus,
  updateVideoViews,
  uploadVideo,
} from "../api/video.api";
import addVideoToWatchHistory from "../api/addVideoToWatchHistory";

export const useVideos = (options = {}) => {
  const { userId, sortBy, sortType, query } = options;

  return useInfiniteQuery({
    queryKey: ["videos", { userId, sortBy, sortType, query }],
    queryFn: ({ pageParam = 1 }) =>
      getVideos(pageParam, userId, sortBy, sortType, query),
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagingInfo?.hasNextPage === false) return;
      return lastPage?.pagingInfo?.nextPage;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useAllVideos = () => {
  return useQuery({
    queryKey: ["allVideos"],
    queryFn: getAllVideos,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useNextVideos = (videoId) => {
  return useQuery({
    queryKey: ["nextVideos", videoId],
    queryFn: () => getNextVideos(videoId),
    staleTime: 1000 * 60 * 3,
  });
};

export const useUploadVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => uploadVideo(data),
    onSuccess: () => {
      // Invalidate the queries to refresh the video list or other related data
      queryClient.invalidateQueries(["channelStats"]);
      queryClient.invalidateQueries(["channelVideos"]);
    },
  });
};

export const useTogglePublish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId) => togglePublishStatus(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
    },
  });
};

export const useVideoById = (videoId) => {
  return useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId),
    staleTime: 1000 * 60 * 1, // 5 minutes
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (videoId) => deleteVideo(videoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelVideos"] });
      queryClient.invalidateQueries({ queryKey: ["channelStats"] });
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};



export const useAddVideoToWatchHistory = () => {
  return useMutation(addVideoToWatchHistory, {
    onSuccess: () => {
      toast.success("Added to watch history!");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update watch history"
      );
    },
  });
};

export const useUpdateVideoViews = () => {

  return useMutation({
    mutationFn: (videoId) => updateVideoViews(videoId),
  
  });
};
