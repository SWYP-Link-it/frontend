'use client';

import { useState, useMemo, useEffect } from 'react';
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
  const [expandedSections, setExpandedSections] = useState<number[]>([
    0, 1, 2, 3,
  ]);

  useEffect(() => {
    if (isOpen) {
      setSelectedDay(activeDay);
      setManualSelectedSlots(null);
      setApplyMode('none');
    }
  }, [isOpen, activeDay]);

  const currentDayInitialSlots = useMemo(() => {
    const dayTimes = initialTimes.filter((t) => t.dayOfWeek === selectedDay);
    return dayTimes.map((time) => ({
      start: time.startTime.substring(0, 5),
      end: time.endTime.substring(0, 5),
    }));
  }, [selectedDay, initialTimes]);

  const [manualSelectedSlots, setManualSelectedSlots] = useState<
    { start: string; end: string }[] | null
  >(null);
  const displaySlots = manualSelectedSlots ?? currentDayInitialSlots;

  const toggleTime = (slot: { start: string; end: string }) => {
    const isSelected = displaySlots.some(
      (s) => s.start.substring(0, 5) === slot.start.substring(0, 5),
    );
    const newSlots = isSelected
      ? displaySlots.filter(
          (s) => s.start.substring(0, 5) !== slot.start.substring(0, 5),
        )
      : [...displaySlots, slot];
    setManualSelectedSlots(newSlots);
  };

  const removeSlot = (slotStart: string) => {
    const newSlots = displaySlots.filter(
      (s) => s.start.substring(0, 5) !== slotStart.substring(0, 5),
    );
    setManualSelectedSlots(newSlots);
  };

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    setManualSelectedSlots(null);
    setApplyMode('none');
  };

  const handleRegister = () => {
    if (displaySlots.length === 0) return;

    let daysToApply = [selectedDay];
    if (applyMode === 'weekdays') {
      daysToApply = ['월', '화', '수', '목', '금'];
    } else if (applyMode === 'all') {
      daysToApply = DAYS;
    }

    let updatedSchedules = [...initialTimes].filter(
      (t) => !daysToApply.includes(t.dayOfWeek),
    );

    const newSlots = daysToApply.flatMap((day) =>
      displaySlots.map((slot) => ({
        dayOfWeek: day,
        startTime: slot.start,
        endTime: slot.end,
      })),
    );

    onSave([...updatedSchedules, ...newSlots]);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="max-w-[700px]">
      <div className="m-10">
        <h2 className="text-xl font-bold text-gray-900">선호 시간대</h2>

        <div className="my-4 flex gap-1 rounded-[8px] bg-gray-50 p-1 text-sm">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => handleDayChange(day)}
              className={`flex-1 rounded-lg py-1 text-sm font-bold ${selectedDay === day ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400'}`}
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
                  {section.slots.map((slot, sIdx) => {
                    const isSelected = displaySlots.some(
                      (s) =>
                        s.start.substring(0, 5) === slot.start.substring(0, 5),
                    );
                    return (
                      <button
                        key={sIdx}
                        type="button"
                        onClick={() => toggleTime(slot)}
                        className={`rounded-lg border py-3 text-sm font-medium transition-all ${isSelected ? 'border-blue-400 bg-blue-50 font-bold text-blue-500' : 'border-gray-200 bg-white text-gray-500'}`}
                      >
                        {slot.start} ~ {slot.end}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex min-h-[40px] flex-wrap gap-2">
          {[...displaySlots]
            .sort((a, b) => a.start.localeCompare(b.start))
            .map((slot, i) => (
              <div
                key={i}
                className="flex items-center gap-1 rounded-md border border-blue-100 bg-blue-50 px-2 py-1.5 text-[13px] text-blue-600"
              >
                <span>
                  {slot.start} ~ {slot.end}
                </span>
                <button
                  type="button"
                  onClick={() => removeSlot(slot.start)}
                  className="ml-1 flex h-3.5 w-3.5 items-center justify-center rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
        </div>

        {/* <div className="mt-6 flex justify-end gap-2 border-t border-gray-100 pt-6">
          <button
            type="button"
            onClick={() =>
              setApplyMode(applyMode === 'weekdays' ? 'none' : 'weekdays')
            }
            className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition-all ${
              applyMode === 'weekdays'
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            평일 적용
          </button>
          <button
            type="button"
            onClick={() => setApplyMode(applyMode === 'all' ? 'none' : 'all')}
            className={`rounded-xl border px-5 py-2.5 text-sm font-bold transition-all ${
              applyMode === 'all'
                ? 'border-blue-500 bg-blue-500 text-white'
                : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            전체 적용
          </button>
        </div> */}

        <button
          type="button"
          onClick={handleRegister}
          disabled={displaySlots.length === 0}
          className="mt-4 w-full rounded-2xl bg-blue-500 py-5 text-lg font-bold text-white hover:bg-blue-600 disabled:bg-gray-100"
        >
          시간대 등록 완료
        </button>
      </div>
    </BaseModal>
  );
};
