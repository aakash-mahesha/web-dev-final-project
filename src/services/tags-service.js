import axios from "axios";

// const REACT_APP_API_BASE = 'http://localhost:4000/api';
// const REACT_APP_API_BASE = 'https://mapverse-server.onrender.com/api';
const REACT_APP_API_BASE = process.env.REACT_APP_API_BASE;

export const dbGetTags = async () => {
    // /api/events/tags
    const tagsUrl = `${REACT_APP_API_BASE}/events/tags`;
    const response = await axios.get(tagsUrl);
    return response.data.tags;
}
