import { create } from 'zustand';

type UserInfo = {
  userId: number;
  userNickname: string;
  creditBalance: number;
};

interface UserInfoState {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
}));
