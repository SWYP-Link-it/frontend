'use client';

import { BaseModal } from '@/src/components/BaseModal';
import { api } from '@/src/lib/api/api';
import { SkillReviewDto } from '@/src/types/skill';
import { useInfiniteQuery } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

type ReviewListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  skillName: string;
  skillId: number;
};

export const ReviewListModal = ({
  isOpen,
  onClose,
  nickname,
  skillName,
  skillId,
}: ReviewListModalProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['reviews', 'skills', skillId],
      queryFn: async ({ pageParam }) => {
        const res = await api.get<{
          data: { nextCursor: number; contents: SkillReviewDto[] };
        }>(`/reviews/skills/${skillId}`, {
          params: {
            size: 10,
            nextCursor: pageParam,
          },
        });
        return res.data.data;
      },
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  const list = data ? data.pages.flatMap((page) => page.contents) : [];

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('isIntersecting', entry.isIntersecting);
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '200px',
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[750px]">
      <div className="flex max-h-[calc(100vh-200px)] flex-col items-center p-12 whitespace-pre-wrap">
        <h3 className="mb-4 text-xl font-semibold text-gray-900">{`${nickname}님의 ${skillName} 스킬 공유 후기`}</h3>
        <div
          ref={scrollContainerRef}
          className="flex w-full flex-col gap-3 overflow-y-auto"
        >
          {list.map((review) => (
            <div
              key={review.reviewId}
              className="flex w-full shrink-0 flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]"
            >
              <p className="leading-6 text-gray-800">{review.content}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">
                  {review.reviewerNickname} 님
                </span>
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, idx) => (
                    <Image
                      key={idx}
                      src={'/icons/star.svg'}
                      alt="별"
                      width={20}
                      height={20}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div ref={loadMoreRef} />
          {isFetchingNextPage && (
            <LoaderIcon className="mx-auto mt-10 animate-spin text-gray-700" />
          )}
        </div>
      </div>
    </BaseModal>
  );
};
