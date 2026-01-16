/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const setupErrorInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.message) {
        const status = error.response?.status;
        const data = error.response?.data as any;

        switch (status) {
          case 400: {
            console.log("Bad Request: ", data.message || data);
            break;
          }
          case 401: {
            console.log("Unauthorize: please login again!");
            break;
          }
          case 403: {
            console.log("Forbid: You don't have permission");
            break;
          }
          case 404: {
            console.log("Page not found: ", error.config?.url);
            break;
          }
          case 500: {
            console.log(
              "Server error: ",
              data.message || "Internal server error"
            );
            break;
          }
          default: {
            console.log(`Error ${status}: `, data.message || data);
          }
        }
      } else if (error.request) {
        console.log("No response relived");
      } else {
        console.log("Request setup error: ", error.message);
      }

      return Promise.reject(error);
    }
  );

  return client;
};
