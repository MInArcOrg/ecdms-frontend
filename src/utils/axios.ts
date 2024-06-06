import authConfig from 'src/configs/auth';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3010/';

const axiosServices = axios.create({
  baseURL
});

// Function to retrieve the token (implementation depends on your storage mechanism)
const getToken = () => {
  // Replace with your logic to retrieve the token from local storage, cookies, etc.
  // This example assumes a `token` key in local storage
  const storedToken = `Bearer ${window.localStorage.getItem(authConfig.storageTokenKeyName)!}`;

  return storedToken;
};

// Request interceptor to add authorization header with token (if available)
axiosServices.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    // Optional: Log request details for debugging
    // console.debug('Making request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors based on status codes or response data
    if (error.response) {
      if (error.response.status === 401) {
        // Handle unauthorized error (e.g., redirect to login)
        console.warn('Unauthorized access, redirect required');
        // Implement your redirect logic here (omitted for brevity)
      } else {
        // Handle other errors with generic or custom messages
        console.error('API Error Response:', error.response.data);
        return Promise.reject(error.response.data || 'API request failed');
      }
    } else {
      // Handle network or other non-response errors
      console.error('Network or connection error:', error);
      return Promise.reject('Network error');
    }
  }
);

export default axiosServices;
