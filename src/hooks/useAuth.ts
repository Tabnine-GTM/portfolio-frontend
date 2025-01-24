import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config";
import axios from "axios";
import { useEffect } from "react";

const AUTH_TOKEN_KEY = "authToken";

export function useAuth() {
  const queryClient = useQueryClient();

  const getToken = () =>
    queryClient.getQueryData<string>([AUTH_TOKEN_KEY]) || null;

  const setToken = (newToken: string | null) => {
    queryClient.setQueryData([AUTH_TOKEN_KEY], newToken);
    if (newToken) {
      sessionStorage.setItem("token", newToken);
    } else {
      sessionStorage.removeItem("token");
    }
  };

  // Token initialization
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken && !getToken()) {
      setToken(storedToken);
    }
  });

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
    onSuccess: (data) => {
      const newToken = data.data.access_token;
      setToken(newToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const logout = () => {
    setToken(null);
    queryClient.setQueryData(["user"], null);
  };

  const register = useMutation({
    mutationFn: (userData: {
      username: string;
      email: string;
      password: string;
    }) => axios.post(`${API_BASE_URL}/auth/register`, userData),
    onSuccess: (data) => {
      const newToken = data.data.access_token;
      setToken(newToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  const user = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      axios.get(`${API_BASE_URL}/auth/user`, {
        headers: { Authorization: `Bearer ${getToken()}` }
      }),
    enabled: !!getToken()
  });

  return { token: getToken(), login, logout, register, user };
}
