import axios from "axios";

const api = axios.create();
const API_BASE = process.env.API_BASE;
const FORM_API = `${API_BASE}/users/{id}/save-event`

export const submitEventForm = async (formData) => {
    console.log("In Service, form data: ", formData);
    const response = await api.post(FORM_API, formData);
    return response.data;
}