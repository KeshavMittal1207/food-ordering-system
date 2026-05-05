import axios from "axios";

const API_URL = 'http://localhost:8080/api/foods';

// Hardcoded JWT token for now
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";

// Add Food - Create new food item with image
export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image);

    // Debug logging
    console.log('Request URL:', API_URL);
    console.log('Authorization header:', `Bearer ${token}`);
    console.log('FormData contents:');
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    try {
        const response = await axios.post(
            API_URL,
            formData,
            {
                headers: {  
                    // Don't set Content-Type manually for FormData, let axios handle it
                    "Authorization": `Bearer ${token}`
                }
                // Temporarily remove withCredentials to test
                // withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding food:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
    }
};

export const getFoodList = async () => {
    try {
        console.log('Fetching food list from:', API_URL+"/getAll");
        const response = await axios.get(API_URL+"/getAll", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log('Food list response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching food list:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
    }
};

export const deleteFood = async (foodId) => {
    try {
        console.log('Deleting food with ID:', foodId);
        const response = await axios.delete(`${API_URL}/deleteFood/${foodId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log('Delete response status:', response.status);
        // Return true if deletion was successful (status 200 or 204)
        return response.status === 200 || response.status === 204;
    } catch (error) {
        console.error('Error while deleting the food:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
    }
};

// Update Food - Update existing food item
export const updateFood = async (foodId, foodData, image = null) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    
    // Only append image if provided
    if (image) {
        formData.append('file', image);
    }

    try {
        console.log('Updating food with ID:', foodId);
        const response = await axios.put(
            `${API_URL}/${foodId}`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                withCredentials: true,
            }
        );
        console.log('Update response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating food:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
    }
};

// Get Food by ID - Fetch single food item
export const getFoodById = async (foodId) => {
    try {
        console.log('Fetching food with ID:', foodId);
        const response = await axios.get(`${API_URL}/${foodId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        console.log('Food details response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching food details:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        throw error;
    }
};

export default {
    addFood,
    getFoodList,
    deleteFood,
    updateFood,
    getFoodById
};