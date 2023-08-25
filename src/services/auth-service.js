import axios from "axios";
import { Navigate, useNavigate } from "react-router";
const API_BASE_URL = process.env.REACT_APP_API_BASE;
const USERS_API_URL = `${API_BASE_URL}/users`;  
const api = axios.create({
    withCredentials: true,
});


export const register = async (regFormData) => {
    const response = await  api.post(`${USERS_API_URL}/register`,regFormData);
    const user =response.data;
    return user;
}
export const login = async ({username,password}) => {
<<<<<<< HEAD
    console.log('in fornt end auth service',{username,password})
    const response = await  api.post(`${USERS_API_URL}/login`,{username,password});
    console.log(response)
=======
    const response = await  api.post(`${USERS_API_URL}/login`,{username,password});
>>>>>>> 5f19b7f75fc47e55a8e91cf93967458070bb6d6c
    const user =response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_API_URL}/logout`);
    return response.data;
};
export const profile = async () => {
   
        const response = await api.post(`${USERS_API_URL}/profile`);
        return response; 
        
<<<<<<< HEAD
    
=======
    }catch (e){
        const response = {
            data : {
                details: null,
                loggedIn: false
            }
            
        }
        return response
            
    }
>>>>>>> 5f19b7f75fc47e55a8e91cf93967458070bb6d6c

};
export const updateUser = async (user) => {
    // match the update in the backend
    const response = await api.put(`${USERS_API_URL}/${user._id}`, user);
    return response.data;
};
