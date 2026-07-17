import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL =", API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config && error.config.url && error.config.url.endsWith('/api/login');
    if (!isLoginRequest && error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear invalid token credentials
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminEmail');
      
      // Store session expired message to show as a toast after reload
      sessionStorage.setItem('logout_message', 'Session expired. Please login again.');
      
      // Force page reload to reset state or redirect to login
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
