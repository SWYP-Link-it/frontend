import { ReactNode, useEffect } from 'react';
import { refreshAccessToken } from '../api/auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // 새로고침 시 access token 갱신
    refreshAccessToken().catch(() => {});
  }, []);
  return children;
};
