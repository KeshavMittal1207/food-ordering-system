import apiClient from './apiClient';

export const registerUser = async (data) => {
  const response = await apiClient.post('/api/register', data);
  return response;
};

export const loginUser = async (data) => {
  const response = await apiClient.post('/api/login', data);
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post('/api/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await apiClient.post('/api/reset-password', { token, newPassword });
  return response.data;
};

export const fetchSavedAddresses = async () => {
  const response = await apiClient.get('/api/addresses');
  return response.data;
};

export const saveUserAddress = async (type, address) => {
  const response = await apiClient.post('/api/addresses', { type, address });
  return response.data;
};
