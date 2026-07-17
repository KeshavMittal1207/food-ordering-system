import apiClient from './apiClient';

export const fetchFoodList = async () => {
  const response = await apiClient.get('/api/foods/getAll');
  return response.data;
};

export const fetchFoodDetails = async (id) => {
  const response = await apiClient.get(`/api/foods/getFood/${id}`);
  return response.data;
};

export const fetchReviews = async (foodId) => {
  const response = await apiClient.get(`/api/reviews/food/${foodId}`);
  return response.data;
};

export const fetchAverageRating = async (foodId) => {
  const response = await apiClient.get(`/api/reviews/food/${foodId}/average`);
  return response.data;
};

export const addReview = async (reviewData) => {
  const response = await apiClient.post('/api/reviews', reviewData);
  return response.data;
};
