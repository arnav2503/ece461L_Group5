import axios from "axios";
import getAuthToken from "./auth";

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API calls for resouce management here
export const getResources = async () => {
  const response = await axios.get(`${baseURL}/api/resources`);
  return response.data;
}

axios.interceptors.request.use((config) => {
  const token = getAuthToken.getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Standard JWT format
  }
  return config;
});