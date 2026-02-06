import Image from 'next/image';

interface MessageBubbleProps {
  content: string;
  timestamp: string;
  isMine: boolean;
  showTime: boolean;
  showProfile?: boolean;
  profileUrl?: string;
}

export const MessageBubble = ({
  content,
  timestamp,
  isMine,
  showTime,
  showProfile = true,
  profileUrl,
}: MessageBubbleProps) => {
  return (
    <div className={`flex w-full ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <div className="mr-[8px] flex w-[40px] flex-col items-center">
          {showProfile ? (
            <div className="relative h-[40px] w-[40px] overflow-hidden rounded-full border border-gray-200 bg-gray-100">
              {profileUrl ? (
                <Image
                  src={'/icons/avatar.svg'}
                  alt="profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-300 text-[10px] text-white">
                  User
                </div>
              )}
            </div>
          ) : (
            <div className="w-[40px]" />
          )}
        </div>
      )}

      <div
        className={`flex max-w-[70%] items-end gap-[4px] ${isMine ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <div
          className={`rounded-[18px] px-[16px] py-[10px] text-sm leading-[1.5] break-all ${
            isMine
              ? 'bg-brand-600 rounded-tr-none text-white'
              : 'bg-brand-100 rounded-tl-none text-gray-900'
          } `}
        >
          {content}
        </div>

        {showTime && (
          <span className="mb-[2px] shrink-0 text-xs text-gray-400">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};
