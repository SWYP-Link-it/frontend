import React from 'react';

interface EmptyStateProps {
  message: string;
}

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-blue-50 bg-[#EBF3FF] md:h-[500px]">
      <div className="mb-4 text-gray-400">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </div>
      <p className="font-medium text-gray-500">{message}</p>
    </div>
  );
};
