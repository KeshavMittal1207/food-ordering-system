import apiClient from './apiClient';

export const fetchFoodList = async () => {
  const response = await apiClient.get('/api/foods/getAll');
  return response.data;
};

export const fetchFoodDetails = async (id) => {
  const response = await apiClient.get(`/api/foods/getFood/${id}`);
  return response.data;
};
