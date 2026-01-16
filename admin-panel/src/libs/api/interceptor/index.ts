import type { AxiosInstance } from "axios";
import { setupAuthInterceptor } from "./auth/auth-interceptor";
import { setupErrorInterceptor } from "./auth/error-interceptor";

export const setupInterceptor = (client: AxiosInstance) => {
  setupAuthInterceptor(client);
  setupErrorInterceptor(client);

  return client;
}