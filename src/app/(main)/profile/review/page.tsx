'use client';

import { useState, useMemo } from 'react';
import { ProfileTab } from '@/src/components/profile/ProfileTab';
import { ReviewCard } from '@/src/components/profile/ReviewCard';
import { useReview } from '@/src/hooks/useReview';
import { BaseModal } from '@/src/components/BaseModal';
import { SkillReviewModalContent } from '@/src/components/request/SkillReviewModalContent';
import { DeleteConfirmModal } from '@/src/components/edit/DeleteConfirmModal';
import { useQueryClient } from '@tanstack/react-query';
import { ReviewStats } from '@/src/components/profile/ReviewStats';

export default function ProfileReviewPage() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'received' | 'written'>(
    'received',
  );
  const [filter, setFilter] = useState('전체');
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  const handleEditClick = (review: any) => {
    setSelectedReview(review);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (review: any) => {
    setSelectedReview(review);
    setIsDeleteModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-white py-20 text-center text-gray-400">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      <div className="w-full bg-white px-28">
        <div className="mx-auto my-6 flex max-w-284 flex-col justify-center">
          <h1 className="text-[24px] font-semibold text-gray-800">내 리뷰</h1>
          <p className="text-[12px] text-gray-400">
            받은 리뷰와 작성한 리뷰를 확인하세요
          </p>
        </div>
      </div>

      <div className="w-full flex-1 bg-white px-28 pb-[126px]">
        <div className="mx-auto flex h-full max-w-284 items-start">
          <aside className="sticky top-[100px] mr-[100px] w-full max-w-64 flex-shrink-0">
            <ProfileTab />
          </aside>

          <div className="min-w-0 flex-1 bg-white">
            <div className="mb-8 flex justify-end">
              <div className="flex w-fit rounded-2xl bg-gray-100 p-1">
                <button
                  onClick={() => {
                    setActiveTab('received');
                    setFilter('전체');
                  }}
                  className={`flex items-center justify-center rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${activeTab === 'received' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-500'}`}
                >
                  받은 리뷰
                </button>
                <button
                  onClick={() => {
                    setActiveTab('written');
                    setFilter('전체');
                  }}
                  className={`flex items-center justify-center rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${activeTab === 'written' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-500'}`}
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
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold transition-all ${filter === cat ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                {hasReviews && (
                  <ReviewStats
                    rating={calculateAverage(
                      filteredReviews.map(({ rating }) => rating),
                    )}
                  />
                )}
              </div>
            )}

            <div className="flex flex-col gap-4 bg-white">
              {hasReviews ? (
                <>
                  {filteredReviews.map((review: any) => (
                    <ReviewCard
                      key={review.reviewId}
                      review={review}
                      showActions={activeTab === 'written'}
                      onDelete={() => handleDeleteClick(review)}
                      onEdit={() => handleEditClick(review)}
                    />
                  ))}
                  {hasNextPage && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => fetchNextPage()}
                        className="rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        리뷰 더 불러오기
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center bg-white text-gray-300">
                  <p className="text-sm font-medium">리뷰 내역이 없습니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BaseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {selectedReview && (
          <SkillReviewModalContent
            reviewId={selectedReview.reviewId}
            skillExchangeId={selectedReview.skillExchangeId}
            skillId={selectedReview.skillId}
            mentorId={selectedReview.mentorId}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['reviews'] });
              setIsEditModalOpen(false);
            }}
            onClose={() => setIsEditModalOpen(false)}
          />
        )}
      </BaseModal>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          if (selectedReview) {
            deleteReview.mutate(selectedReview.reviewId, {
              onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSelectedReview(null);
              },
            });
          }
        }}
      />
    </div>
  );
}

const calculateAverage = (list: number[]) => {
  if (list.length === 0) return 0;

  const sum = list.reduce((acc, cur) => acc + cur, 0);
  return Number((sum / list.length).toFixed(1));
};
