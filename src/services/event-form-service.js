import axios from "axios";

const api = axios.create();
// const API_BASE = process.env.API_BASE;
const FORM_API = `http://localhost:4000/api/events`

export const submitEventForm = async (formData) => {
    console.log("In Service, form data: ", formData);
    const response = await api.post(FORM_API, formData);
    return response.data;
}