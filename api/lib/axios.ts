import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';

const base = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2'

const api: AxiosInstance = axios.create({
  baseURL: `http://${base}:3000`,
  timeout: 1000 * 60 * 60 * 24, // 24 hours
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default api;
