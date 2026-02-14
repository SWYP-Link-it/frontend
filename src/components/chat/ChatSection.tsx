'use client';

import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { useChat } from '@/src/hooks/useChat';
import { MessageList } from './MessageList';
import { useEffect } from 'react';

export const ChatSection = ({ roomId }: { roomId: string }) => {
  const { messages, roomInfo, isLoading, sendMessage } = useChat(
    Number(roomId),
  );

  useEffect(() => {
    if (!isLoading) {
      window.dispatchEvent(new Event('chat-update'));
    }
  }, [roomId, messages.length, isLoading]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-gray-400">채팅방 연결 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
      <ChatHeader nickname={roomInfo?.partnerNickname || '알 수 없는 사용자'} />

      <MessageList
        messages={messages}
        partnerProfileUrl={roomInfo?.partnerProfileImageUrl || undefined}
      />

      <ChatInput
        onSendMessage={sendMessage}
        mentorId={roomInfo?.partnerId}
        isFirstChat={messages.length === 0}
      />
    </div>
  );
};
