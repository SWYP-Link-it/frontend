interface SkillItemProps {
  category: string;
  tag: string;
  level: string;
  description: string;
}

export const SkillItem = ({
  category,
  tag,
  level,
  description,
}: SkillItemProps) => {
  return (
    <div className="flex gap-4 rounded-xl border border-transparent border-b-gray-50 p-4 transition-colors last:border-b-0 hover:bg-gray-50">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-500">
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div className="flex-1">
        <div className="mb-2 flex flex-col gap-1">
          <span className="text-sm font-bold text-gray-900">{category}</span>
          <div className="flex items-center gap-2">
            <span className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-500">
              {tag}
            </span>
            <span className="rounded border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-500">
              {level}
            </span>
          </div>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};
