import { API_ENDPOINTS } from "../config/endpoints";
import { createBaseClient } from "./baseClient";

export const createAuthClient = () => {
  const client = createBaseClient();

  return {
    login: (data: { email: string; password: string }) => 
      client.post(API_ENDPOINTS.auth.login, data),

    logout: () => 
      client.post(API_ENDPOINTS.auth.logout),

    refresh: () => 
      client.post(API_ENDPOINTS.auth.refresh),
  }
};
