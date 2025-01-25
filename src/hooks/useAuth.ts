import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";
import axios from "axios";

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (credentials: { username: string; password: string }) => {
      const formData = new FormData();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);
      return axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const logout = useMutation({
    mutationFn: () =>
      axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true }),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const register = useMutation({
    mutationFn: (userData: {
      username: string;
      email: string;
      password: string;
    }) =>
      axios.post(`${API_BASE_URL}/auth/register`, userData, {
        withCredentials: true
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const user = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true }),
    retry: false
  });

  return {
    isAuthenticated: user.isSuccess && user.data?.data != null,
    login,
    logout,
    register,
    user
  };
}
