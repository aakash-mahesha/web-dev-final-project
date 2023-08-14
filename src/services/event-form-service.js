import axios from "axios";

const api = axios.create();
// const API_BASE = process.env.API_BASE;
const FORM_API = `http://localhost:4000/api/events`

export const submitEventForm = async (formData) => {
    try {
        const response = await api.post(FORM_API, formData);
        if (response.status === 201) {
            // Send update to /user db and append this event to his, alongside adding it to redux state of the user
            return response.data._id;
        }
        else {
            return 'Could not complete request: '+response;
        }
    } catch (error) {
        return error.message;
    }
}