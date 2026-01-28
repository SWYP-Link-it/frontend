import { useAuthStore } from '@/src/stores/authStore';
import { ReactNode, useEffect } from 'react';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const refresh = useAuthStore((state) => state.refresh);

  useEffect(() => {
    refresh();
  }, []);
  return children;
};
