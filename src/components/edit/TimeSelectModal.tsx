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

// 헬퍼: 연속된 30분 슬롯들을 하나의 범위로 합침
const mergeTimeSlots = (slots: { start: string; end: string }[]) => {
  if (slots.length === 0) return [];
  // 시작 시간 기준으로 정렬
  const sorted = [...slots].sort((a, b) => a.start.localeCompare(b.start));

  const merged = [];
  let current = { ...sorted[0] };

  for (let i = 1; i < sorted.length; i++) {
    // 현재 슬롯의 끝시간이 다음 슬롯의 시작시간과 정확히 일치할 때만 합침
    if (current.end === sorted[i].start) {
      current.end = sorted[i].end;
    } else {
      merged.push(current);
      current = { ...sorted[i] };
    }
  }
  merged.push(current);
  return merged;
};

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
  const [expandedSections, setExpandedSections] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  // 서버에서 받아온 데이터를 30분 단위 슬롯 리스트로 "분해"해서 관리 (이게 핵심입니다)
  const currentDayInitialSlots = useMemo(() => {
    const dayTimes = initialTimes.filter((t) => t.dayOfWeek === selectedDay);
    const slots: { start: string; end: string }[] = [];

    dayTimes.forEach((time) => {
      let startStr = time.startTime.substring(0, 5);
      let endStr = time.endTime.substring(0, 5);

      // 만약 서버에서 1시간 단위(예: 09:00~10:00)로 온다면 30분 단위 슬롯 2개로 쪼개서 displaySlots에 넣어야 함
      // 하지만 보통은 30분 단위로 저장되므로 그대로 넣습니다.
      slots.push({ start: startStr, end: endStr });
    });
    return slots;
  }, [selectedDay, initialTimes]);

  const [manualSelectedSlots, setManualSelectedSlots] = useState<
    { start: string; end: string }[] | null
  >(null);
  const displaySlots = manualSelectedSlots ?? currentDayInitialSlots;

  // 하단 요약용 병합 데이터
  const mergedDisplay = useMemo(
    () => mergeTimeSlots(displaySlots),
    [displaySlots],
  );

  const toggleTime = (slot: { start: string; end: string }) => {
    const isSelected = displaySlots.some((s) => s.start === slot.start);
    const newSlots = isSelected
      ? displaySlots.filter((s) => s.start !== slot.start)
      : [...displaySlots, slot];
    setManualSelectedSlots(newSlots);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setManualSelectedSlots(null);
    setApplyMode('none');
  };

  const handleRegister = () => {
    if (displaySlots.length === 0) return;

    // 최종 저장 시에만 묶어서 보냄
    const mergedResults = mergeTimeSlots(displaySlots);

    let daysToApply = [selectedDay];
    if (applyMode === 'weekdays') daysToApply = ['월', '화', '수', '목', '금'];
    else if (applyMode === 'all') daysToApply = DAYS;

    const result = daysToApply.flatMap((day) =>
      mergedResults.map((slot) => ({
        dayOfWeek: day,
        startTime: slot.start,
        endTime: slot.end,
      })),
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
                className="flex w-full justify-between py-4 text-sm font-bold text-gray-700"
              >
                {section.label}
              </button>
              {expandedSections.includes(idx) && (
                <div className="grid grid-cols-4 gap-2 py-2">
                  {' '}
                  {/* 4칸 유지 */}
                  {section.slots.map((slot, sIdx) => {
                    const isSelected = displaySlots.some(
                      (s) => s.start === slot.start,
                    );
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => toggleTime(slot)}
                        className={`rounded-lg border py-3 text-[10px] font-medium transition-all ${
                          isSelected
                            ? 'border-blue-400 bg-blue-50 font-bold text-blue-500 shadow-sm'
                            : 'border-gray-100 bg-white text-gray-300'
                        }`}
                      >
                        {/* 00:00 ~ 00:30 형식으로 변경 */}
                        {slot.start} ~ {slot.end}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 선택된 요약 시간대 노출 */}
        <div className="mt-4 flex min-h-[40px] flex-wrap gap-2">
          {mergedDisplay.map((slot, i) => (
            <span
              key={i}
              className="rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[13px] font-bold text-blue-600"
            >
              {slot.start} ~ {slot.end}
            </span>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t pt-6">
          <button
            type="button"
            onClick={() => setApplyMode('weekdays')}
            className={`rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${
              applyMode === 'weekdays'
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-100 bg-gray-50 text-gray-500'
            }`}
          >
            평일 적용
          </button>
          <button
            type="button"
            onClick={() => setApplyMode('all')}
            className={`rounded-lg border px-4 py-2 text-sm font-bold transition-colors ${
              applyMode === 'all'
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-100 bg-gray-50 text-gray-500'
            }`}
          >
            전체 적용
          </button>
        </div>

        <button
          type="button"
          onClick={handleRegister}
          disabled={displaySlots.length === 0}
          className="mt-4 w-full rounded-2xl bg-blue-500 py-5 text-lg font-bold text-white hover:bg-blue-600 disabled:bg-gray-100 disabled:text-gray-300"
        >
          시간대 등록 완료
        </button>
      </div>
    </BaseModal>
  );
};
