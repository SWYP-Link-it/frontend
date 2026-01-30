'use client';
import { ProfileContent } from '@/src/components/profile/ProfileContent';
import { ProfileTabs } from '@/src/components/profile/ProfileTab';
import { useState } from 'react';

// TODO: API 연동 시 이 데이터를 서버에서 받아온 데이터로 교체
const MOCK_USER_DATA = {
  name: '프로덕트디자이너준비러',
  credits: 30,
  experience: {
    title: '빅테크기업 주니어 디자이너 1년차',
    icon: '🏢',
  },
  skills: [
    {
      id: 1,
      category: '디자인 · 크리에이티브',
      tag: '그래픽 디자인',
      level: '상',
      description:
        '진행한 프로젝트, 직무와 연관된 경험을 자세히 작성해 보세요. 진행한 프로젝트, 직무와 연관된 경험을',
    },
    {
      id: 2,
      category: '디자인 · 크리에이티브',
      tag: '그래픽 디자인',
      level: '상',
      description:
        '진행한 프로젝트, 직무와 연관된 경험을 자세히 작성해 보세요. 진행한 프로젝트, 직무와 연관된 경험을',
    },
    {
      id: 3,
      category: '디자인 · 크리에이티브',
      tag: '그래픽 디자인',
      level: '상',
      description:
        '진행한 프로젝트, 직무와 연관된 경험을 자세히 작성해 보세요. 진행한 프로젝트, 직무와 연관된 경험을',
    },
  ],
  availability: {
    days: ['월', '화', '수', '목', '금', '토', '일'],
    selectedDay: '월',
    slots: [
      '21시 30분 ~ 22시 00분',
      '21시 30분 ~ 22시 00분',
      '21시 30분 ~ 22시 00분',
      '21시 30분 ~ 22시 00분',
    ],
  },
  exchangeMethod: {
    type: 'offline' as 'online' | 'offline',
    preferredRegion: '경기도 용인시',
    preferredLocation: '경기도 용인시',
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'credits'>('profile');
  return (
    <div className="flex flex-col bg-white px-[112px]">
      <div className="flex h-[100px] shrink-0 flex-col justify-center gap-1">
        <h2 className="text-2xl font-bold text-gray-800">메세지</h2>
        <p className="text-xs text-gray-400">채팅으로 궁금한 걸 묻고 답해요</p>
      </div>
      <div className="flex">
        <aside className="sticky top-[100px] flex h-[calc(100vh-100px)] w-[270px] flex-col self-start overflow-y-auto">
          <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </aside>

        <main className="flex-1 bg-white">
          <div className="w-full pl-[100px]">
            <h3 className="mb-6 text-lg font-bold text-gray-900">내 프로필</h3>

            {activeTab === 'profile' ? (
              <>
                <div className="mt-4 mb-10 flex cursor-pointer items-center justify-between rounded-xl bg-gray-50 p-5 transition-colors hover:bg-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-lg">
                      💳
                    </div>
                    <span className="font-semibold text-gray-800">
                      내 크레딧 {MOCK_USER_DATA.credits}
                    </span>
                  </div>
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                <h3 className="mb-6 text-lg font-bold text-gray-900">
                  내 프로필
                </h3>

                <ProfileContent data={MOCK_USER_DATA} />
              </>
            ) : (
              <div className="flex h-[400px] flex-col items-center justify-center text-gray-400">
                <p>크레딧 내역이 없습니다.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
