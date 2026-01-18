
import type { TypeAuthSchema } from "@/entities/admin";
import {  apiClient, type IUser } from "@/libs/api";
import { redirect } from "react-router";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthStore {
  user: IUser | null;
  isAuth: boolean;
  isLoading: boolean;
  message: string;
  fetchUser: () => Promise<boolean>;
  login: (data: TypeAuthSchema) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    (set) => ({
      user: null,
      isAuth: false,
      fetchUser: async () => {
        try {
          set({ isLoading: true });
          const res = await apiClient.auth.me();
          set({ user: res.data, isAuth: true }); 
          return true;
        } catch {
          set({ user: null, isAuth: false });
          return false;
        } finally {
          set({ isLoading: false });
        }
      },
      login: async (data: TypeAuthSchema) => {
        try {
          set({ isLoading: true });
          const res = await apiClient.auth.login(data);
          set({ user: res.data?.user, isAuth: true, message: res.data?.message });
        } catch(error) {
          console.log("Ошибка авторизации: ", error);
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        try {
          const res = await apiClient.auth.logout();
          set({ user: null, isAuth: false, message: res.data?.message });
          redirect("/admin/login");
        } catch(error) {
          console.log("Error logout: ", error)
        }
      },
    })
  )
)