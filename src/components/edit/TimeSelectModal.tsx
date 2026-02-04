'use client';

import { useState } from 'react'; // useEffect, useCallback 삭제
import { BaseModal } from '../BaseModal';

interface TimeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDay?: string;
  onSave: (
    selectedSchedules: {
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }[],
  ) => void;
}

interface TimeSelectState {
  selectedDay: string;
  selectedTimes: string[];
  applyMode: 'none' | 'weekdays' | 'all';
}

export const TimeSelectModal = ({
  isOpen,
  onClose,
  activeDay = '월',
  onSave,
}: TimeSelectModalProps) => {
  // 린트 에러의 주범인 useEffect와 resetState를 삭제했습니다.
  // 대신 useState의 초기값으로 props를 직접 사용합니다.
  const [state, setState] = useState<TimeSelectState>({
    selectedDay: activeDay,
    selectedTimes: [],
    applyMode: 'none',
  });

  const [expandedSections, setExpandedSections] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const sections = [
    {
      label: '오전 00시 ~ 05시',
      slots: [
        '00:00',
        '00:30',
        '01:00',
        '01:30',
        '02:00',
        '02:30',
        '03:00',
        '03:30',
        '04:00',
        '04:30',
        '05:00',
        '05:30',
      ],
    },
    {
      label: '오전 06시 ~ 11시',
      slots: [
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
      ],
    },
    {
      label: '오후 12시 ~ 17시',
      slots: [
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
      ],
    },
    {
      label: '오후 18시 ~ 24시',
      slots: [
        '18:00',
        '18:30',
        '19:00',
        '19:30',
        '20:00',
        '20:30',
        '21:00',
        '21:30',
        '22:00',
        '22:30',
        '23:00',
        '23:30',
      ],
    },
  ];

  const handleDayChange = (day: string) => {
    setState((prev) => ({ ...prev, selectedDay: day }));
  };

  const toggleTime = (time: string) => {
    setState((prev) => {
      const newTimes = prev.selectedTimes.includes(time)
        ? prev.selectedTimes.filter((t) => t !== time)
        : [...prev.selectedTimes, time].sort();
      return { ...prev, selectedTimes: newTimes };
    });
  };

  const removeTime = (time: string) => {
    setState((prev) => ({
      ...prev,
      selectedTimes: prev.selectedTimes.filter((t) => t !== time),
    }));
  };

  const toggleSection = (idx: number) => {
    if (expandedSections.includes(idx)) {
      setExpandedSections(expandedSections.filter((i) => i !== idx));
    } else {
      setExpandedSections([...expandedSections, idx]);
    }
  };

  const handleApplyMode = (mode: 'weekdays' | 'all') => {
    setState((prev) => ({
      ...prev,
      applyMode: prev.applyMode === mode ? 'none' : mode,
    }));
  };

  const handleRegister = () => {
    if (state.selectedTimes.length === 0) return;

    let daysToApply = [state.selectedDay];
    if (state.applyMode === 'weekdays')
      daysToApply = ['월', '화', '수', '목', '금'];
    else if (state.applyMode === 'all')
      daysToApply = ['월', '화', '수', '목', '금', '토', '일'];

    const result = daysToApply.flatMap((day) =>
      state.selectedTimes.map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        const endMin = minute + 30;
        const endHour = hour + Math.floor(endMin / 60);
        const finalMin = endMin % 60;
        const endTime = `${String(endHour).padStart(2, '0')}:${String(finalMin).padStart(2, '0')}`;
        return {
          dayOfWeek: day,
          startTime: time,
          endTime: endTime,
        };
      }),
    );

    onSave(result);
    onClose();
  };

  const formatTime = (time: string) => {
    const [hh, mm] = time.split(':');
    return `${hh}시 ${mm}분`;
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[700px]">
      <div className="p-10 pb-8">
        <h2 className="mb-3 text-[22px] font-bold text-gray-900">
          선호 시간대
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-gray-400">
          등록할 요일을 하나만 선택해 주세요. 요일별로 각각 등록이 가능해요.
        </p>

        <div className="mb-8 flex gap-1 rounded-xl bg-gray-50 p-1">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayChange(day)}
              className={`flex-1 rounded-lg py-3 text-sm font-bold transition-all ${
                state.selectedDay === day
                  ? 'border border-blue-200 bg-white text-blue-600 shadow-sm'
                  : 'text-gray-400 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="custom-scrollbar mb-4 max-h-[320px] space-y-4 overflow-y-auto pr-2">
          {sections.map((section, idx) => {
            const isExpanded = expandedSections.includes(idx);
            return (
              <div
                key={idx}
                className="border-b border-gray-100 pb-2 last:border-0"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(idx)}
                  className="group flex w-full items-center justify-between py-4 text-left"
                >
                  <span
                    className={`text-sm font-bold transition-colors ${isExpanded ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`}
                  >
                    {section.label}
                  </span>
                  <svg
                    className={`h-5 w-5 text-gray-300 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
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
                </button>

                {isExpanded && (
                  <div className="animate-in fade-in slide-in-from-top-2 grid grid-cols-4 gap-2 py-2 duration-300">
                    {section.slots.map((slot) => {
                      const isSelected = state.selectedTimes.includes(slot);
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => toggleTime(slot)}
                          className={`rounded-lg border py-3 text-sm font-medium transition-all ${
                            isSelected
                              ? 'border-blue-400 bg-blue-50/30 text-blue-500'
                              : 'border-gray-100 text-gray-300 hover:border-gray-200 hover:text-gray-500'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-8 border-t border-gray-100 pt-6">
          <div className="flex h-[54px] items-center justify-between gap-4">
            <div className="thin-scrollbar flex h-full flex-1 items-center gap-2 overflow-x-auto overflow-y-hidden pr-4 pb-1 whitespace-nowrap">
              {state.selectedTimes.length > 0 ? (
                state.selectedTimes.map((time) => (
                  <div
                    key={time}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-blue-50 bg-[#F0F7FF] px-3 py-2 text-sm font-bold text-blue-500 transition-all"
                  >
                    <span>{formatTime(time)}</span>
                    <button
                      type="button"
                      onClick={() => removeTime(time)}
                      className="text-blue-300 transition-colors hover:text-blue-500"
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-2 text-sm text-gray-300 italic">
                  시간을 선택해 주세요.
                </div>
              )}
            </div>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => handleApplyMode('weekdays')}
                className={`rounded-lg border px-4 py-2.5 text-sm font-bold transition-all ${
                  state.applyMode === 'weekdays'
                    ? 'border-blue-200 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-gray-100 bg-[#F8F9FA] text-[#4B5563] hover:bg-gray-200'
                }`}
              >
                평일 전부 적용
              </button>
              <button
                type="button"
                onClick={() => handleApplyMode('all')}
                className={`rounded-lg border px-4 py-2.5 text-sm font-bold transition-all ${
                  state.applyMode === 'all'
                    ? 'border-blue-200 bg-blue-50 text-blue-600 shadow-sm'
                    : 'border-gray-100 bg-white text-[#4B5563] hover:bg-gray-50'
                }`}
              >
                모든 요일 적용
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          disabled={state.selectedTimes.length === 0}
          className={`w-full rounded-2xl py-5 text-lg font-bold shadow-xl transition-all ${
            state.selectedTimes.length > 0
              ? 'bg-blue-500 text-white shadow-blue-100 hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-100 text-gray-300 shadow-none'
          }`}
        >
          선호 시간대 등록
        </button>
      </div>
    </BaseModal>
  );
};
