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
    const response = await  api.post(`${USERS_API_URL}/login`,{username,password});
    const user =response.data;
    return user;
};

export const logout = async () => {
    const response = await api.post(`${USERS_API_URL}/logout`);
    return response.data;
};
export const profile = async () => {
    try{
        const response = await api.post(`${USERS_API_URL}/profile`);
        return response; 
        
    }catch (e){
        const response = {
            data : {
                details: null,
                loggedIn: false
            }
            
        }
        return response
            
    }

};
export const updateUser = async (user) => {
    // match the update in the backend
    const response = await api.put(`${USERS_API_URL}/${user._id}`, user);
    return response.data;
};
