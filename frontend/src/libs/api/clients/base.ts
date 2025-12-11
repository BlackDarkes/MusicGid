import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_CONFIG } from "../config/constants";
import { setupInterceptor } from "../interceptor";

export const createBaseClient = () => {
  const client: AxiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return setupInterceptor(client);
};

export type { AxiosInstance, AxiosResponse, AxiosError };