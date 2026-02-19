'use client';

import { useState, useMemo } from 'react';
import { ProfileTab } from '@/src/components/profile/ProfileTab';
import { ReviewCard } from '@/src/components/profile/ReviewCard';
import { Star } from 'lucide-react';
import { useReview } from '@/src/hooks/useReview';

export default function ProfileReviewPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'written'>(
    'received',
  );
  const [filter, setFilter] = useState('전체');

  const { allReviews, isLoading, deleteReview, hasNextPage, fetchNextPage } =
    useReview(activeTab);

  const dynamicCategories = useMemo(() => {
    if (allReviews.length === 0) return ['전체'];
    const skillNames = allReviews.map((review: any) => review.skillName);
    return ['전체', ...Array.from(new Set(skillNames))];
  }, [allReviews]);

  const filteredReviews = useMemo(() => {
    if (filter === '전체') return allReviews;
    return allReviews.filter((review: any) => review.skillName === filter);
  }, [allReviews, filter]);

  const hasReviews = filteredReviews.length > 0;

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="w-full px-28">
        <div className="mx-auto my-6 flex max-w-284 flex-col justify-center">
          <h1 className="text-[24px] font-semibold text-gray-800">내 리뷰</h1>
          <p className="text-[12px] text-gray-400">
            받은 리뷰와 작성한 리뷰를 확인하세요
          </p>
        </div>
      </div>

      <div className="w-full flex-1 px-28 pb-[126px]">
        <div className="mx-auto flex max-w-284">
          <aside className="sticky top-[100px] mr-[100px] w-full max-w-64 flex-shrink-0">
            <ProfileTab />
          </aside>

          <div className="flex-1">
            <div className="mb-8 flex justify-end">
              <div className="flex w-fit rounded-2xl bg-gray-100 p-1">
                <button
                  onClick={() => {
                    setActiveTab('received');
                    setFilter('전체');
                  }}
                  className={`flex items-center justify-center rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                    activeTab === 'received'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  받은 리뷰
                </button>
                <button
                  onClick={() => {
                    setActiveTab('written');
                    setFilter('전체');
                  }}
                  className={`flex items-center justify-center rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                    activeTab === 'written'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  작성한 리뷰
                </button>
              </div>
            </div>

            {activeTab === 'received' && (
              <div className="mb-8 flex items-start justify-between">
                <div className="flex flex-wrap gap-2">
                  {dynamicCategories.map((cat: any) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${
                        filter === cat
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {hasReviews && (
                  <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                    <span className="mb-1 text-[10px] font-bold text-gray-400 uppercase">
                      평균 평점
                    </span>
                    <span className="text-2xl font-black text-gray-900">
                      4.6
                    </span>
                    <div className="mt-1 flex gap-0.5 text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          fill={i < 4 ? 'currentColor' : 'transparent'}
                          className={i < 4 ? '' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {isLoading ? (
              <div className="py-20 text-center text-gray-400">로딩 중...</div>
            ) : (
              <div className="flex flex-col gap-4">
                {hasReviews ? (
                  <>
                    {filteredReviews.map((review: any) => (
                      <ReviewCard
                        key={review.reviewId}
                        review={review}
                        showActions={activeTab === 'written'}
                        onDelete={(id) => deleteReview.mutate(id)}
                      />
                    ))}
                    {hasNextPage && (
                      <button
                        onClick={() => fetchNextPage()}
                        className="mt-8 self-center rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        리뷰 더 불러오기
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex h-[400px] flex-col items-center justify-center text-gray-300">
                    <p className="text-sm font-medium">리뷰 내역이 없습니다.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
