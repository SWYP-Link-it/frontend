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

  const getMergedDisplayTimes = () => {
    const dayTimes = times
      .filter((t) => t.dayOfWeek === activeDay)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    if (dayTimes.length === 0) return [];

    const merged = [];
    let current = { ...dayTimes[0] };

    for (let i = 1; i < dayTimes.length; i++) {
      const next = dayTimes[i];
      if (current.endTime.substring(0, 5) === next.startTime.substring(0, 5)) {
        current.endTime = next.endTime;
      } else {
        merged.push(current);
        current = { ...next };
      }
    }
    merged.push(current);
    return merged;
  };

  const currentDayTimes = getMergedDisplayTimes();

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
    let nextType: ExchangeType = null;
    if (nextIsOnline && nextIsOffline) nextType = 'BOTH';
    else if (nextIsOnline) nextType = 'ONLINE';
    else if (nextIsOffline) nextType = 'OFFLINE';
    if (!nextIsOffline) onLocationChange({ region: '', detail: '' });
    onExchangeChange(nextType);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex min-h-[90px] w-full items-start justify-between bg-white py-6">
          {currentDayTimes.length > 0 ? (
            <div className="mr-4 grid grid-cols-2 justify-between gap-3 md:grid-cols-3">
              {currentDayTimes.map((slot, idx) => (
                <div
                  key={idx}
                  className="rounded-[8px] border border-blue-100 bg-blue-50/50 px-4 py-2 text-center text-sm font-medium text-blue-600"
                >
                  {formatTimeRange(slot.startTime, slot.endTime)}
                </div>
              ))}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="h-[48px] w-full rounded-[12px] border border-gray-200 text-xl text-gray-300"
            >
              +
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
      <div className="space-y-4">
        <label className="block text-lg font-bold text-gray-900">
          교환 정보
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
          onTimesChange(newSchedules);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};
