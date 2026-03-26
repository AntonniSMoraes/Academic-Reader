import axios from 'axios';

const api = axios.create({
  baseURL: 'https://qr-scanner-back.onrender.com',
  timeout: 30000,
});

export default api;