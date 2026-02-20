'use client';

import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';

export function useReview(type: 'received' | 'written', skillId?: number) {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['reviews', type, skillId],
    queryFn: async ({ pageParam = null }) => {
      const endpoint =
        type === 'received' ? '/reviews/received' : '/reviews/written';
      const res = await api.get(endpoint, {
        params: {
          skillId: type === 'received' ? skillId : undefined,
          nextCursor: pageParam,
          size: 10,
        },
      });
      return res.data.data;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: null,
  });

  const deleteReview = useMutation({
    mutationFn: async (reviewId: number) => {
      return await api.delete(`/reviews/${reviewId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  const allReviews = data?.pages.flatMap((page) => page.contents) || [];

  return {
    allReviews,
    fetchNextPage,
    hasNextPage,
    isLoading,
    deleteReview,
  };
}
