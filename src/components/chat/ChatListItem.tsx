import Link from 'next/link';
import { formatMessageDate } from '@/src/utils/date';

interface ChatItemData {
  id: string | number;
  nickname: string;
  profileUrl: string;
  lastMessage: string;
  createdAt: string;
  hasNewMessage?: boolean; // 🆕 안 읽음 상태 (데이터에 없으면 임시로 처리 가능)
}

export const ChatListItem = ({ data }: { data: ChatItemData }) => {
  return (
    <Link href={`/chat/${data.id}`} className="block">
      <div className="m-[10px] flex h-[86px] cursor-pointer items-center rounded-[6px] p-[10px] transition-colors hover:bg-gray-50">
        {/* 1. 프로필 이미지 (왼쪽 고정) */}
        <img
          className="mr-[12px] h-[40px] w-[40px] shrink-0 rounded-full bg-gray-200 object-cover"
          src={data.profileUrl}
          alt="프로필"
        />

        {/* 2. 텍스트 컨텐츠 영역 (나머지 공간 꽉 채움) */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[4px]">
          {/* [상단 줄] 닉네임 --- 날짜 */}
          <div className="flex items-center justify-between">
            <span className="text-sm leading-none font-medium text-gray-900">
              {data.nickname}
            </span>
            <span className="text-sm leading-none whitespace-nowrap text-gray-400">
              {formatMessageDate(data.createdAt)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <p className="line-clamp-2 text-[13px] leading-[1.4] text-gray-500">
              {data.lastMessage}
            </p>
            {/* TODO: 읽음 처리가 될 영역 */}
            <div className="flex w-[30px] justify-end">
              <div className="bg-brand-600 mt-[4px] h-[6px] w-[6px] shrink-0 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
