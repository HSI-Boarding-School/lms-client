import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode'
import authService, { UserData } from '@/services/authService';

export interface TokenPayload {
    email:   string;
    exp:     number;
    iat:     number;
    roles:   Role[];
    user_id: string;
}

export interface Role {
    id:          string;
    name:        string;
    description: string;
    created_at:  string;
    updated_at:  string;
}

interface AuthState {
    decoded: TokenPayload | null;
    user: UserData | null;
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loadUserFromStorage: () => void;
    fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    decoded: null,

    login: (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode<TokenPayload>(token);
        set({decoded, token});
    },

    logout: () => {
        localStorage.removeItem('token');
        set({user: null, token: null});
    },

    loadUserFromStorage: () => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const decoded = jwtDecode<TokenPayload>(storedToken);
            set({decoded, token: storedToken});
        }
    },

    fetchUser: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const decoded: any = jwtDecode(token);
        console.log("Decoded token:", decoded);

        const userId = decoded.user_id;
        const data = await authService.getUserById(userId);
        console.log("Fetched user data:", data);
        
        set({ user: data})
    }
}))