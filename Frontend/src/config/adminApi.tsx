import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const BASE_URL = "http://localhost:3000";

const TOKEN_KEY = "admin_jwt";

export const adminApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -----------------------
// Token Helpers
// -----------------------

const getToken = () => localStorage.getItem(TOKEN_KEY);

const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// -----------------------
// Refresh Queue
// -----------------------

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });

  failedQueue = [];
};

// -----------------------
// Request Interceptor
// -----------------------

adminApi.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, Promise.reject);

// -----------------------
// Response Interceptor
// -----------------------

adminApi.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Ignore refresh endpoint itself
    if (originalRequest.url === "/auth/access-token/admin") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Refresh already in progress
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(adminApi(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const response = await adminApi.post("/auth/access-token/admin");

        const accessToken = response.data.data;

        setToken(accessToken);

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return adminApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        removeToken();

        window.location.replace("/admin/login");

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default adminApi;
