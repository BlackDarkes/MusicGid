/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (reason: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | any,
  token: string | null = null,
) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
}

export const setupAuthInterceptor = (client: AxiosInstance) => {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: AxiosError) => {
      const originRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      }

      if (
        error.response?.status  === 401
        && !originRequest.url?.includes("/admin/refresh")
        && !originRequest.url?.includes("/admin/login")
        && !originRequest._retry
      ) {
        if (isRefreshing) {
          throw new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              originRequest._retry = true;
              return client(originRequest);
            })
            .catch((error) => {
              Promise.reject(error);
            })
        }

        originRequest._retry = true;
        isRefreshing = true;

        try {
          await client.post("/admin/refresh");
          processQueue(null, null);
          return client(originRequest);
        } catch(refreshError) {
          processQueue(refreshError as AxiosError, null);

          if (typeof window !== "undefined" && !originRequest.url?.includes("/admin/me")) {
            window.location.href = "/admin/login";
          }

          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
}