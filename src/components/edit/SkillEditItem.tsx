'use client';

import { useState } from 'react';
import { SKILL_CATEGORY_MAP } from '@/src/constants/profile';
import { UserSkill } from '@/src/types/profile';
import { DeleteConfirmModal } from './DeleteConfirmModal';
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const proficiencyLabel =
    skill.skillProficiency === 'HIGH'
      ? '상'
      : skill.skillProficiency === 'MEDIUM'
        ? '중'
        : '하';

  const categoryDisplayName =
    Object.keys(SKILL_CATEGORY_MAP).find(
      (key) => SKILL_CATEGORY_MAP[key] === skill.skillCategoryType,
    ) || '기타';

  const handleConfirmDelete = () => {
    onDelete();
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="group relative border-b border-gray-100 bg-white py-6 first:pt-0 last:border-0">
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
          onClick={() => setIsDeleteModalOpen(true)}
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

      <h3 className="mb-2 text-sm font-bold text-gray-900">
        {categoryDisplayName}
      </h3>

      <div className="mb-3 flex gap-2">
        <span className="text-brand-600 border-brand-200 rounded border px-2 py-1 text-xs font-bold">
          {skill.skillName}
        </span>
        <span className="text-brand-600 border-brand-200 rounded border px-2 py-1 text-xs font-bold">
          {proficiencyLabel}
        </span>
      </div>
      <p className="max-w-[90%] text-xs leading-relaxed text-gray-400">
        {skill.skillDescription}
      </p>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};
