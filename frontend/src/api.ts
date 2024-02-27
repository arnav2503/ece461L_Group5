import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Replace with your backend's base URL

// Backend Error Response Structure
interface BackendErrorResponse {
    error: string;
}

// Login Function
export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${baseURL}/login`, {
            username,
            password
        });

        // Successful login on backend
        if (response.data.message === 'Login successful') {
            return;
        } else {
            throw new Error(response.data.error || 'Unknown login error');
        }

    } catch (error) {
        if (axios.isAxiosError(error)) { 
            if (error.response) {
                throw error.response.data as BackendErrorResponse;
            } else {
                throw new Error('Network error: Unable to reach the server');
            }
        } else { 
            throw error; // Re-throw unexpected errors for debugging 
        }
    }
};

// Signup Function (Similar structure)
export const signup = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${baseURL}/signup`, {
            username,
            password
            });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) { 
            // Network/HTTP error
            if (error.response) {
                throw error.response.data as BackendErrorResponse;
            } else {
                // No response from server
                throw new Error('Network error: Unable to reach the server');
            }
        } else { 
            // Unexpected error
            throw error;
        }
    }
};
