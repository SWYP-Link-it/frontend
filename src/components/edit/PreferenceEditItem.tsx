'use client';

import { useState } from 'react';
import { ExchangeType } from '@/src/types/profile';
import { TimeSelectModal } from './TimeSelectModal';
import { REGION_MAP } from '@/src/constants/profile';

interface PreferenceEditItemProps {
  activeDay: string;
  times: { dayOfWeek: string; startTime: string; endTime: string }[];
  exchangeType: ExchangeType;
  location: { region: string; detail: string };
  onTimesChange: (times: any[]) => void;
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

  // 현재 선택된 요일의 시간대를 가져와서 시작 시간 순으로 정렬
  const currentDayTimes = times
    .filter((t) => t.dayOfWeek === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const formatTimeRange = (start: string, end: string) => {
    const s = start.substring(0, 5);
    const e = end.substring(0, 5);
    return `${s} ~ ${e}`;
  };

  const isOfflineSelected =
    exchangeType === 'OFFLINE' || exchangeType === 'BOTH';
  const isOnlineSelected = exchangeType === 'ONLINE' || exchangeType === 'BOTH';

  const handleToggleExchange = (type: 'ONLINE' | 'OFFLINE') => {
    let nextIsOnline = isOnlineSelected;
    let nextIsOffline = isOfflineSelected;
    if (type === 'ONLINE') nextIsOnline = !isOnlineSelected;
    else nextIsOffline = !isOfflineSelected;

    let nextType: ExchangeType = 'NONE';
    if (nextIsOnline && nextIsOffline) nextType = 'BOTH';
    else if (nextIsOnline) nextType = 'ONLINE';
    else if (nextIsOffline) nextType = 'OFFLINE';
    onExchangeChange(nextType);
  };

  return (
    <div className="space-y-8">
      <div>
        <label className="mb-3 block text-sm font-bold text-gray-900">
          가능 시간대 ({activeDay}요일)
        </label>
        <div className="flex min-h-[90px] w-full items-start justify-between rounded-[32px] border border-gray-100 bg-white p-6 shadow-sm">
          {currentDayTimes.length > 0 ? (
            <div className="mr-4 grid flex-1 grid-cols-2 gap-3 md:grid-cols-3">
              {/* 텍스트가 길어지므로 그리드 수를 줄임 */}
              {currentDayTimes.map((slot, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-blue-50 bg-blue-50/30 px-2 py-3 text-center text-[13px] font-bold text-blue-600 shadow-sm"
                >
                  {formatTimeRange(slot.startTime, slot.endTime)}
                </div>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="flex h-12 w-full items-center justify-center text-gray-300 italic"
            >
              시간대를 등록해주세요 +
            </button>
          )}
          {currentDayTimes.length > 0 && (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mt-1 shrink-0 p-2 text-gray-400 transition-colors hover:text-blue-500"
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
          )}
        </div>
      </div>

      {/* 진행 방식 및 지역 선택 (기존과 동일) */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-900">
          진행 방식
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleToggleExchange('OFFLINE')}
            className={`rounded-2xl border py-5 font-bold transition-all ${isOfflineSelected ? 'border-blue-400 bg-white text-blue-500 shadow-lg' : 'border-gray-100 text-gray-300'}`}
          >
            오프라인
          </button>
          <button
            type="button"
            onClick={() => handleToggleExchange('ONLINE')}
            className={`rounded-2xl border py-5 font-bold transition-all ${isOnlineSelected ? 'border-blue-400 bg-white text-blue-500 shadow-lg' : 'border-gray-100 text-gray-300'}`}
          >
            온라인
          </button>
        </div>
      </div>

      {isOfflineSelected && (
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-900">선호 지역</label>
            <select
              value={location.region}
              onChange={(e) =>
                onLocationChange({ ...location, region: e.target.value })
              }
              className="w-full rounded-[15px] border-2 border-gray-100 p-[14px] outline-none focus:border-blue-400"
            >
              <option value="" disabled>
                지역 선택
              </option>
              {Object.entries(REGION_MAP).map(([kor, eng]) => (
                <option key={eng} value={eng}>
                  {kor}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-900">세부 위치</label>
            <input
              type="text"
              value={location.detail}
              onChange={(e) =>
                onLocationChange({ ...location, detail: e.target.value })
              }
              placeholder="예: 강남역 부근"
              className="w-full rounded-[15px] border-2 border-gray-100 p-[14px] outline-none focus:border-blue-400"
            />
          </div>
        </div>
      )}

      <TimeSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activeDay={activeDay}
        initialTimes={times}
        onSave={(newSchedules) => {
          const affectedDays = Array.from(
            new Set(newSchedules.map((s) => s.dayOfWeek)),
          );
          const remainingTimes = times.filter(
            (t) => !affectedDays.includes(t.dayOfWeek),
          );
          onTimesChange([...remainingTimes, ...newSchedules]);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
