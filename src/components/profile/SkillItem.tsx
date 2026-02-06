import { SKILL_CATEGORY_MAP } from '@/src/constants/profile';
import { UserSkill } from '@/src/types/profile';

interface SkillItemProps {
  skill: UserSkill;
}

export const SkillItem = ({ skill }: SkillItemProps) => {
  const proficiencyLabel =
    skill.skillProficiency === 'HIGH'
      ? '상'
      : skill.skillProficiency === 'MEDIUM'
        ? '중'
        : '하';

  const categoryDisplayName =
    Object.keys(SKILL_CATEGORY_MAP).find(
      (key) => SKILL_CATEGORY_MAP[key] === skill.skillCategoryType,
    ) ||
    skill.skillCategoryName ||
    '기타';

  return (
    <div className="flex gap-4 border-b border-gray-50 p-4 last:border-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-400">
          <span className="text-[10px] text-white">✨</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <h4 className="text-sm font-bold text-gray-900">
            {categoryDisplayName}
          </h4>
        </div>
        <div className="mb-2 flex gap-2">
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {skill.skillName}
          </span>
          <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            {proficiencyLabel}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-gray-500">
          {skill.skillDescription}
        </p>
      </div>
    </div>
  );
};
