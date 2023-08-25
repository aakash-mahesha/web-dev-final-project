import axios from "axios";
const API_BASE_URL = "http://localhost:4000/api";
const ENROLLMENTS_API = `${API_BASE_URL}/api/enrollments`;

const USERS_API = `${API_BASE_URL}/api/users`;

export const findAllEnrollments = async () => {
  const response = await axios.get(ENROLLMENTS_API);
  return response.data;
};

export const findEnrollmentsByUser = async (userId) => {
  const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
  return response.data;
};

export const createEnrollment = async (enrollment) => {
  const response = await axios.post(ENROLLMENTS_API, enrollment);
  return response.data;
};
