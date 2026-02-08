interface DaySelectorProps {
  selectedDays: string[];
  activeDay: string;
  onActiveDayChange: (day: string) => void;
  onChange: (days: string[]) => void;
}

export const DaySelector = ({
  selectedDays,
  activeDay,
  onActiveDayChange,
  onChange,
}: DaySelectorProps) => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];

  const handleDayClick = (day: string) => {
    onActiveDayChange(day);
  };

  return (
    <div className="m-0 flex w-full gap-1.5 rounded-2xl bg-gray-50/80 p-1.5">
      {days.map((day) => {
        const isSelected = selectedDays.includes(day);
        const isActive = activeDay === day;

        return (
          <button
            key={day}
            type="button"
            onClick={() => handleDayClick(day)}
            className={`flex-1 rounded-xl border-2 py-3.5 text-sm font-bold transition-all ${
              isActive
                ? 'border-blue-200 bg-white text-blue-600 shadow-md shadow-blue-50'
                : 'border-transparent bg-transparent text-gray-400 hover:text-gray-500'
            }`}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
};
