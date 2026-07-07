import axios from "axios";

export const sellerApi = axios.create({
  baseURL: "https://bharat-bazar.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
sellerApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("seller_jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
sellerApi.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          "https://bharat-bazar.onrender.com/auth/access-token/seller",
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = response.data.data;

        localStorage.setItem("seller_jwt", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return sellerApi(originalRequest);
      } catch (err) {
        localStorage.removeItem("seller_jwt");
        localStorage.removeItem("sellerId");

        window.location.href = "/auth/seller/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);
export default sellerApi;
