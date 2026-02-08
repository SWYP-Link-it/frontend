interface ProfileCardProps {
  name: string;
  credit: number;
  onEditClick: () => void;
}

export const ProfileCard = ({
  name,
  credit,
  onEditClick,
}: ProfileCardProps) => {
  return (
    <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-blue-100 bg-blue-50">
            <svg
              className="h-10 w-10 text-blue-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08s5.97 1.09 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {name || '사용자'}
            </h2>
          </div>
        </div>
        <button
          onClick={onEditClick}
          className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
        >
          프로필 수정하기
        </button>
      </div>

      <div className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex h-6 w-6 items-center justify-center rounded border border-gray-200 bg-white">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-400" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            내 크레딧 {credit.toLocaleString()}
          </span>
        </div>
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};
