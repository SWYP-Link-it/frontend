import { create } from 'zustand';
import { api } from '../lib/api/api';

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
    api
      .post('/auth/refresh')
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
