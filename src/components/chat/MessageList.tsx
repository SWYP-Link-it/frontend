'use client';

import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { ChatMessage } from '@/src/types/chat';
import { MessageBubble } from './MessageBubble';

dayjs.locale('ko');

interface MessageListProps {
  messages: ChatMessage[];
  partnerProfileUrl?: string;
}

export const MessageList = ({
  messages,
  partnerProfileUrl,
}: MessageListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col overflow-y-auto p-[20px] [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];

        const currentMoment = dayjs(msg.createdAtEpochMs);
        const prevMoment = prevMsg ? dayjs(prevMsg.createdAtEpochMs) : null;
        const nextMoment = nextMsg ? dayjs(nextMsg.createdAtEpochMs) : null;

        const isNewDay =
          !prevMoment ||
          currentMoment.format('YYYYMMDD') !== prevMoment.format('YYYYMMDD');

        const isNextSameMinute = nextMoment
          ? currentMoment.format('YYYYMMDDHHmm') ===
            nextMoment.format('YYYYMMDDHHmm')
          : false;

        const isNextSameSender = nextMsg?.senderId === msg.senderId;
        const isPrevSameSender = prevMsg?.senderId === msg.senderId;

        const showTime = !nextMsg || !isNextSameSender || !isNextSameMinute;
        const marginBottom = !nextMsg
          ? 'mb-0'
          : isNextSameSender
            ? 'mb-[8px]'
            : 'mb-[32px]';

        const showProfile = !isPrevSameSender;
        const formattedTime = currentMoment.format('A h:mm');

        return (
          <div key={msg.messageId}>
            {isNewDay && (
              <div className="my-[32px] flex justify-center">
                <span className="text-sm font-medium text-gray-400">
                  {currentMoment.format('YYYY년 M월 D일')}
                </span>
              </div>
            )}

            <div className={marginBottom}>
              <MessageBubble
                content={msg.content}
                timestamp={formattedTime}
                isMine={msg.isMine}
                showTime={showTime}
                showProfile={showProfile}
                profileUrl={!msg.isMine ? partnerProfileUrl : undefined}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
