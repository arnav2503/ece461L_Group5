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