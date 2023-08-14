import axios from "axios";

const api = axios.create();
const API_BASE = process.env.API_BASE;
const DETAILS_API = `${API_BASE}/details`

export const details = async (eid) => {
    const response = await api.post(`${DETAILS_API}/${eid}`);
    return response.data;
}