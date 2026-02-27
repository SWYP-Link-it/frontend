'use client';

import { AlertIcon } from '@/src/components/icons/AlertIcon';
import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';
import { Category, SkillCardDto } from '@/src/types/skill';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';
import { useEffect, useRef } from 'react';
import { LoaderIcon } from 'lucide-react';

type SkillListProps = {
  selectedCategory: Category;
  searchKeyword?: string;
  initialData: SkillCardDto[];
  initialCursorId: number | null;
};

export const SkillList = ({
  selectedCategory,
  searchKeyword,
  initialData,
  initialCursorId,
}: SkillListProps) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['skills', selectedCategory, searchKeyword || ''],
      queryFn: async ({ pageParam }) => {
        const res = await api.get<{
          data: { skills: SkillCardDto[]; nextCursorId: number | null };
        }>(`/market/skills`, {
          params: {
            size: pageParam.size,
            cursorId: pageParam.cursor,
            category: selectedCategory !== 'ALL' ? selectedCategory : undefined,
            keyword: searchKeyword,
          },
        });
        return res.data.data;
      },
      initialData: {
        pages: [{ skills: initialData, nextCursorId: initialCursorId }],
        pageParams: [
          {
            cursor: undefined,
            size: 11,
          },
        ],
      },
      initialPageParam: {
        cursor: undefined,
        size: 11,
      } as {
        cursor?: number;
        size: number;
      },
      getNextPageParam: (lastPage) =>
        lastPage.nextCursorId
          ? {
              cursor: lastPage.nextCursorId,
              size: 12,
            }
          : undefined,
    });

  const list = data ? data.pages.flatMap((page) => page.skills) : initialData;

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '200px',
      },
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <>
      {list && list.length > 0 && (
        <>
          <ul className="grid grid-cols-4 gap-4">
            {list.slice(0, 3).map((skill) => (
              <SkillCard key={skill.skillId} skill={skill} />
            ))}
            {list.length < 3 &&
              Array.from({ length: 3 - list.length }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}

            <CardBanner />
            {list.slice(3).map((skill) => (
              <SkillCard key={skill.skillId} skill={skill} />
            ))}
          </ul>
          <div ref={loadMoreRef} />
          {isFetchingNextPage && (
            <LoaderIcon className="mx-auto mt-10 animate-spin text-gray-700" />
          )}
        </>
      )}
      {(!list || list.length === 0) && (
        <div className="bg-brand-100 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl text-gray-400">
          <AlertIcon size={24} />
          <span className="text-center leading-[1.5] font-semibold whitespace-pre-wrap">{`아직 게시글이 없네요.\n게시글을 올려 게시판에 등록해보세요!`}</span>
        </div>
      )}
    </>
  );
};
