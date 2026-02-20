import { SKILL_CATEGORY_MAP } from '@/src/constants/profile';
import { UserSkill } from '@/src/types/profile';
import { CategoryFigure } from '../skill/CategoryFigure';

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
    <div className="flex gap-4 border-b border-gray-100 p-4 first:pt-0 last:border-0 last:pb-0">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100">
        <CategoryFigure
          category={skill.skillCategoryType}
          isActive={true}
          size="sm"
        />
      </div>
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-2">
          <h4 className="text-sm font-bold text-gray-900">
            {categoryDisplayName}
          </h4>
        </div>
        <div className="mb-2 flex gap-2">
          <span className="border-brand-200 text-brand-600 rounded-md border px-2 py-1 text-xs font-semibold">
            {skill.skillName}
          </span>
          <span className="border-brand-200 text-brand-600 rounded-md border px-2 py-1 text-xs font-semibold">
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
