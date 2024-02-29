import axios from "axios";

const baseURL = "http://localhost:5001";

const createProject = async (name: string, description: string, start_date: Date, end_date: Date) => {
  const response = await axios.post(
    `${baseURL}/api/projects`,
    { name, description, start_date, end_date },
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

const assignProject = async (projectId: string, userId: string) => {
  const response = await axios.post(
    `${baseURL}/api/projects/${projectId}/assign`,
    { userId },
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

