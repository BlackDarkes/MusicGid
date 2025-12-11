import { API_ENDPOINTS } from "../config/endpoints";
import { createBaseClient } from "./base";

export const createAuthClient = () => {
  const client = createBaseClient();

  return {
    login: (data: { email: string; password: string }) =>
      client.post(API_ENDPOINTS.AUTH.LOGIN, data),

    register: (data: {
      name: string;
      email: string;
      password: string;
      phone?: string;
    }) => client.post(API_ENDPOINTS.AUTH.REGISTER, data),

    logout: () => client.post(API_ENDPOINTS.AUTH.LOGOUT),

    refresh: () => client.post(API_ENDPOINTS.AUTH.REFRESH),

    me: () => client.get(API_ENDPOINTS.AUTH.ME),
  };
};

export type AuthClient = ReturnType<typeof createAuthClient>;
