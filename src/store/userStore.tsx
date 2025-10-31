import { create } from "zustand";

// mendefinisikan tipe role
export type Role = "student" | "instructor" | "admin";

// bentuk data global
interface UserRoleStore {
  userRole: Role;
  setUserRole: (role: Role) => void;
}

// bikin store-nya
export const useUserRoleStore = create<UserRoleStore>((set) => ({
  userRole: "student",
  setUserRole: (role: Role) => set({ userRole: role }),
}));    
