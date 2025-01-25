import axios from "axios";
import { API_BASE_URL } from "@/config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add headers or do other transformations here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // You can transform the data here
    return response;
  },
  (error) => {
    // You can handle errors globally here
    return Promise.reject(error);
  }
);

export default api;
