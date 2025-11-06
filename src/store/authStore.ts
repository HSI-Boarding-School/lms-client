import { create } from "zustand";
import { persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";
import { Role as UserRole } from "./userStore";
import authService, {
  LoginCredentials,
  UserData,
} from "@/services/authService";

export interface TokenPayload {
  email: string;
  exp: number;
  iat: number;
  roles: UserRole;
  user_id: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  // state
  decoded: TokenPayload | null;
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // actions
  login: (credentials: LoginCredentials) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
  resetAuth: () => void;
  hasRole: (roles: string | string[]) => boolean;
  getRole: () => string;
  setLoading: (loading: boolean) => void;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // initial state
      user: null,
      token: null,
      isAuthenticated: true,
      decoded: null,
      isLoading: false,
      error: null,

      // login action
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        try {
          const response = await authService.login(credentials);
          const token = response.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode<TokenPayload>(token);
          const userData = await authService.getUserById(decoded.user_id);

          //update state
          set({
            token,
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message || "Login Failed!",
          });
          throw error;
        }
      },

      // logout action
      logout: () => {
        // call logout API
        authService.logout().catch(() => {
          // silent fail
        });

        // clear state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });

        // clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },

      setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

      // check auth (validate token)
      checkAuth: async () => {
        set({ isLoading: true });

        const token = localStorage.getItem("token");
        const userStr = localStorage.getItem("user");

        if (token && userStr) {
          try {
            // validate token with backend
            const user = await authService.getCurrentUser();

            set({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            // token invalid / error
            console.error("token validation error", error);

            // clear everything
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false,
              error: "Session expired",
            });
          }
        }
      },

      // clear error function
      clearError: () => {
        set({ error: null });
      },

      resetAuth: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
        useAuthStore.persist.clearStorage();
      },

      getRole: () => {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is missing");
        }
        const decoded = jwtDecode<TokenPayload>(token);
        const userRole = decoded.roles || "STUDENT";
        return userRole;
      },

      // check if user has a specific role(s)
      hasRole: (roles: string | string[]): boolean => {
        const { user } = get();
        if (!user) return false;

        const allowedRoles = Array.isArray(roles) ? roles : [roles];
        const userRoleNames = user.roles.map((role) => role.name);
        return allowedRoles.some((r) => userRoleNames.includes(r));
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        // Only persist these fields
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// export const useAuthStore = create<AuthState>((set) => ({
//     user: null,
//     token: null,
//     decoded: null,

//     login: (token) => {
//         localStorage.setItem('token', token);
//         const decoded = jwtDecode<TokenPayload>(token);
//         set({decoded, token});
//     },

//     logout: () => {
//         localStorage.removeItem('token');
//         set({user: null, token: null});
//     },

//     loadUserFromStorage: () => {
//         const storedToken = localStorage.getItem('token');
//         if (storedToken) {
//             const decoded = jwtDecode<TokenPayload>(storedToken);
//             set({decoded, token: storedToken});
//         }
//     },

//     fetchUser: async () => {
//         const token = localStorage.getItem('token');
//         if (!token) return;

//         const decoded: any = jwtDecode(token);
//         console.log("Decoded token:", decoded);

//         const userId = decoded.user_id;
//         const data = await authService.getUserById(userId);
//         console.log("Fetched user data:", data);

//         set({ user: data})
//     }
// }))
