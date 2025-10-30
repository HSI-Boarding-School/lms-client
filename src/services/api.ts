import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})  

// Interceptor to add Authorization header to each request
api.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');
        // if token exists, add it to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error)
    }
);

// Interceptor to handle error responses globally
api.interceptors.response.use(
    (response) => {
        // if response is successful, return it
        return response;
    },
    (error) => {
        // If 401 Unauthorized, (token invalid/expired)
        if(error.response?.status === 401) {
            // delete token from localStorage
            localStorage.removeItem('token');
            // Redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default api;