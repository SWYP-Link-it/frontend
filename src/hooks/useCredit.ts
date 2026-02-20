'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';

export function useCredit() {
  const { data: balanceData, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['credit', 'balance-details'],
    queryFn: async () => {
      const res = await api.get('/credits/balance-user-details');
      return res.data.data;
    },
  });

  const { data: historyData, isLoading: isHistoryLoading } = useQuery({
    queryKey: ['credit', 'histories'],
    queryFn: async () => {
      const res = await api.get('/credits/histories', {
        params: { size: 20 },
      });
      return res.data.data.contents;
    },
  });

  return {
    balance: balanceData,
    history: historyData || [],
    isLoading: isBalanceLoading || isHistoryLoading,
  };
}
