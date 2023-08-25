import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE;
const USERS_API_URL = `${API_BASE_URL}/users`;

const api = axios.create({
    withCredentials: true,
});

//Admin
export const findAllUsers = async () => {
    const response = await axios.get(USERS_API_URL);
    return response.data;
  };
  
  export const findUserById = async (id) => {
    const response = await axios.get(`${USERS_API_URL}/${id}`);
    return response.data;
  };
  
  export const createUser = (user) => { 
    return axios.post(USERS_API_URL, user);
  };

  export const deleteUser = (id) => {
    return axios.delete(`${USERS_API_URL}/${id}`);
  };
  //??
  export const updateUser = (newUser) => {
    return api.put(`${USERS_API_URL}/${newUser._id}`, newUser);
  };
 
