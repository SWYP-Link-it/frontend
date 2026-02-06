import Link from 'next/link';
import Image from 'next/image';
import { formatMessageDate } from '@/src/utils/date';
import { ChatRoomListItem } from '@/src/types/chat';

export const ChatListItem = ({ data }: { data: ChatRoomListItem }) => {
  return (
    <Link href={`/messages/${data.roomId}`} className="block">
      <div className="m-[10px] flex h-[86px] cursor-pointer items-center rounded-[6px] p-[10px] transition-colors hover:bg-gray-50">
        <div className="relative mr-[12px] h-[40px] w-[40px] shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image
            src={'/icons/avatar.svg'}
            alt="프로필"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[4px]">
          <div className="flex items-center justify-between">
            <span className="truncate text-sm font-medium text-gray-900">
              {data.partnerNickname || '알 수 없음'}
            </span>
            <span className="text-xs whitespace-nowrap text-gray-400">
              {data.lastMessageAtEpochMs
                ? formatMessageDate(
                    new Date(data.lastMessageAtEpochMs).toISOString(),
                  )
                : ''}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-[13px] leading-[1.4] text-gray-500">
              {data.lastMessageContent || '대화를 시작해보세요!'}
            </p>

            {data.unreadCount > 0 && (
              <div className="bg-brand-600 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-[6px] text-[11px] font-bold text-white">
                {data.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
