import Image from 'next/image';

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
    <div className="mb-6 bg-white">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 overflow-hidden rounded-full border border-blue-100 bg-blue-50">
            <Image
              src="/icons/avatar.svg"
              alt="default_avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-700">
              {name || '로그인 후 사용가능한 기능입니다'}
            </h2>
          </div>
        </div>
        <button
          onClick={onEditClick}
          className="text-brand-600 cursor-pointer rounded-lg bg-blue-50 px-4 py-2 text-sm font-bold"
        >
          프로필 수정하기
        </button>
      </div>

      <div className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 p-4 transition-colors hover:bg-gray-100">
        <div className="flex items-center gap-3">
          <div className="relative flex h-4 w-5 items-center justify-center">
            <Image
              src="/icons/credit.svg"
              alt="default_avatar"
              fill
              className="object-cover"
            />
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
