'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProfileTab } from '@/src/components/profile/ProfileTab';
import { Trash2, Edit3, Star } from 'lucide-react';

const MOCK_REVIEWS = {
  received: [
    {
      id: 1,
      name: '김민수',
      category: 'UI/UX 디자인',
      rating: 5.0,
      date: '2024-01-15',
      content:
        '정말 친절하게 알려주셔서 많은 도움이 되었습니다. Figma 사용법부터 실무 팁까지 배울 수 있었어요!',
      tag: 'UI/UX 디자인',
    },
    {
      id: 2,
      name: '박준호',
      category: 'React 개발',
      rating: 4.0,
      date: '2024-01-10',
      content:
        '체계적으로 잘 가르쳐주셨습니다. 초보자도 이해하기 쉽게 설명해주셔서 좋았어요.',
      tag: 'React 개발',
    },
  ],
  written: [
    {
      id: 3,
      name: '이지은',
      category: '영어 회화',
      rating: 5.0,
      date: '2024-01-12',
      content:
        '원어민 수준의 발음으로 자연스러운 회화를 배울 수 있었습니다. 정말 추천합니다!',
    },
    {
      id: 4,
      name: '최수진',
      category: '이탈리안 요리',
      rating: 4.0,
      date: '2024-01-08',
      content:
        '파스타 만드는 법을 배웠는데 정말 맛있었어요. 레시피도 꼼꼼하게 알려주셨습니다.',
    },
  ],
};

export default function ProfileReviewPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'written'>(
    'received',
  );
  const [filter, setFilter] = useState('전체');

  const categories = ['전체', 'UI/UX 디자인', 'React 개발', '기타 연주'];

  return (
    <div className="flex flex-col bg-white">
      <div className="w-full px-28">
        <div className="mx-auto my-6 flex max-w-284 flex-col justify-center">
          <h1 className="text-[24px] font-semibold text-gray-800">내 리뷰</h1>
          <p className="text-[12px] text-gray-400">
            받은 리뷰와 작성한 리뷰를 확인하세요
          </p>
        </div>
      </div>

      <div className="w-full px-28 pb-[126px]">
        <div className="mx-auto flex max-w-284">
          <aside className="sticky top-[100px] mr-[100px] w-full max-w-64 flex-shrink">
            <ProfileTab />
          </aside>

          <div className="flex-1">
            <div className="mb-8 flex justify-end">
              <div className="mb-8 flex w-fit rounded-2xl bg-gray-100 p-1">
                <button
                  onClick={() => setActiveTab('received')}
                  className={`flex items-center justify-center rounded-xl px-4 py-1.5 text-xs font-bold transition-all ${
                    activeTab === 'received'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  받은 리뷰
                </button>
                <button
                  onClick={() => setActiveTab('written')}
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
                <div className="flex gap-2">
                  {categories.map((cat) => (
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
                <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4">
                  <span className="mb-1 text-[10px] font-bold text-gray-400 uppercase">
                    평균 평점
                  </span>
                  <span className="text-2xl font-black text-gray-900">4.6</span>
                  <div className="mt-1 flex gap-0.5 text-orange-400">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star
                      size={12}
                      fill="currentColor"
                      className="text-gray-200"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {MOCK_REVIEWS[activeTab].map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
                        <Image
                          src="/icons/avatar.svg"
                          alt="avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {review.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {activeTab === 'written' && (
                        <div className="flex gap-1.5">
                          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-red-500">
                            <Trash2 size={14} />
                            삭제
                          </button>
                          <button className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900">
                            <Edit3 size={14} />
                            수정
                          </button>
                        </div>
                      )}
                      <span className="text-[12px] text-gray-300">
                        {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-2 flex items-center gap-1">
                      <div className="flex gap-0.5 text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={
                              i < Math.floor(review.rating)
                                ? 'currentColor'
                                : 'transparent'
                            }
                            className={
                              i < Math.floor(review.rating)
                                ? ''
                                : 'text-gray-200'
                            }
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-[13px] font-bold text-gray-400">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-[14px] leading-relaxed text-gray-600">
                      {review.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
