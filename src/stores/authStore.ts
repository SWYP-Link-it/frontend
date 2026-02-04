import { create } from 'zustand';
import { api } from '../lib/api/api';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  refresh: () => void;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
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
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      get().clearAccessToken();
      window.location.href = '/login';
    }
  },
}));
