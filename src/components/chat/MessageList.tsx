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
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-[20px]">
      {messages.map((msg, index) => {
        const prevMsg = messages[index - 1];
        const nextMsg = messages[index + 1];

        const currentMoment = dayjs(msg.createdAtEpochMs);
        const nextMoment = nextMsg ? dayjs(nextMsg.createdAtEpochMs) : null;

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
          <div key={msg.messageId} className={marginBottom}>
            <MessageBubble
              content={msg.content}
              timestamp={formattedTime}
              isMine={msg.isMine}
              showTime={showTime}
              showProfile={showProfile}
              profileUrl={!msg.isMine ? partnerProfileUrl : undefined}
            />
          </div>
        );
      })}
    </div>
  );
};
