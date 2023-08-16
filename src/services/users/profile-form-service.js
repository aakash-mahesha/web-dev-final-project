import axios from "axios";

const api = axios.create();
// const API_BASE = process.env.API_BASE;
// const FORM_API = `${API_BASE}/users/{id}/save-profile";
const PROFILE_API = `http://localhost:4000/api/users/profile`; // ??? TODO: change to a valid one

export const submitProfileForm = async (formData) => {
    try {
        const response = await api.post(PROFILE_API, formData);
        if (response.status === 201) {
            // Send update to /user db collection
            return response.data._id;
        }
        else {
            return 'Could not complete request: '+response;
        }
    } catch (error) {
        return error.message;
    }
}