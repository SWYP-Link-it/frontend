'use client';

import { useState, useMemo } from 'react';
import { BaseModal } from '../BaseModal';
import { DAYS, TIME_SECTIONS } from '@/src/constants/profile';

interface TimeSchedule {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

interface TimeSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeDay?: string;
  initialTimes?: TimeSchedule[];
  onSave: (selectedSchedules: TimeSchedule[]) => void;
}

export const TimeSelectModal = ({
  isOpen,
  onClose,
  activeDay = '월',
  initialTimes = [],
  onSave,
}: TimeSelectModalProps) => {
  const [selectedDay, setSelectedDay] = useState(activeDay);
  const [applyMode, setApplyMode] = useState<'none' | 'weekdays' | 'all'>(
    'none',
  );

  // 핵심: useEffect 대신 useMemo를 사용하여 현재 선택된 요일의 시간대를 계산합니다.
  // 사용자가 수동으로 시간을 토글하기 전까지는 initialTimes에서 가져온 값을 보여줍니다.
  const currentDayInitialTimes = useMemo(() => {
    return initialTimes
      .filter((t) => t.dayOfWeek === selectedDay)
      .map((t) =>
        t.startTime.length > 5 ? t.startTime.substring(0, 5) : t.startTime,
      );
  }, [selectedDay, initialTimes]);

  // 수동으로 선택한 시간들을 관리하는 상태
  const [manualSelectedTimes, setManualSelectedTimes] = useState<
    string[] | null
  >(null);

  // 현재 화면에 보여줄 시간들 (수동 선택이 있으면 그것을, 없으면 초기값을 사용)
  const displayTimes = manualSelectedTimes ?? currentDayInitialTimes;

  const [expandedSections, setExpandedSections] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  const toggleTime = (time: string) => {
    const currentTimes = displayTimes;
    const newTimes = currentTimes.includes(time)
      ? currentTimes.filter((t) => t !== time)
      : [...currentTimes, time].sort();

    setManualSelectedTimes(newTimes);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setManualSelectedTimes(null); // 요일이 바뀌면 해당 요일의 초기 데이터로 리셋
    setApplyMode('none');
  };

  const handleRegister = () => {
    if (displayTimes.length === 0) return;

    let daysToApply = [selectedDay];
    if (applyMode === 'weekdays') daysToApply = ['월', '화', '수', '목', '금'];
    else if (applyMode === 'all') daysToApply = DAYS;

    const result = daysToApply.flatMap((day) =>
      displayTimes.map((time) => {
        const [hour, minute] = time.split(':').map(Number);
        const endMin = minute + 30;
        const endHour = hour + Math.floor(endMin / 60);
        const finalMin = endMin % 60;
        return {
          dayOfWeek: day,
          startTime: time,
          endTime: `${String(endHour).padStart(2, '0')}:${String(finalMin).padStart(2, '0')}`,
        };
      }),
    );
    onSave(result);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[700px]">
      <div className="p-10 pb-8">
        <h2 className="mb-3 text-[22px] font-bold text-gray-900">
          선호 시간대
        </h2>
        <div className="mb-8 flex gap-1 rounded-xl bg-gray-50 p-1">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayChange(day)}
              className={`flex-1 rounded-lg py-3 text-sm font-bold ${
                selectedDay === day
                  ? 'border border-blue-200 bg-white text-blue-600 shadow-sm'
                  : 'text-gray-400'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="custom-scrollbar mb-4 max-h-[320px] overflow-y-auto pr-2">
          {TIME_SECTIONS.map((section, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 pb-2 last:border-0"
            >
              <button
                type="button"
                onClick={() =>
                  setExpandedSections((prev) =>
                    prev.includes(idx)
                      ? prev.filter((i) => i !== idx)
                      : [...prev, idx],
                  )
                }
                className="flex w-full justify-between py-4 text-sm font-bold"
              >
                {section.label}
              </button>
              {expandedSections.includes(idx) && (
                <div className="grid grid-cols-4 gap-2 py-2">
                  {section.slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => toggleTime(slot)}
                      className={`rounded-lg border py-3 text-sm ${
                        displayTimes.includes(slot)
                          ? 'border-blue-400 bg-blue-50 text-blue-500'
                          : 'border-gray-100 text-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-6">
          <button
            type="button"
            onClick={() => setApplyMode('weekdays')}
            className={`rounded-lg border px-4 py-2 text-sm font-bold ${
              applyMode === 'weekdays'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-50 text-gray-500'
            }`}
          >
            평일 적용
          </button>
          <button
            type="button"
            onClick={() => setApplyMode('all')}
            className={`rounded-lg border px-4 py-2 text-sm font-bold ${
              applyMode === 'all'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-50 text-gray-500'
            }`}
          >
            전체 적용
          </button>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          disabled={displayTimes.length === 0}
          className="mt-4 w-full rounded-2xl bg-blue-500 py-5 text-lg font-bold text-white hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-300"
        >
          시간대 등록 완료
        </button>
      </div>
    </BaseModal>
  );
};
