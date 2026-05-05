import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cart';

export const fetchCartList = async () =>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";
    try{
        const response = await axios.get(API_URL + "/getCart" , {
            headers : {
                Authorization: `Bearer ${token}`,
            } 
        });
        return response.data;
    }catch(error){
        console.log('Error fetching cart list',error);
        throw error;
    }
    }
export const addToCart =async (foodId) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";
        try {
            const response = await axios.post(`${API_URL}/addToCart` , {foodId},{
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log('Error while adding to cart:',error);
            throw error;
        }
        
    }      
    export const removeFromCart =async (foodId) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";
        try {
            const response = await axios.post(`${API_URL}/removeFromCart`,{foodId} , {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log('Error while removing from cart:',error);
            throw error;
        }
    }
    export const deleteCart =async () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";
        try {
            const response = await axios.delete(`${API_URL}/deleteCart`, {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            if(response.status === 204){
                console.log("Cart is deleted successfully ");
                toast.success("Cart is deleted successfully");
            }
            else{
                console.log("Failed to delete Cart")
            }
        } catch (error) {
            console.log('Error while removing from cart:',error);
            throw error;
        }
        
    }      
