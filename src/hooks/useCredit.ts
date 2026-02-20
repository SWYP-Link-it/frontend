'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';

export function useCredit() {
  const { data: balanceData, isLoading: isBalanceLoading } = useQuery({
    queryKey: ['credit', 'balance-details'],
    queryFn: async () => {
      const res = await api.get('/credits/balance-user-details');
      return res.data.data;
    },
  });

  const {
    data: historyData,
    isLoading: isHistoryLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['credit', 'histories'],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await api.get('/credits/histories', {
        params: {
          page: pageParam,
          size: 20,
        },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasNext ? lastPage.pageNumber + 1 : undefined;
    },
    initialPageParam: 0,
  });

  const allHistory = historyData?.pages.flatMap((page) => page.contents) || [];

  return {
    balance: balanceData,
    history: allHistory,
    isLoading: isBalanceLoading || isHistoryLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
}
