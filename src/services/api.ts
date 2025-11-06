import axios, { AxiosError } from 'axios';

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
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, 
    (error) => {
        return Promise.reject(error)
    }
);

// ✅ SATU INTERCEPTOR SAJA - dengan logic yang lebih smart
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        // Hanya handle 401 untuk request yang BUKAN login
        if (error.response?.status === 401) {
            const isLoginRequest = error.config?.url?.includes('/auth/login');
            
            // ⭐ Jika bukan login request, baru redirect
            if (!isLoginRequest) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Cek apakah sudah di halaman login
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login';
                }
            }
            // ⭐ Jika login request yang gagal, biarkan error di-throw
            // Biar bisa di-catch di authService dan ditampilkan error message
        }
        
        return Promise.reject(error);
    }
)

export default api;