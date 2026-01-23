import dayjs from 'dayjs';
import { ChatListItem } from './ChatListItem';
export const ChatSidebar = () => {
  // TODO: 테스트용 목데이터(추후 삭제 예정)
  const MOCK_CHAT_ROOMS = [
    {
      id: 1,
      nickname: '김개발',
      profileUrl: 'https://i.pravatar.cc/150?img=11',
      lastMessage: '오! 그 기능 진짜 편하네요. 고생하셨습니다! 👍',
      createdAt: dayjs().subtract(10, 'minute').toISOString(),
    },
    {
      id: 2,
      nickname: '이디자이너',
      profileUrl: 'https://i.pravatar.cc/150?img=5',
      lastMessage: '시안 수정본 전달드렸습니다. 확인 부탁드려요~',
      createdAt: dayjs().subtract(1, 'day').toISOString(),
    },
    {
      id: 3,
      nickname: '박기획',
      profileUrl: 'https://i.pravatar.cc/150?img=3',
      lastMessage: '혹시 다음 주 미팅 시간 조율 가능하실까요?',
      createdAt: '2023-12-25T14:30:00',
    },
  ];
  return (
    <div className="w-[320px] bg-blue-50">
      <div className="flex h-14 w-full items-center justify-center px-4 font-semibold text-gray-600">
        메세지 목록
      </div>
      {MOCK_CHAT_ROOMS.map((item) => {
        return <ChatListItem data={item} key={item.id} />;
      })}
    </div>
  );
};
