import apiClient from "./apiClient";

// Add Food - Create new food item with image
export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image);

    try {
        const response = await apiClient.post(
            '/api/foods',
            formData
        );
        return response.data;
    } catch (error) {
        console.error('Error adding food:', error);
        throw error;
    }
};

export const getFoodList = async () => {
    try {
        const response = await apiClient.get("/api/foods/getAll", {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching food list:', error);
        throw error;
    }
};

export const deleteFood = async (foodId) => {
    try {
        const response = await apiClient.delete(`/api/foods/deleteFood/${foodId}`, {
            withCredentials: true,
        });
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error('Error while deleting the food:', error);
        throw error;
    }
};

// Update Food - Update existing food item
export const updateFood = async (foodId, foodData, image = null) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    
    if (image) {
        formData.append('file', image);
    }

    try {
        const response = await apiClient.put(
            `/api/foods/${foodId}`,
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating food:', error);
        throw error;
    }
};

// Get Food by ID - Fetch single food item
export const getFoodById = async (foodId) => {
    try {
        const response = await apiClient.get(`/api/foods/${foodId}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching food details:', error);
        throw error;
    }
};

// Toggle Availability status
export const toggleAvailability = async (foodId) => {
    try {
        const response = await apiClient.put(
            `/api/foods/${foodId}/toggle-availability`,
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error toggling availability:', error);
        throw error;
    }
};

// Toggle Best Seller recommendation status
export const toggleBestSeller = async (foodId) => {
    try {
        const response = await apiClient.put(
            `/api/foods/${foodId}/toggle-bestseller`,
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error toggling bestseller status:', error);
        throw error;
    }
};

export default {
    addFood,
    getFoodList,
    deleteFood,
    updateFood,
    getFoodById,
    toggleAvailability,
    toggleBestSeller
};