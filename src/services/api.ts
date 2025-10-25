import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})  

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
    (config) => {
        // Ambil token dari localStorage
        const token = localStorage.getItem('token');

        // Kalau ada token, tambahkan ke header Authorization
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }, 
    (error) => {
        return Promise.reject(error)
    }
);

// Interceptor untuk menangani response error
api.interceptors.response.use(
    (response) => {
        // kalau sukses, langsung return response
        return response;
    },
    (error) => {
        // Kalau 401 Unauthorized, (token invalid/expired)
        if(error.response?.status === 401) {
            // Hapus token dari localStorage
            localStorage.removeItem('token');
            // Redirect ke halaman login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)

export default api;