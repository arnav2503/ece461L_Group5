import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const backendActive = async () => {
    const response = await axios.get(`${baseURL}/api/active`);
    return response;
}

export default { backendActive };