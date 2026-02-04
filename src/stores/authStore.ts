import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  refresh: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,

  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

  clearAccessToken: () => {
    set({ accessToken: null });
  },

  refresh: () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
        {},
        {
          withCredentials: true,
        },
      )
      .then((response) => {
        const newAccessToken = response.data.data.accessToken;
        set({ accessToken: newAccessToken });
      })
      .catch((error) => {
        console.error('토큰 갱신 실패:', error);
        set({ accessToken: null });
      });
  },
}));
