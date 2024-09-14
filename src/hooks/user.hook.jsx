import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import {
  getUserChannelProfile,
  updateUserCoverImage,
  updateAccountDetails,
  updateUserProfile,
} from "../api/user.api";



export const useUserChannelInfo = (username) => {
    return useQuery({
        queryKey: ["channelInfo", username],
        queryFn: () => getUserChannelProfile(username),
        refetchOnWindowFocus:true,
    })
}

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries("channelInfo");
    },
  });
};


export const useUpdateCoverImage = () => {
    const useQueryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => updateUserCoverImage(data),
        onSuccess: () => {
            QueryClient.invalidateQueries("channelInfo")
        }
    })
}

export const useUpdateAccountDetails = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateAccountDetails(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channelInfo"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};



