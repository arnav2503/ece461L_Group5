import axios from "axios";
import getAuthToken from '@/api/auth';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Create a new project.
 * @param projectId string
 * @param name string
 * @param description string
 * @param start_date Date (optional)
 * @param end_date Date (optional)
 * @returns 201 for success {'message': 'Project created successfully', 'project_id': 'string'}
 * @throws 400 for malformed data, 401 for a missing, invalid, or expired token, 409 if the project ID is already in use, 500 for server errors (see response.error for details)
 */
const createProject = async (projectId: string, name: string, description: string, start_date?: Date, end_date?: Date) => {
  const response = await axios.post(
    `${baseURL}/api/projects/project-${projectId}`,
    { name, description, start_date, end_date },
    { withCredentials: true }
  );
  return response.data;
}

/**
 * Get the details of a project.
 * @param projectId string
 * @returns `response`: json, 200 for success: 
 * { 
  * _id: string, 
  * name: string, 
  * owner: string, 
  * description: strig, 
  * start_date: Date  
  * end_date: Date, 
  * hardware_list: {resource_id (string) : resources_used (number)}, 
  * resources_capacity: number, 
  * resources_used: number, 
  * assigned_users: string[], 
 * }
 * @throws 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const getProjectDetails = async (projectId: string) => {
  const response = await axios.get(`${baseURL}/api/projects/project-${projectId}`, { withCredentials: true });
  return response.data;
}

/**
 * Assign the project to the logged in user.
 * @param projectId string
 * @returns 200 for sucess, see `response.message` for details
 * @throws 401 for a missing, invalid, or expired token, 404 if the project does not exist, 409 if the user is already assigned to the project, 500 for server errors (see response.error for details)
 */
const assignProject = async (projectId: string) => {
  const response = await axios.patch(
    `${baseURL}/api/projects/project-${projectId}`,
    { 
      'field': 'users', 
      'method': 'assign' 
    },
    { withCredentials: true }
  );
  return response.data;
}

/**
 * 
 * @param projectId string
 * @returns 200 for success, see `response.message` for details
 * @throws 401 for a missing, invalid, or expired token, 403 if the user is not assigned to the project, 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const unassignProject = async (projectId: string) => {
  const response = await axios.patch(
    `${baseURL}/api/projects/project-${projectId}`,
    { 
      'field': 'users', 
      'method': 'unassign' 
    },
    { withCredentials: true }
  );
  return response.data;
}

/**
 * @param projectId string
 * @returns `response`: json, 200 for success, see `response.message` for details
 * @throws 401 for a missing, invalid, or expired token, 403 if the user does not have permission to delete the project, 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const deleteProject = async (projectId: string) => {
  const response = await axios.delete(`${baseURL}/api/projects/project-${projectId}`, { withCredentials: true });
  return response.data;
}

/**
 * @param projectId string
 * @param name string
 * @returns `response`: json, 200 for success, see `response.message` for details
 * @throws 400 for malformed data, 401 for a missing, invalid, or expired token, 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const updateName = async (projectId: string, name: string) => {
  const response = await axios.patch(
    `${baseURL}/api/projects/project-${projectId}`,
    { 
      'field': 'name',
      'value': name
    },
    { withCredentials: true }
  );
  return response.data;
}

/**
 * @param projectId string
 * @param description string
 * @returns `response`: json, 200 for success, see `response.message` for details
 * @throws 400 for malformed data, 401 for a missing, invalid, or expired token, 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const updateDescription = async (projectId: string, description: string) => {
  const response = await axios.patch(
    `${baseURL}/api/projects/project-${projectId}`,
    {
      'field': 'description',
      'value': description
    },
    { withCredentials: true }
  );
  return response.data;
}

/**
 * 
 * @param projectId string
 * @param start_date Date
 * @returns `response`: json, 200 for success, see `response.message` for details
 * @throws 400 for malformed data, 401 for a missing, invalid, or expired token, 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const updateStartDate = async (projectId: string, start_date: Date) => {
  const response = await axios.patch(
    `${baseURL}/api/projects/project-${projectId}`,
    { 
      'field': 'start_date',
      'value': start_date
    },
    { withCredentials: true }
  );
  return response.data;
}

/**
 * 
 * @param projectId string
 * @param end_date Date
 * @returns `response`: json, 200 for success, see `response.message` for details
 * @throws 400 for malformed data, 401 for a missing, invalid, or expired token, 404 if the project does not exist, 500 for server errors (see response.error for details)
 */
const updateEndDate = async (projectId: string, end_date: Date) => {
  const response = await axios.patch(
    `${baseURL}/api/projects/project-${projectId}`,
    {
      'field': 'end_date',
      'value': end_date
    },
    { withCredentials: true }
  );
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

export default { createProject, getProjectDetails, assignProject, unassignProject, deleteProject, updateName, updateDescription, updateStartDate, updateEndDate}