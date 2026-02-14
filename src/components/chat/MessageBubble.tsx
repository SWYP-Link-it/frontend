import Image from 'next/image';

interface MessageBubbleProps {
  content: string;
  fileUrl?: string | null;
  timestamp: string;
  isMine: boolean;
  showTime: boolean;
  showProfile?: boolean;
  profileUrl?: string;
}

export const MessageBubble = ({
  content,
  fileUrl,
  timestamp,
  isMine,
  showProfile = true,
  profileUrl,
  showTime,
}: MessageBubbleProps) => {
  return (
    <div className={`flex w-full ${isMine ? 'justify-end' : 'justify-start'}`}>
      {!isMine && (
        <div className="mr-2 shrink-0">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            {showProfile ? (
              <div className="relative h-full w-full bg-gray-200">
                <Image
                  src="/icons/avatar.svg"
                  alt="profile"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-full w-full bg-transparent" />
            )}
          </div>
        </div>
      )}

      <div
        className={`flex max-w-[70%] items-end gap-[4px] ${
          isMine ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <div className="flex flex-col gap-2">
          {fileUrl && (
            <div className="relative overflow-hidden rounded-[12px]">
              <Image
                src={fileUrl}
                alt="chat-image"
                width={0}
                height={0}
                sizes="100vw"
                unoptimized
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          )}

          {content && (
            <div
              className={`rounded-[8px] px-[16px] py-[10px] text-sm leading-[1.5] break-all ${
                isMine
                  ? 'bg-brand-600 rounded-tr-none text-white'
                  : 'bg-brand-100 rounded-tl-none text-gray-900'
              }`}
            >
              {content}
            </div>
          )}
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
