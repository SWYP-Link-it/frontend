import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

export const ChatSection = ({ roomId }: { roomId: string }) => {
  return (
    <div className="flex h-full min-w-0 flex-1 flex-col">
      <ChatHeader />
      <MessageList />
      <ChatInput />
    </div>
  );
};
