import { API_BASE_URL } from "@/config";
import { Credentials, UserData } from "@/types/auth";
import axios from "axios";
import api from "./api";

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

export const authApi = {
	login: (credentials: Credentials) =>
		axiosInstance.post("/auth/login", credentials),
	logout: () => axiosInstance.post("/auth/logout"),
	register: (userData: UserData) =>
		axiosInstance.post("/auth/register", userData),
	refreshToken: () => axiosInstance.post("/auth/refresh"),
	getCurrentUser: () => api.get("/auth/me"),
};

export default authApi;
