import { API_ENDPOINTS } from "../config/endpoints";
import type { IFilerProduct } from "../types";
import { baseClient } from "./baseClient";

export const apiClient = {
  auth: {
    login: (data: { email: string; password: string }) => baseClient.post(API_ENDPOINTS.auth.login, data),
    logout: () => baseClient.post(API_ENDPOINTS.auth.logout),
    refresh: () => baseClient.post(API_ENDPOINTS.auth.refresh),
    me: () => baseClient.get(API_ENDPOINTS.auth.me),
  },
  products: {
    getAll: (filters: IFilerProduct) => baseClient.post(API_ENDPOINTS.products.getAll, filters),
  }
};
