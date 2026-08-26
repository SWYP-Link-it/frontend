'use client';

import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';
import { Category, SkillCardDto } from '@/src/types/skill';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';
import { LoaderIcon } from 'lucide-react';
import { Virtuoso } from 'react-virtuoso';
import { useCallback, useEffect, useRef, useState } from 'react';

const COLUMN_COUNT = 4;
type SkillListItem = SkillCardDto | 'banner' | null;

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
  const containerRef = useRef<HTMLDivElement>(null);

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
            searchKeyword,
          },
        });
        return res.data.data;
      },
      initialData: {
        pages: [{ skills: initialData, nextCursorId: initialCursorId }],
        pageParams: [{ cursor: undefined, size: 19 }],
      },
      initialPageParam: {
        cursor: undefined as number | undefined,
        size: 19,
      },
      getNextPageParam: (lastPage) =>
        lastPage.nextCursorId
          ? { cursor: lastPage.nextCursorId, size: 20 }
          : undefined,
    });

  const list = data ? data.pages.flatMap((page) => page.skills) : initialData;

  const rows: SkillListItem[][] = [];
  if (list.length > 0) {
    rows.push([list[0] ?? null, list[1] ?? null, list[2] ?? null, 'banner']);
    for (let index = 3; index < list.length; index += COLUMN_COUNT) {
      rows.push(list.slice(index, index + COLUMN_COUNT));
    }
  }

  const [scrollParent, setScrollParent] = useState<HTMLElement | undefined>(
    undefined,
  );

  // 컴포넌트가 마운트된 후, 자신을 감싼 가장 가까운 스크롤 가능한 부모 요소를 찾음
  useEffect(() => {
    if (containerRef.current) {
      const parent = containerRef.current.closest<HTMLElement>(
        '.overflow-y-auto, main, body',
      );
      if (parent) {
        setScrollParent(parent);
      }
    }
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div ref={containerRef} className="w-full">
      {list && list.length > 0 && (
        <Virtuoso
          customScrollParent={scrollParent}
          data={rows}
          endReached={handleEndReached}
          overscan={200}
          defaultItemHeight={234}
          itemContent={(index, rowItems) => (
            <div className="grid grid-cols-4 gap-4 pb-4">
              {rowItems.map((item, columnIndex) => {
                if (item === 'banner') return <CardBanner key="banner" />;
                if (!item) return <div key={`empty-${columnIndex}`} />;
                return <SkillCard key={item.skillId} skill={item} />;
              })}
            </div>
          )}
          components={{
            Footer: () => (
              <div className="flex h-20 items-center justify-center">
                {isFetchingNextPage && (
                  <LoaderIcon className="animate-spin text-gray-700" />
                )}
              </div>
            ),
          }}
        />
      )}
    </div>
  );
};
