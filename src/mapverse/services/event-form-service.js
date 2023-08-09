import axios from "axios";
import "dotenv/config";

const api = axios.create();
const API_BASE = process.env.API_BASE;
const FORM_API = `${API_BASE}/users/{id}/save-event`

export const submitEventForm = async (form) => {
    const response = await api.post(FORM_API, form);
    return response.data;
}

// // Ideally, lets 
// export const saveEventForm = async (form) => {
//     const response = await api.post(FORM_API, form);
//     return response.data;
// }