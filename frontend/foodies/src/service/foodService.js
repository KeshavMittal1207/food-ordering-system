import axios from 'axios';

const API_URL = 'http://localhost:8080/api/foods';

export const fetchFoodList = async () =>{
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";
    try{
        const response = await axios.get(API_URL + "/getAll" , {
            headers : {
                Authorization: `Bearer ${token}`,
            } 
        });
        return response.data;
    }catch(error){
        console.log('Error fetching food list',error);
        throw error;
    }
    }
export const fetchFoodDetails =async (id) => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmNkQGV4YW1wbGUuY29tIiwiaWF0IjoxNzUzNDQ2MjM5LCJleHAiOjE3NTM0ODIyMzl9.E1gR0iHN9i8W4kMvZ38DiJJZ8hZLOaDxCJEhSUkHKsQ";
        try {
            const response = await axios.get(API_URL+"/getFood/"+id , {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log('Error while fetching the food details:',error);
            throw error;
        }
        
    }      
