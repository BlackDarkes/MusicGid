import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
let isRefreshing: boolean = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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
      };

      if (
        error.response?.status === 401 &&
        !originRequest.url?.includes("/auth/refresh") &&
        !originRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              originRequest._retry = true;
              return client(originRequest);
            })
            .catch((err) => {
              Promise.reject(err);
            });
        }

        originRequest._retry = true;
        isRefreshing = true;

        try {
          await client.post("/auth/refresh");
          processQueue(null, null);

          return client(originRequest);
        } catch (refreshError) {
          processQueue(refreshError as AxiosError, null);

          if (typeof window !== "undefined") {
            window.location.href = "/auth/login";
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );

  return client;
};
