import axios from "axios";
const SERVER_API_URL = process.env.REACT_APP_API_BASE;
const USERS_URL = `${SERVER_API_URL}/users`;

const api = axios.create({withCredentials: true});

export const login = async ({username, password}) => {
    console.log('in login service before calling api')
    console.log('credentials ',username, password)
    const response = await api.post(`${USERS_URL}/login`, {username, password});
    const user = response.data;
    console.log('in login service after calling api')
    console.log(user)
    return user;
}

