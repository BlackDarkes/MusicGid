import axios from "axios";
import { API_CONFIG } from "../config/constants";
import { setupInterceptor } from "../interceptor";

export const createBaseClient = () => {
  const client = axios.create({
    baseURL: API_CONFIG.base_url,
    timeout: API_CONFIG.timeout,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

  return setupInterceptor(client);
}