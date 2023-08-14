import axios from "axios";
const API_BASE_URL = "http://localhost:4000/api";
const USERS_API_URL = `${API_BASE_URL}/users`;  //shold I add id here?

const api = axios.create({
    withCredentials: true,
});
//auth

export const register = async ({ username, password }) => {
    const response = await  api.post(`${USERS_API_URL}/register`,{username,password});
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
        alert(e);
    }

};
export const updateUser = async (user) => {
    const response = await api.put(`${USERS_API_URL}`, user);
    return response.data;
};
