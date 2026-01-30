'use client';

import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { useChat } from '@/src/hooks/useChat';
import { MessageList } from './MessageList';

export const ChatSection = ({ roomId }: { roomId: string }) => {
  const { messages, roomInfo, isLoading, sendMessage } = useChat(
    Number(roomId),
  );

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-gray-400">채팅방 연결 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
      <ChatHeader
        nickname={roomInfo?.partnerNickname || '상대방'}
        profileUrl={roomInfo?.partnerProfileImageUrl}
      />

      <MessageList
        messages={messages}
        partnerProfileUrl={roomInfo?.partnerProfileImageUrl || undefined}
      />

      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};
