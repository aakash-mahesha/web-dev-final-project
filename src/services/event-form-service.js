import axios from "axios";

const api = axios.create();
// const API_BASE = process.env.API_BASE;
const FORM_API = `https://mapverse-server.onrender.com/api/events`

export const createEvent = async (formData) => {
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

export const editEvent = async (formData) => {
    try {
        const response = await api.put(FORM_API, formData);
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

export const deleteEvent = async (eventID) => {
    try {
        const response = await api.delete(FORM_API, eventID);
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