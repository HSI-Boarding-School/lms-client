import { create } from "zustand";

// mendefinisikan tipe role
export type Role = "STUDENT" | "TEACHER" | "ADMIN";

// bentuk data global
interface UserRoleStore {
  userRole: Role;
  setUserRole: (role: Role) => void;
}

// bikin store-nya
export const useUserRoleStore = create<UserRoleStore>((set) => ({
  userRole: "STUDENT" as Role,
  setUserRole: (role: Role) => set({ userRole: role }),
}));
