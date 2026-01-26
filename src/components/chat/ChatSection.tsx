import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

export const ChatSection = ({ roomId }: { roomId: string }) => {
  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </div>
  );
};
