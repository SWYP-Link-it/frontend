'use client';

import { UserSkill } from '@/src/types/profile';

// 영문 코드를 한글로 매핑 (백엔드에서 Name을 안 줄 경우 대비)
const REVERSE_CATEGORY_MAP: Record<string, string> = {
  DEVELOPMENT: 'IT · 개발',
  DESIGN: '디자인 · 크리에이티브',
  EDITING: '영상 · 사진 · 편집',
  MARKETING: '마케팅 · 콘텐츠',
  LANGUAGE: '외국어',
  FINANCE: '재테크 · 경제',
  SPORTS: '운동',
  MUSIC: '음악',
  ETC: '기타',
};

interface SkillEditItemProps {
  skill: UserSkill;
  onEdit: () => void;
  onDelete: () => void;
}

export const SkillEditItem = ({
  skill,
  onEdit,
  onDelete,
}: SkillEditItemProps) => {
  // 1. 숙련도 라벨 처리
  const proficiencyLabel =
    skill.skillProficiency === 'HIGH'
      ? '상'
      : skill.skillProficiency === 'MEDIUM'
        ? '중'
        : '하';

  // 2. 카테고리 이름 처리 (이름이 없으면 영문 코드를 한글로 변환)
  const categoryDisplayName =
    skill.skillCategoryName ||
    REVERSE_CATEGORY_MAP[skill.skillCategoryType] ||
    '기타';

  return (
    <div className="group relative rounded-xl border border-gray-100 bg-white p-6">
      <div className="absolute top-6 right-6 flex gap-3 opacity-100">
        <button
          onClick={onEdit}
          className="text-gray-400 transition-colors hover:text-gray-600"
        >
          <svg
            className="h-5 w-5"
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
        <button
          onClick={onDelete}
          className="text-gray-400 transition-colors hover:text-red-400"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>

      {/* 수정된 부분: categoryDisplayName 사용 */}
      <h3 className="mb-2 text-sm font-bold text-gray-900">
        {categoryDisplayName}
      </h3>

      <div className="mb-3 flex gap-2">
        <span className="rounded border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          {skill.skillName}
        </span>
        <span className="rounded border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          {proficiencyLabel}
        </span>
      </div>
      <p className="max-w-[90%] text-xs leading-relaxed text-gray-400">
        {skill.skillDescription}
      </p>
    </div>
  );
};
