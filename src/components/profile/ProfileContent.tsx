'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SkillItem } from './SkillItem';
import { ProfileData } from '@/src/types/profile';
import { useAuthStore } from '@/src/stores/authStore';
import { WithdrawalModal } from '../edit/WithdrawalModal';
import { REGION_LABELS, REGION_MAP } from '@/src/constants/profile';

interface ProfileContentProps {
  data: ProfileData | null;
  onWithdrawClick?: () => void;
}

const SectionHeader = ({
  title,
  showEdit = true,
  onEdit,
}: {
  title: string;
  showEdit?: boolean;
  onEdit?: () => void;
}) => (
  <div className="flex items-center justify-between pb-6">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
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

  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const withdraw = useAuthStore((state) => state.withdraw);

  const activeDays = data?.availableSchedules?.map((s) => s.dayOfWeek) || [];

  const handleWithdrawConfirm = async () => {
    try {
      await withdraw();
      setIsWithdrawModalOpen(false);
    } catch (error) {
      console.error('탈퇴 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mt-20 mb-3 border-b border-gray-100 pb-3 text-xl font-bold text-gray-800">
          내 스킬
        </h2>

        <div className="mb-5 rounded-xl border border-gray-100 bg-white p-6">
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
                <>
                  <span className="text-gray-400">
                    경력과 경험을 적어주세요.
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-gray-100 bg-white p-6">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="mb-5 rounded-xl border border-gray-100 bg-white p-6">
          <SectionHeader
            title="선호 시간대"
            onEdit={() => router.push('/profile/edit')}
          />

          <div className="mb-5 flex w-full items-center gap-1 rounded-xl bg-gray-50/80 p-1.5">
            {['월', '화', '수', '목', '금', '토', '일'].map((day) => {
              const isActive = activeDays.includes(day);
              return (
                <div
                  key={day}
                  className={`text-gray-40 flex flex-1 items-center justify-center rounded-lg px-9 py-1 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white font-semibold text-gray-800'
                      : 'text-gray-400'
                  }`}
                >
                  {day}
                </div>
              );
            })}
          </div>

          {data?.availableSchedules && data.availableSchedules.length > 0 ? (
            <div className="space-y-3">
              {['월', '화', '수', '목', '금', '토', '일'].map((day) => {
                const daySchedules = data.availableSchedules
                  .filter((s) => s.dayOfWeek === day)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime));

                if (daySchedules.length === 0) return null;

                return (
                  <div key={day} className="flex flex-wrap gap-2">
                    {daySchedules.map((s, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600"
                      >
                        <span className="font-bold text-gray-900">
                          {s.dayOfWeek}
                        </span>
                        <span>
                          {s.startTime} ~ {s.endTime}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-6">
          <SectionHeader
            title="교환 방법"
            onEdit={() => router.push('/profile/edit')}
          />
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div
              className={`rounded-lg border py-3 text-center text-sm font-medium ${
                data?.exchangeType === 'OFFLINE' ||
                data?.exchangeType === 'BOTH'
                  ? 'text-brand-600 border-brand-600'
                  : 'border-gray-100 bg-white text-gray-300'
              }`}
            >
              오프라인
            </div>
            <div
              className={`rounded-lg border py-3 text-center text-sm font-medium ${
                data?.exchangeType === 'ONLINE' || data?.exchangeType === 'BOTH'
                  ? 'text-brand-600 border-brand-600'
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
                  ? REGION_LABELS[data.preferredRegion] || data.preferredRegion
                  : '지역 정보 없음'}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold text-gray-900">세부 위치</p>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-sm text-gray-600">
                {data?.detailedLocation || '위치 정보 없음'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-100 py-8">
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        <button
          onClick={() => setIsWithdrawModalOpen(true)}
          className="text-sm font-medium text-gray-300 hover:text-red-400"
        >
          서비스 탈퇴
        </button>
      </div>

      <WithdrawalModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdrawConfirm}
      />
    </div>
  );
};
