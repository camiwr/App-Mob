import axios from 'axios';

const api = axios.create({
  baseURL: process.env.ENDPOINT_URL,
});

export default api;