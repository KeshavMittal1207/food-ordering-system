import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAuthRequest = error.config && error.config.url && (error.config.url.endsWith('/api/login') || error.config.url.endsWith('/api/register'));
    if (!isAuthRequest && error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear invalid token credentials
      localStorage.removeItem('authToken');
      localStorage.removeItem('authEmail');
      
      // Store session expired message to show as a toast after reload
      sessionStorage.setItem('logout_message', 'Session expired. Please login again.');
      
      // Force page reload to reset state or redirect to login if on protected routes
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register' && window.location.pathname !== '/') {
        window.location.href = '/login';
      } else {
        // Just reload to clear state context
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
