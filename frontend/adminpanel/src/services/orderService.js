import apiClient from "./apiClient";

export const getAllOrders = async () => {
    try {
        const response = await apiClient.get('/api/orders/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await apiClient.put(
            `/api/orders/${orderId}/status`,
            { status }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};
