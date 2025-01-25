import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";

interface Credentials {
  username: string;
  password: string;
}

interface UserData {
  username: string;
  email: string;
  password: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (credentials: Credentials) => {
      const formData = new FormData();
      formData.append("username", credentials.username);
      formData.append("password", credentials.password);
      return api.post(`/auth/login`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const logout = useMutation({
    mutationFn: () => api.post(`/auth/logout`, {}),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const register = useMutation({
    mutationFn: (userData: UserData) => api.post(`/auth/register`, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const user = useQuery({
    queryKey: ["user"],
    queryFn: () => api.get(`/auth/user`),
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
