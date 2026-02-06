import { useUserInfoStore } from '@/src/stores/userInfoStore';
import { ReactNode, useEffect } from 'react';
import { api } from '../api/api';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUserInfo = useUserInfoStore((state) => state.setUserInfo);

  const fetchUserInfo = () => {
    api.get(`/credits/balance-user-details`).then((response) => {
      const { userId, userNickname, creditBalance } = response.data.data;
      setUserInfo({ userId, userNickname, creditBalance });
    });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);
  return children;
};
