import axios from 'axios';

 const API_BASE = "http://localhost:4000/api";
 const EVENT_API = `${API_BASE}/events`;
export const createEvent = async (event) => {
    const response = await axios.post(EVENT_API,event);
    return response.data;
}
export const findEvents = async () => {

    const response = await axios.get(EVENT_API);
    const events = response.data;
    return events;
}

export const deleteEvent =  async (eventId) => {
    const response = await axios.delete(`${EVENT_API}/${eventId}`);
    return response.data;
   
}
export const updateEvent = async (event) => {
    const response = await axios
        .put(`${EVENT_API}/${event._id}`, event);
    return event;
}