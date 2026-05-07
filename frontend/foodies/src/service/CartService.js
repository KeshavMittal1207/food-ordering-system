import apiClient from './apiClient';

export const fetchCartList = async () => {
  const response = await apiClient.get('/api/cart/getCart');
  return response.data;
};

export const addToCart = async (foodId) => {
  const response = await apiClient.post('/api/cart/addToCart', { foodId });
  return response.data;
};

export const removeFromCart = async (foodId) => {
  const response = await apiClient.post('/api/cart/removeFromCart', { foodId });
  return response.data;
};

export const deleteCart = async () => {
  await apiClient.delete('/api/cart/deleteCart');
};
