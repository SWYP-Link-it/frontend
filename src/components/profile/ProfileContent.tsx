'use client';

import { useRouter } from 'next/navigation';
import { SkillItem } from './SkillItem';
import { ProfileData } from '@/src/types/profile';

interface ProfileContentProps {
  data: ProfileData | null;
  onWithdrawClick: () => void;
}

const REGION_MAP: Record<string, string> = {
  SEOUL: '서울',
  GYEONGGI: '경기도',
  GANGWON: '강원도',
  CHUNGCHEONG: '충청도',
  GYEONGSANG: '경상도',
  JEOLLA: '전라도',
  JEJU: '제주도',
};
const SectionHeader = ({
  title,
  showEdit = true,
  onEdit,
}: {
  title: string;
  showEdit?: boolean;
  onEdit?: () => void;
}) => (
  <div className="mb-4 flex items-center justify-between">
    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
    {showEdit && (
      <button
        onClick={onEdit}
        className="text-sm text-gray-400 hover:text-gray-600"
      >
        편집
      </button>
    )}
  </div>
);
export const ProfileContent = ({
  data,
  onWithdrawClick,
}: ProfileContentProps) => {
  const router = useRouter();

  const activeDays = data?.availableSchedules?.map((s) => s.dayOfWeek) || [];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-6 border-b border-gray-100 pb-2 text-lg font-bold text-gray-900">
          내 스킬
        </h2>

        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="경력과 경험"
            onEdit={() => router.push('/profile/edit')}
          />
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-lg border border-gray-100 bg-gray-50" />
            <div className="flex-1 text-sm text-gray-600">
              {data?.experienceDescription ? (
                data.experienceDescription
              ) : (
                <span className="text-gray-400">경력과 경험을 적어주세요.</span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="스킬"
            onEdit={() => router.push('/profile/edit')}
          />
          {data?.skills && data.skills.length > 0 ? (
            <div className="space-y-4">
              {data.skills.map((skill, idx) => (
                <SkillItem key={skill.id || idx} skill={skill} />
              ))}
            </div>
          ) : (
            <button
              onClick={() => router.push('/profile/edit')}
              className="flex w-full items-center justify-center rounded-lg border border-dashed border-gray-200 py-3 text-gray-400 transition-colors hover:bg-gray-50"
            >
              <svg
                className="mr-1 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="선호 시간대"
            onEdit={() => router.push('/profile/edit')}
          />
          <div className="mb-4 flex flex-wrap gap-2">
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
              <div
                key={day}
                className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-medium ${
                  activeDays.includes(day)
                    ? 'border-blue-200 bg-blue-50 text-blue-600'
                    : 'border-gray-100 bg-white text-gray-400'
                }`}
              >
                {day}
              </div>
            ))}
          </div>
          {data?.availableSchedules && data.availableSchedules.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {data.availableSchedules.map((s, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-2 text-sm text-gray-600"
                >
                  {s.dayOfWeek} {s.startTime} ~ {s.endTime}
                </div>
              ))}
            </div>
          ) : (
            <button
              onClick={() => router.push('/profile/edit')}
              className="flex w-full items-center justify-center rounded-lg border border-dashed border-gray-200 py-3 text-gray-400 transition-colors hover:bg-gray-50"
            >
              <svg
                className="mr-1 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <SectionHeader
            title="교환 방법"
            onEdit={() => router.push('/profile/edit')}
          />
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div
              className={`rounded-lg border py-3 text-center text-sm font-medium ${
                data?.exchangeType === 'OFFLINE' ||
                data?.exchangeType === 'BOTH'
                  ? 'border-blue-200 bg-blue-50 text-blue-600'
                  : 'border-gray-100 bg-white text-gray-300'
              }`}
            >
              오프라인
            </div>
            <div
              className={`rounded-lg border py-3 text-center text-sm font-medium ${
                data?.exchangeType === 'ONLINE' || data?.exchangeType === 'BOTH'
                  ? 'border-blue-200 bg-blue-50 text-blue-600'
                  : 'border-gray-100 bg-white text-gray-300'
              }`}
            >
              온라인
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-2 text-xs font-bold text-gray-900">선호 지역</p>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600">
                {data?.preferredRegion
                  ? REGION_MAP[data.preferredRegion] || data.preferredRegion
                  : '경기도'}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold text-gray-900">세부 위치</p>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600">
                {data?.detailedLocation || '용인시'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-100 pt-8">
        <h3 className="text-lg font-bold text-gray-900">계정 설정</h3>
        <div className="group flex cursor-pointer items-center justify-between">
          <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">
            약관 및 개인정보 처리 동의
          </span>
          <svg
            className="h-5 w-5 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="9 5l7 7-7 7"
            />
          </svg>
        </div>
        <button
          onClick={onWithdrawClick}
          className="text-sm font-medium text-gray-300 hover:text-red-400"
        >
          서비스 탈퇴
        </button>
      </div>
    </div>
  );
};
