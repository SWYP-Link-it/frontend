import axios from 'axios';
import { useAuthStore } from '@/src/stores/authStore';

let refreshPromise: Promise<string> | null = null;

export function refreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      )
      .then((res) => {
        const token = res.data.data.accessToken;
        useAuthStore.getState().setAccessToken(token);
        return token;
      })
      .catch((err) => {
        // refresh도 실패하면 access token clear
        useAuthStore.getState().clearAccessToken();
        throw err;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}
