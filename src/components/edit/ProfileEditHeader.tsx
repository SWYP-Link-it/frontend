'use client';

import { useRouter } from 'next/navigation';

interface ProfileEditHeaderProps {
  onSave: () => void;
  isValid?: boolean;
  isDirty?: boolean;
}

export const ProfileEditHeader = ({
  onSave,
  isValid = false,
  isDirty = false,
}: ProfileEditHeaderProps) => {
  const router = useRouter();

  const canSave = isValid && isDirty;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center text-sm font-bold text-gray-400 transition-colors hover:text-gray-900"
      >
        <svg
          className="mr-1 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        이전 페이지
      </button>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-bold text-gray-900">
        내 스킬 작성
      </h1>

      <button
        type="button"
        onClick={onSave}
        disabled={!canSave}
        className={`rounded-xl px-8 py-2.5 text-sm font-bold transition-all ${
          canSave
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-100 hover:bg-blue-600'
            : 'bg-gray-100 text-gray-400'
        }`}
      >
        저장하기
      </button>
    </header>
  );
};
