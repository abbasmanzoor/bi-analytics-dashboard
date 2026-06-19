import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? 'http://localhost:3001' : '/api', // fallback for Vercel
  headers: { 'Content-Type': 'application/json' },
});

// ✅ Prevent error from crashing app
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('API Error, using fallback:', error.message);
    return Promise.reject(error);
  }
);

export default api;