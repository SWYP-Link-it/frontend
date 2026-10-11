'use client';

import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';
import { Category, SkillCardDto } from '@/src/types/skill';
import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';
import { LoaderIcon } from 'lucide-react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from 'react';
import { AlertIcon } from '@/src/components/icons/AlertIcon';

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
        pageParams: [{ cursor: undefined, size: 47 }],
      },
      initialPageParam: {
        cursor: undefined as number | undefined,
        size: 47,
      },
      getNextPageParam: (lastPage) =>
        lastPage.nextCursorId
          ? { cursor: lastPage.nextCursorId, size: 48 }
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

  // TanStack Virtual 설정
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () =>
      containerRef.current?.closest<HTMLElement>(
        '.overflow-y-auto, main, body',
      ) ?? null,
    estimateSize: () => 250, // 각 행의 예상 높이 (px)
    overscan: 7, // 상하로 미리 렌더링할 행의 개수
    initialRect: {
      width: 1200,
      height: 5000,
    },
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  // 스크롤이 끝에 도달했을 때 다음 페이지 로드
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;

    if (
      lastItem.index >= rows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    rows.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <div ref={containerRef} className="h-full w-full">
      {list && list.length > 0 && (
        <div
          className="relative w-full"
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {virtualItems.map((virtualRow) => {
            const rowItems = rows[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                className="absolute top-0 left-0 w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <div className="grid grid-cols-4 gap-4 pb-4">
                  {rowItems.map((item, columnIndex) => {
                    if (item === 'banner') return <CardBanner key="banner" />;
                    if (!item) return <div key={`empty-${columnIndex}`} />;
                    return <SkillCard key={item.skillId} skill={item} />;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(!list || list.length === 0) && (
        <div className="bg-brand-100 flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl text-gray-400">
          <AlertIcon size={24} />
          <span className="text-center leading-[1.5] font-semibold whitespace-pre-wrap">{`아직 게시글이 없네요.\n게시글을 올려 게시판에 등록해보세요!`}</span>
        </div>
      )}
      <div className="flex h-20 items-center justify-center">
        {isFetchingNextPage && (
          <LoaderIcon className="animate-spin text-gray-700" />
        )}
      </div>
    </div>
  );
};
