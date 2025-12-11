import { AxiosInstance } from "axios";
import { setupAuthInterceptor } from "./auth/auth-interceptor";
import { setupErrorInterceptor } from "./auth/error-interceptor";

export const setupInterceptor = (client: AxiosInstance): AxiosInstance => {
  client = setupAuthInterceptor(client);
  client = setupErrorInterceptor(client);

  return client;
}