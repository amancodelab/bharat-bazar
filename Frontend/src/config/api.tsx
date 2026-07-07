import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

interface RetryRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// -------------------------
// Request Interceptor
// -------------------------
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("jwt");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// -------------------------
// Response Interceptor
// -------------------------
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        console.log("Refreshing access token...");

        const response = await api.post("/auth/access-token/customer");

        const newAccessToken = response.data.data;

        console.log("New Access Token:", newAccessToken);

        localStorage.setItem("jwt", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired");

        localStorage.removeItem("jwt");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
