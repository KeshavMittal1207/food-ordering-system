import apiClient from './apiClient';

export const placeOrder = async (orderData) => {
  const response = await apiClient.post('/api/orders/place', orderData);
  return response.data;
};

export const fetchMyOrders = async () => {
  const response = await apiClient.get('/api/orders/myorders');
  return response.data;
};

export const verifyOrderPayment = async (paymentDetails) => {
  const response = await apiClient.post('/api/orders/verify', paymentDetails);
  return response.data;
};

export const cancelCustomerOrder = async (orderId) => {
  const response = await apiClient.post(`/api/orders/${orderId}/cancel`);
  return response.data;
};
