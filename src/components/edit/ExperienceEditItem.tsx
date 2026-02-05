interface ExperienceEditItemProps {
  value: string;
  onChange: (value: string) => void;
}

export const ExperienceEditItem = ({
  value,
  onChange,
}: ExperienceEditItemProps) => {
  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="나의 전문성을 보여줄 수 있는 경력이나 프로젝트 경험을 적어주세요. (예: 1년차 개발자)"
        className="min-h-[140px] w-full resize-none rounded-xl border border-gray-100 bg-white p-6 text-sm text-gray-700 transition-all placeholder:text-gray-300 focus:ring-2 focus:ring-blue-100 focus:outline-none"
      />
      {value && (
        <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-blue-200" />
      )}
    </div>
  );
};
