import { useQuery } from '@tanstack/react-query';
import { getCreditBalance } from '@/src/features/profile/api';
import { profileQueryKey } from '../queryKeys';
import { useAuthStore } from '@/src/stores/authStore';

export const useQueryCreditBalance = () => {
  const { accessToken } = useAuthStore();
  return useQuery<number>({
    queryKey: profileQueryKey.creditBalance,
    queryFn: async () => {
      const res = await getCreditBalance();
      return res.data.data.creditBalance as number;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000,
    enabled: accessToken !== null,
  });
};
