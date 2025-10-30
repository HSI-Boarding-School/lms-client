import api from "./api";

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
    created_at: Date;
    updated_at: Date;
    roles:      Role[];
}

export interface Role {
    id:          string;
    name:        string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
}

// Service functions for authentication

const authService = {
    //login
    login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
        const response = await api.post<LoginResponse>('/auth/login', credentials);
        return response.data;
    },

    // register
    register: async (data: RegisterCredentials): Promise<void> => {
        await api.post('/auth/register', data);
    },

    // Get current user profile
    getUserById: async (userId: string): Promise<UserData> => {
        const response = await api.get<{status: number, data: UserData}>(`/users/${userId}`);
        return response.data.data;
    },

    logout: async (): Promise<void> => {
        // Hapus token dari localStorage
        localStorage.removeItem('token');
    }
}

export default authService;