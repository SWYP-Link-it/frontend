'use client';

import { useState } from 'react';
import { ExchangeType } from '@/src/types/profile';
import { TimeSelectModal } from './TimeSelectModal';

interface PreferenceEditItemProps {
  activeDay: string;
  times: { dayOfWeek: string; startTime: string; endTime: string }[];
  exchangeType: ExchangeType;
  location: { region: string; detail: string };
  onTimesChange: (
    times: { dayOfWeek: string; startTime: string; endTime: string }[],
  ) => void;
  onExchangeChange: (type: ExchangeType) => void;
  onLocationChange: (loc: { region: string; detail: string }) => void;
}

export const PreferenceEditItem = ({
  activeDay,
  times,
  exchangeType,
  location,
  onTimesChange,
  onExchangeChange,
  onLocationChange,
}: PreferenceEditItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const regions = [
    '서울',
    '경기도',
    '강원도',
    '충청도',
    '경상도',
    '전라도',
    '제주도',
  ];

  const currentDayTimes = times
    .filter((t) => t.dayOfWeek === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const formatTime = (timeStr: string) => {
    const [hh, mm] = timeStr.split(':');
    return `${hh}시 ${mm}분`;
  };

  const isOfflineSelected =
    exchangeType === 'OFFLINE' || exchangeType === 'BOTH';
  const isOnlineSelected = exchangeType === 'ONLINE' || exchangeType === 'BOTH';

  // 진행 방식 토글 로직 (하나만 선택된 상태에서도 해제 가능하도록 수정)
  const handleToggleExchange = (type: 'ONLINE' | 'OFFLINE') => {
    let nextIsOnline = isOnlineSelected;
    let nextIsOffline = isOfflineSelected;

    if (type === 'ONLINE') {
      nextIsOnline = !isOnlineSelected;
    } else {
      nextIsOffline = !isOfflineSelected;
    }

    let nextType: ExchangeType = 'NONE';
    if (nextIsOnline && nextIsOffline) nextType = 'BOTH';
    else if (nextIsOnline) nextType = 'ONLINE';
    else if (nextIsOffline) nextType = 'OFFLINE';
    else nextType = 'NONE';

    onExchangeChange(nextType);
  };

  const handleDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z가-힣\s]*$/;
    if (regex.test(value) && value.length <= 15) {
      onLocationChange({ ...location, detail: value });
    }
  };

  return (
    <div className="space-y-8">
      {/* 가능 시간대 칩 영역 */}
      <div className="relative">
        <label className="mb-3 block text-sm font-bold text-gray-900">
          가능 시간대
        </label>
        {currentDayTimes.length > 0 ? (
          <div className="flex min-h-[90px] w-full items-start justify-between rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
            <div className="mr-4 grid flex-1 grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {currentDayTimes.map((slot, idx) => (
                <div
                  key={`${slot.dayOfWeek}-${slot.startTime}-${idx}`}
                  className="rounded-xl border border-gray-100 bg-white px-2 py-3 text-center text-[13px] font-bold text-gray-500 shadow-sm"
                >
                  {formatTime(slot.startTime)}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-1 shrink-0 p-2 text-gray-300 transition-colors hover:text-blue-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group flex h-24 w-full items-center justify-center rounded-[32px] border-2 border-dashed border-gray-100 text-gray-300 transition-all hover:border-blue-100 hover:bg-gray-50"
          >
            <svg
              className="h-10 w-10 transition-transform group-hover:scale-110"
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

      {/* 진행 방식 선택 */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-900">
          진행 방식 (중복 선택 가능)
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleToggleExchange('OFFLINE')}
            className={`rounded-2xl border py-5 text-base font-bold transition-all ${
              isOfflineSelected
                ? 'border-blue-400 bg-white text-blue-500 shadow-lg shadow-blue-50'
                : 'border-gray-100 bg-white text-gray-300 hover:border-gray-200'
            }`}
          >
            오프라인
          </button>
          <button
            type="button"
            onClick={() => handleToggleExchange('ONLINE')}
            className={`rounded-2xl border py-5 text-base font-bold transition-all ${
              isOnlineSelected
                ? 'border-blue-400 bg-white text-blue-500 shadow-lg shadow-blue-50'
                : 'border-gray-100 bg-white text-gray-300 hover:border-gray-200'
            }`}
          >
            온라인
          </button>
        </div>
      </div>

      {/* 지역 및 세부 위치 (오프라인 선택 시에만 활성화) */}
      {isOfflineSelected && (
        <div className="animate-in fade-in slide-in-from-top-2 grid grid-cols-2 gap-6 duration-300">
          <div className="space-y-3">
            <label className="ml-1 text-sm font-bold text-gray-900">
              선호 지역
            </label>
            <div className="relative">
              <select
                value={location.region}
                onChange={(e) =>
                  onLocationChange({ ...location, region: e.target.value })
                }
                className="w-full appearance-none rounded-[15px] border-2 border-gray-100 bg-white p-[14px] pr-10 text-base font-medium transition-all outline-none focus:border-blue-400"
              >
                <option value="" disabled>
                  지역 선택
                </option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <label className="ml-1 text-sm font-bold text-gray-900">
              세부 위치
            </label>
            <div className="relative">
              <input
                type="text"
                value={location.detail}
                onChange={handleDetailChange}
                placeholder="예: 강남역 부근"
                className="w-full rounded-[15px] border-2 border-gray-100 bg-white p-[14px] text-base font-medium transition-all outline-none placeholder:text-gray-300 focus:border-blue-400"
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2 text-[11px] font-bold text-gray-300">
                {location.detail.length}/15
              </span>
            </div>
            <p className="ml-1 text-[11px] text-gray-400">
              * 한글, 영어만 입력 가능 (15자 이내)
            </p>
          </div>
        </div>
      )}

      <TimeSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeDay={activeDay}
        onSave={(newSchedules) => {
          const affectedDays = Array.from(
            new Set(newSchedules.map((s) => s.dayOfWeek)),
          );
          const remainingTimes = times.filter(
            (t) => !affectedDays.includes(t.dayOfWeek),
          );
          onTimesChange([...remainingTimes, ...newSchedules]);
        }}
      />
    </div>
  );
};
