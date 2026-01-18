// libs/api/baseClient.ts
import axios from "axios";
import { API_CONFIG } from "../config/constants";
import { setupInterceptor } from "../interceptor";

const axiosInstance = axios.create({
  baseURL: API_CONFIG.base_url,
  timeout: API_CONFIG.timeout,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const baseClient = setupInterceptor(axiosInstance);
