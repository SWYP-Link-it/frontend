import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clearAccessToken: () => void;
  refresh: () => void;
  logout: () => Promise<void>;
  withdraw: () => Promise<void>;
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
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      set({ accessToken: null });

      localStorage.clear();
      sessionStorage.clear();

      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });

      window.location.href = '/login';
    }
  },
  withdraw: async () => {
    try {
      const response = await api.delete('/user');

      if (response.data.success) {
        alert('회원 탈퇴가 정상적으로 처리되었습니다.');
      }
    } catch (error: any) {
      console.error('회원 탈퇴 실패:', error);
      const message =
        error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.';
      alert(message);
    } finally {
      set({ accessToken: null });
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/login';
    }
  },
}));
