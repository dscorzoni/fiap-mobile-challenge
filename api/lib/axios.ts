import axios, { AxiosInstance } from 'axios';
import { Platform } from 'react-native';

const base = Platform.OS === 'web' ? 'localhost' : '192.168.15.7'

const api: AxiosInstance = axios.create({
  baseURL: `http://${base}:3000`,
  timeout: 1000 * 60 * 60 * 24, // 24 hours
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export default api;
