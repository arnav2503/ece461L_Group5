import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

/**
 * Checks if the backend is active.
 * @returns Response data from the server (should be "OK")
 * @throws 500 for server errors (no response data, the backend is not active or there is a critical error)
 */
const backendActive = async () => {
    const response = await axios.get(`${baseURL}/api/active`);
    return response;
}

export default { backendActive };