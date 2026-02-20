'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CreditHistoryTable } from '@/src/components/profile/CreditHistoryTable';
import { ProfileTab } from '@/src/components/profile/ProfileTab';
import { useCredit } from '@/src/hooks/useCredit';

export default function CreditPage() {
  const {
    balance,
    history,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useCredit();

  const [filter, setFilter] = useState<'all' | 'ADD' | 'USE'>('all');

  const filteredTransactions = history.filter((tx: any) => {
    if (filter === 'ADD') {
      return ['리워드', '정산', '취소', '거절'].includes(tx.statusLabel);
    }
    if (filter === 'USE') {
      return tx.statusLabel === '요청';
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center text-gray-400">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white">
      <div className="w-full px-28">
        <div className="mx-auto my-6 flex max-w-284 flex-col justify-center">
          <h1 className="text-[24px] font-semibold text-gray-800">
            크레딧 정보
          </h1>
          <p className="text-[12px] text-gray-400">
            현재 보유 크레딧과 이용 내역을 확인하세요.
          </p>
        </div>
      </div>

      <div className="w-full px-28 pb-[126px]">
        <div className="mx-auto flex max-w-284">
          <aside className="sticky top-[100px] mr-[100px] w-full max-w-64 flex-shrink">
            <ProfileTab />
          </aside>

          <div className="flex-1">
            <div className="mb-6 bg-white">
              <h2 className="mb-4 border-b border-gray-100 pb-3 text-xl font-bold text-gray-800">
                내 크레딧
              </h2>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border border-blue-100 bg-blue-50">
                    <Image
                      src="/icons/avatar.svg"
                      alt="profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">
                      {balance?.userNickname || '사용자'}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-4 w-5 items-center justify-center">
                    <Image
                      src="/icons/credit.svg"
                      alt="credit"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    내 크레딧 {(balance?.creditBalance || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <h2 className="mt-20 mb-6 border-b border-gray-100 pb-3 text-xl font-bold text-gray-800">
              크레딧 이용 내역
            </h2>
            <div className="mb-8 flex justify-end">
              <div className="inline-flex rounded-xl bg-gray-100 p-1">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'ADD', label: '받은 내역' },
                  { id: 'USE', label: '사용한 내역' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setFilter(btn.id as any)}
                    className={`px-4 py-1.5 text-xs font-bold transition-all duration-200 ${
                      filter === btn.id
                        ? 'rounded-lg bg-white text-gray-900 shadow-sm'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            <CreditHistoryTable transactions={filteredTransactions} />

            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  {isFetchingNextPage ? '로딩 중...' : '더 불러오기'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
