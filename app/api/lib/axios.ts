import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://10.0.2.2:3000',
  timeout: 1000 * 60 * 60 * 24, // 24 hours
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default api;
