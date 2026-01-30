import Link from 'next/link';
import { formatMessageDate } from '@/src/utils/date';
import { ChatRoomListItem } from '@/src/types/chat';

export const ChatListItem = ({ data }: { data: ChatRoomListItem }) => {
  return (
    <Link href={`/messages/${data.roomId}`} className="block">
      <div className="m-[10px] flex h-[86px] cursor-pointer items-center rounded-[6px] p-[10px] transition-colors hover:bg-gray-50">
        <img
          className="mr-[12px] h-[40px] w-[40px] shrink-0 rounded-full bg-gray-200 object-cover"
          src={data.partnerProfileImageUrl || 'https://via.placeholder.com/40'}
          alt="프로필"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[4px]">
          <div className="flex items-center justify-between">
            <span className="text-sm leading-none font-medium text-gray-900">
              {data.partnerNickname || '알 수 없음'}{' '}
            </span>
            <span className="text-sm leading-none whitespace-nowrap text-gray-400">
              {data.lastMessageAtEpochMs
                ? formatMessageDate(
                    new Date(data.lastMessageAtEpochMs).toISOString(),
                  )
                : ''}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-[13px] leading-[1.4] text-gray-500">
              {data.lastMessage || '대화를 시작해보세요!'}{' '}
            </p>

            {data.unreadCount > 0 && (
              <div className="flex w-[30px] justify-end">
                <div className="bg-brand-600 mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
