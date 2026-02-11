import { useQuery } from '@tanstack/react-query';
import { getCreditBalance } from '@/src/features/profile/api';
import { profileQueryKey } from '../queryKeys';

export const useQueryCreditBalance = () =>
  useQuery<number>({
    queryKey: profileQueryKey.creditBalance,
    queryFn: async () => {
      const res = await getCreditBalance();
      return res.data.data.creditBalance as number;
    },
  });
