import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changePassword,
  getCurrentUser,
  login,
  logout,
  registerUser
} from "../api/auth.api";






export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries("currentUser");
    },
    onError: (error) => {
      // Log error or handle specific cases if needed
      console.error("Login Error:", error);
       toast.error(error.message || "An error occurred during login.");
    },
    retry: 0,
  });
};


export const useLogout = () => {
  return useMutation({
    mutationFn: () =>logout
  });
};



export const useCurrentUser = (options = {}) => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};


export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => changePassword(data),
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user) => registerUser(user),
  });
};
