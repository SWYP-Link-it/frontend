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

  // useEffect(() => {
  //   if (roomInfo) {
  //     console.log('룸 정보 전체보기:', roomInfo);
  //   }
  // }, [roomInfo]);
  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white">
        <p className="text-gray-400">채팅방 연결 중...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full min-w-0 flex-col overflow-hidden rounded-[12px] border border-gray-200 bg-gray-50">
      {/* 백엔드 상세 조회 명세의 partnerNickname을 헤더에 전달 */}
      <ChatHeader nickname={roomInfo?.partnerNickname || '알 수 없는 사용자'} />

      <MessageList
        messages={messages}
        partnerProfileUrl={roomInfo?.partnerProfileImageUrl || undefined}
      />

      {/* 스킬 요청 시 필요한 mentorId를 roomInfo에서 추출하여 전달 */}
      <ChatInput
        onSendMessage={sendMessage}
        mentorId={roomInfo?.partnerId}
        isFirstChat={messages.length === 0} // 메시지가 없을 때만 true
      />
    </div>
  );
};
