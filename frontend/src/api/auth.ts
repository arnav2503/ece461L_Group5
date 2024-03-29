import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const TOKEN_KEY = 'auth_token'; // Key used in localStorage

const signup = async (username: string, password: string, displayName: string) => {
    const response = await axios.post(`${baseURL}/api/signup`, { username, password, displayName }, { withCredentials: true });
    return response.data; 
};

const login = async (username: string, password: string) => {
  const response = await axios.post(`${baseURL}/api/login`, { username, password }, { withCredentials: true });

  if (response.data.token) { 
    localStorage.setItem(TOKEN_KEY, response.data.token);
  }

  return response.data; 
};

const updateDisplayName = async (displayName: string) => {
  const response = await axios.post(`${baseURL}/api/update-display-name`, { displayName }, { withCredentials: true });
  return response.data;
}

const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const isLoggedIn = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

const getUser = async () => {
  const response = await axios.get(`${baseURL}/api/get-user`, { withCredentials: true });
  return response.data;
}

// Configure axios to include the token in requests
axios.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Standard JWT format
  }
  return config;
});

export default { signup, login, updateDisplayName, logout, isLoggedIn, getAuthToken, getUser };
