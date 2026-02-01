import type { AxiosRequestConfig } from "axios";
import { API_ENDPOINTS } from "../config/endpoints";
import type { IFilterProduct, IProductData } from "../types";
import { baseClient } from "./baseClient";

export const apiClient = {
  auth: {
    login: (data: { email: string; password: string }) => baseClient.post(API_ENDPOINTS.auth.login, data),
    logout: () => baseClient.post(API_ENDPOINTS.auth.logout),
    refresh: () => baseClient.post(API_ENDPOINTS.auth.refresh),
    me: () => baseClient.get(API_ENDPOINTS.auth.me),
  },
  products: {
    getAll: (filters: IFilterProduct, config?: AxiosRequestConfig) => baseClient.post(API_ENDPOINTS.products.getAll, filters, config),
    getById: (id: number, config?: AxiosRequestConfig) => baseClient.get(API_ENDPOINTS.products.getById.replace(":id", id.toString()), config),
    getByCategory: (category: string, config?: AxiosRequestConfig) => baseClient.get(API_ENDPOINTS.products.getByCategory.replace(":category", category), config),
    getByBrand: (brand: string, config?: AxiosRequestConfig) => baseClient.get(API_ENDPOINTS.products.getByBrand.replace(":brand", brand), config),
    create: (data: IProductData) => baseClient.post(API_ENDPOINTS.products.create, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }),
    update: (id: string, data: IProductData, config?: AxiosRequestConfig) => baseClient.put(API_ENDPOINTS.products.update.replace(":id", id), data, config),
    delete: (id: string, config?: AxiosRequestConfig) => baseClient.delete(API_ENDPOINTS.products.delete.replace(":id", id), config),
  }
};
