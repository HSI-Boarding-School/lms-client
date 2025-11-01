import { jwtDecode } from "jwt-decode";
import api from "./api";
import { TokenPayload, useAuthStore } from "@/store/authStore";
import { promises } from "dns";

// interface untuk type safety
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    role: 'student' | 'instructor' | 'admin';
}

export interface User {
    id: number;
    username: string;
    email: string;
    role: 'student' | 'instructor' | 'admin'
}

export interface LoginResponse {
    status:    number;
    message:   string;
    data:      LoginResponseData;
    timestamp: Date;
    path:      string;
}

export interface LoginResponseData {
    expires_in: Date;
    token:      string;
    token_type: string;
}


export interface UserData {
    id:         string;
    name:       string;
    email:      string;
    is_active:  boolean;
    created_at: string;
    updated_at: string;
    roles:      Role[];
}

export type UserRole = "STUDENT" | "INSTURCTOR" | "ADMIN";


export interface Role {
    id:          string;
    name:        string;
    description: string;
    created_at:  string;
    updated_at:  string;
}

// Service functions for authentication

const authService = {
    //login
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        try {
            const response = await api.post<LoginResponse>('/auth/login', credentials);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    // register
    register: async (data: RegisterCredentials): Promise<void> => {
        try {
            await api.post('/auth/register', data);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },

    // Get user by id
    getUserById: async (userId: string): Promise<UserData> => {
        const token = localStorage.getItem('token')
        try {
            const response = await api.get<{status: number, data: UserData}>(`/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Failed to fetch user data');
        }
    },

    // get current user
    getCurrentUser: async (): Promise<UserData> => {
        const token = localStorage.getItem('token')
        if (!token) throw new Error("No token found")

        const decoded = jwtDecode<TokenPayload>(token)
        const userId = decoded.user_id

        const response = await api.get(`/users/${userId}`)
        return response.data.data;
    },

    logout: async (): Promise<void> => {
        try {
            // delete token from localStorage
        await api.post('/auth/logout');
        } catch (error: any) {
            throw new Error('Logout failed');
        } finally {
            const { resetAuth } = useAuthStore.getState()
            resetAuth()
            localStorage.clear()
        }
    }
}

export default authService;