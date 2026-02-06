import { useAuthStore } from '@/src/stores/authStore';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (originalRequest.url?.includes('/auth/refresh')) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 token refresh 중이면 결과를 기다리고
      // 토큰을 받아서 해당 요청 재시도
      if (refreshPromise) {
        try {
          const newToken = await refreshPromise;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } catch (error) {
          // refresh도 실패하면 clear access token
          useAuthStore.getState().clearAccessToken();
          return Promise.reject(error);
        }
      }

      // token refresh promise 세팅
      refreshPromise = axios
        .post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          const newAccessToken = res.data.data.accessToken;
          useAuthStore.getState().setAccessToken(newAccessToken);
          return newAccessToken;
        })
        .finally(() => {
          refreshPromise = null;
        });

      try {
        const newToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        useAuthStore.getState().clearAccessToken();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
