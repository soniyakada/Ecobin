// utils/axiosInstance.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 🔁 Update this to your backend base URL
  withCredentials: true,                // 🔐 Useful if you're using cookies/session
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;