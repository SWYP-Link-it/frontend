import { ReactNode, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { profileQueryKey } from '@/src/features/profile/queryKeys';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // credit 무효화로 api 재요청 유도
    queryClient.invalidateQueries({
      queryKey: profileQueryKey.creditBalance,
    });
  }, []);
  return children;
};
