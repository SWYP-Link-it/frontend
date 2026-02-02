import { useAuthStore } from '@/src/stores/authStore';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401) {
      try {
        const reissueResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
          {},
          {
            withCredentials: true,
          },
        );

        const newAccessToken = reissueResponse.data.accessToken;
        useAuthStore.getState().setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (error) {
        console.error('토큰 재발급 실패:', error);
      }

      // TODO: 백엔드에서 refresh token cookie 세팅으로 변경
      document.cookie = 'refresh_token=; Max-Age=0; path=/;';

      useAuthStore.getState().clearAccessToken();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
