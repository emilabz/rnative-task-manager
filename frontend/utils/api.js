// frontend/utils/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const baseURL = "https://rnative-task-manager-backend.onrender.com"; // Replace with your backend URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
