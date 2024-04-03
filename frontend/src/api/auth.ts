import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
const TOKEN_KEY = 'auth_token';

/**
 * Signs the user up and stores the auth token in local storage.
 * @param username : string
 * @param password : string (plaintext)
 * @param displayName : string
 * @returns `reponse` 201 on successful user creation, see `response.message` for details
 * @throws 400 for malformed data, 409 if the username is already in use, 500 for server errors (see `response.error` for details)
 */
const signup = async (username: string, password: string, displayName: string) => {
    const response = await axios.post(`${baseURL}/api/user/signup`, { username, password, displayName }, { withCredentials: true });
    return response.data; 
};

/**
 * Logs the user in and stores the auth token in local storage. User's session is valid for 24 hours.
 * @param username : string
 * @param password : string (plaintext)
 * @returns 200 on successful login, see `response.message` for details
 * @throws 401 for invalid credentials, 500 for server errors (see `response.error` for details)
 */
const login = async (username: string, password: string) => {
  const response = await axios.post(`${baseURL}/api/user/login`, { username, password }, { withCredentials: true });

  if (response.data.token) { 
    localStorage.setItem(TOKEN_KEY, response.data.token);
  }

  return response.data; 
};

/**
 * Update the display name of the logged in user.
 * @param displayName : string
 * @returns `response` : 200 on successful update, see `response.message` for details
 * @throws 400 for malformed data, 401 for a missing, invalid, or expired token, 500 for server errors (see `response.error` for details)
 */
const updateDisplayName = async (displayName: string) => {
  const response = await axios.patch(`${baseURL}/api/user`, { 'field': 'display_name', 'value': displayName }, { withCredentials: true });
  return response.data;
}

/**
 * Get the user object of the logged in user.
 * @returns The user object if the user is logged in.
 * @throws 401 for a missing, invalid, or expired token, 404 if the user does not exist, 500 for server errors (see `response.error` for details)
 */
const getUser = async () => {
  const response = await axios.get(`${baseURL}/api/user`, { withCredentials: true });
  return response.data;
}

/**
 * Destroy's the user's session by removing the auth token from local storage.
 */
const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * @returns True if a token is stored in local storage.
 */
const authTokenExists = () => {
  return localStorage.getItem(TOKEN_KEY) !== null;
};

/**
 * @returns The auth token if the user is logged in.
 */
const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};


/**
 * Add the Authorization header to all requests if the user is logged in.
 */
axios.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default { signup, login, updateDisplayName, logout, isLoggedIn: authTokenExists, getAuthToken, getUser };
