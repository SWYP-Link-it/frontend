import { formatMessageDate } from '@/src/utils/date';
import Link from 'next/link';

//TODO: TYPE 생성 후 ANY 삭제 예정
export const ChatListItem = ({ data }: any) => {
  return (
    <div className="flex cursor-pointer items-center px-4 py-3 hover:bg-gray-50">
      <Link href={`/chat/${data.id}`}>
        <img
          className="mr-3 h-[40px] w-[40px] rounded-full bg-gray-200 object-cover"
          src={data.profileUrl}
          alt="프로필"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="mb-0.5 flex items-center justify-between">
          <Link href={`/chat/${data.id}`}>
            <div className="font-medium text-gray-900">{data.nickname}</div>
          </Link>
          <div className="ml-2 text-xs whitespace-nowrap text-gray-400">
            {formatMessageDate(data.createdAt)}
          </div>
        </div>

        <p className="truncate text-sm text-gray-500">{data.lastMessage}</p>
      </div>
    </div>
  );
};
