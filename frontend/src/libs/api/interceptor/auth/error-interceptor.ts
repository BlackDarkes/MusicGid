/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const setupErrorInterceptor = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.message) {
        const status = error.response?.status;
        const data = error.response?.data as any;

        switch (status) {
          case 400: {
            console.log("Bad request: ", data.message || data);
            break;
          }
          case 401: {
            console.log("Unauthorize: please login again!");
            break;
          }
          case 403: {
            console.log("Forbiden: You don't have permission");
            break;
          }
          case 404: {
            console.log("Not fount: ", error.config?.url);
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
        console.error("No response recived: ", error.request);
      } else {
        console.error("Request setup error: ", error.message);
      }

      return Promise.reject(error);
    }
  );

  return client;
};
