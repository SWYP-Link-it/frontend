import { create } from 'zustand';

interface UserInfoState {
  userId: number;
  userNickname: string;
  creditBalance: number;

  setUserInfo: (userInfo: {
    userId: number;
    userNickname: string;
    creditBalance: number;
  }) => void;
}

export const useUserInfoStore = create<UserInfoState>()((set) => ({
  creditBalance: 0,
  userId: 0,
  userNickname: '',
  setUserInfo: (userInfo) => {
    set({
      userId: userInfo.userId,
      userNickname: userInfo.userNickname,
      creditBalance: userInfo.creditBalance,
    });
  },
}));
