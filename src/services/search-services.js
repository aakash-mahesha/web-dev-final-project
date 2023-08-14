import axios from "axios";

const api = axios.create();
const API_BASE = process.env.API_BASE;
const SEARCH_API = `${API_BASE}/search`

export const submitSearch = async (searchCrit) => {
    console.log(`search-form-service search: ${searchCrit}`);
    const response = await api.post(SEARCH_API, searchCrit);
    return response.data;
}

export const fetchResults = async () => {
    const response = await api.post(`${SEARCH_API}/results`);
    return response;
}