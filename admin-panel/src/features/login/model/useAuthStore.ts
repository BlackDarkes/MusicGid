/* eslint-disable @typescript-eslint/no-explicit-any */
import type { TypeAuthSchema } from "@/entities/admin";
import { adminApi } from "@/entities/admin/api/adminApi";
import type { IAdmin } from "@/entities/admin/model/admin.interface";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IAuthStore {
  user: IAdmin | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;

  fetchUser: () => Promise<boolean>;
  login: (data: TypeAuthSchema) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools((set) => ({
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,

    clearError: () => set({ error: null }),

    fetchUser: async () => {
      set({ isLoading: true });
      try {
        const user = await adminApi.me();
        set({ user, isAuth: true, error: null });
      } catch {
        set({ user: null, isAuth: false });
      } finally {
        set({ isLoading: false });
      }
    },
    login: async (data: TypeAuthSchema) => {
      set({ isLoading: true });
      try {
        const res = await adminApi.login(data);
        set({
          user: res.admin,
          isAuth: true,
          error: null,
        });
        return res.message;
      } catch (error: any) {
        const errorMsg = error.response?.data?.message || "Ошибка входа";
        throw new Error(errorMsg);
      } finally {
        set({ isLoading: false });
      }
    },
    logout: async () => {
      try {
        await adminApi.logout();
      } finally {
        set({ user: null, isAuth: false, error: null });
      }
    },
  })),
);
