import axios from "axios";
import getAuthToken from "./auth";

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * @returns 200 for success, see `response` for list of hardware resources
 * @throws 404 if no resources are found, 500 for server errors (see `response.error` for details)
 */
const getResources = async () => {
  const response = await axios.get(`${baseURL}/api/resources`);
  return response.data;
}

/**
 * @param resourceId string
 * @returns `response` 200 for success, see `response` for details
 * @throws 404 if the resource does not exist, 500 for server errors (see `response.error` for details)
 */
const getResourceDetails = async (resourceId: string) => {
  const response = await axios.get(`${baseURL}/api/resources/hw-${resourceId}`);
  return response.data;
}

/**
 * @param projectId string
 * @param resourceId string
 * @param qty number
 * @returns `response` 200 for success, see `response` for details
 * @throws 400 for malformed data, 403 if the user does not have permission to manage the project, 404 if the resource, project, or user does not exist, 409 if the quantity is invalid, 500 for server errors (see `response.error` for details)
 */
const checkoutResource = async (projectId: string, resourceId: string, qty: number) => {
  const response = await axios.patch(`${baseURL}/api/resources/hw-${resourceId}`, 
  { 
    'field': 'available',
    'method': 'checkout',
    'value': qty,
    'project_id': projectId
  },
  { withCredentials: true });
  return response.data;
}

/**
 * 
 * @param projectId string
 * @param resourceId string
 * @param qty number
 * @returns `response` 200 for success, see `response` for details
 * @throws 400 for malformed data, 403 if the user does not have permission to manage the project, 404 if the resource, project, or user does not exist, 409 if the quantity is invalid, 500 for server errors (see `response.error` for details)
 */
const checkinResource = async (projectId: string, resourceId: string, qty: number) => {
  const response = await axios.patch(`${baseURL}/api/resources/hw-${resourceId}`, 
  { 
    'field': 'available',
    'method': 'checkin',
    'value': qty,
    'project_id': projectId
  },
  { withCredentials: true });
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