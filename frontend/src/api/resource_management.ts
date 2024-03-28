import axios from "axios";
import getAuthToken from "./auth";

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

// API calls for resouce management here
const getResources = async () => {
  const response = await axios.get(`${baseURL}/api/resources`);
  return response.data;
}

const getResourceDetails = async (resourceId: string) => {
  const response = await axios.get(`${baseURL}/api/resources/${resourceId}`);
  return response.data;
}

const checkoutResource = async (projectId: string, resourceId: string, qty: number) => {
  const response = await axios.post(`${baseURL}/api/resources/${resourceId}/checkout`, { projectId, qty });
  return response.data;
}

const checkinResource = async (projectId: string, resourceId: string, qty: number) => {
  const response = await axios.post(`${baseURL}/api/resources/${resourceId}/checkin`, { projectId, qty });
  return response.data;
}

axios.interceptors.request.use((config) => {
  const token = getAuthToken.getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Standard JWT format
  }
  return config;
});

export default {
  getResources,
  getResourceDetails,
  checkoutResource,
  checkinResource
};