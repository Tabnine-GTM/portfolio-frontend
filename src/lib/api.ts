import { API_BASE_URL } from "@/config";
import axios from "axios";

const api = axios.create({
	baseURL: API_BASE_URL,
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		// You can add headers or do other transformations here
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		console.log("API Response:", response.status, response.config.url);
		return response;
	},
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			try {
				// Import refreshToken function here to avoid circular dependency
				const { refreshToken } = await import("./authApi");
				await refreshToken();
				return api(originalRequest);
			} catch (refreshError) {
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

export default api;
