import axios from "axios";
import getAuthToken from '@/api/auth';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const createProject = async (id: string, name: string, description: string, start_date?: Date, end_date?: Date) => {
  const response = await axios.post(
    `${baseURL}/api/create-project`,
    { id, name, description, start_date, end_date },
    { withCredentials: true }
  );
  return response.data;
}

const getUnassignedProjects = async () => {
  const response = await axios.get(`${baseURL}/api/projects/unassigned`, { withCredentials: true });
  return response.data;
}

const getAssignedProjects = async () => {
  const response = await axios.get(`${baseURL}/api/projects/assigned`, { withCredentials: true });
  return response.data;
}

const getProjectDetails = async (projectId: string) => {
  const response = await axios.get(`${baseURL}/api/projects/${projectId}`, { withCredentials: true });
  return response.data;
}

const assignProject = async (projectId: string) => {
  const response = await axios.post(
    `${baseURL}/api/projects/project-${projectId}/assign`,
    {},
    { withCredentials: true }
  );
  return response.data;
}

const unassignProject = async (projectId: string) => {
  const response = await axios.post(
    `${baseURL}/api/projects/${projectId}/unassign`,
    {},
    { withCredentials: true }
  );
  return response.data;
}

const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`${baseURL}/api/projects/${projectId}`, { withCredentials: true });
  return response.data;
}

// Configure axios to include the token in requests
axios.interceptors.request.use((config) => {
  const token = getAuthToken.getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Standard JWT format
  }
  return config;
});

export default { createProject, getUnassignedProjects, getAssignedProjects, getProjectDetails, assignProject, unassignProject, deleteProject }