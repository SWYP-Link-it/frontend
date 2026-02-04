import { ReactNode } from 'react';

interface ProfileEditSectionProps {
  title: string;
  description?: string;
  onEdit?: () => void;
  children: ReactNode;
}

export const ProfileEditSection = ({
  title,
  description,
  onEdit,
  children,
}: ProfileEditSectionProps) => {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        {onEdit && (
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-600"
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
        )}
      </div>
      {description && (
        <p className="mb-4 text-sm text-gray-500">{description}</p>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
};
