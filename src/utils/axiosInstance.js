import axios from "axios";
import * as SecureStore from "expo-secure-store";

const API_URL = process.env.EXPO_BASE_URL_API;
const TOKEN_KEY = process.env.EXPO_TOKEN_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
