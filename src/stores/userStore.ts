import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// src/store/userStore.ts

interface UserInfo {
  userId: number;
  nickname: string;
  name: string; // 이 줄이 있는지 확인하고 추가
  email: string;
  profileImageUrl: string | null;
}

interface UserState {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
      clearUserInfo: () => set({ userInfo: null }),
    }),
    {
      name: 'user-storage',
    },
  ),
);
