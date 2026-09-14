import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling (e.g., redirect on 401)
    if (error.response?.status === 401) {
      // Handle unauthorized session
    }
    return Promise.reject(error);
  }
);

export default api;
