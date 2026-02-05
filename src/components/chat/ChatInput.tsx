'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
  mentorId?: number; // 가라가 아닌 실제 데이터 사용
}

export const ChatInput = ({ onSendMessage, mentorId }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await onSendMessage(message);
      setMessage('');
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    } catch (error) {
      console.error('전송 실패:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex shrink-0 flex-col border-t border-gray-100 bg-white p-[20px]">
      <div className="focus-within:border-brand-500 mb-[12px] flex min-h-[44px] w-full items-end rounded-[12px] border border-gray-200 bg-white px-[16px] py-[10px]">
        <textarea
          ref={textareaRef}
          rows={1}
          placeholder="메시지를 입력하세요..."
          className="max-h-[120px] w-full resize-none bg-transparent text-[15px] leading-[1.5] text-gray-900 outline-none"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            handleResizeHeight();
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSendMessage}
          className={`ml-[12px] font-bold ${message.trim() ? 'text-brand-600' : 'text-gray-300'}`}
        >
          전송
        </button>
      </div>

      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="flex h-[36px] cursor-pointer items-center rounded-[100px] border px-[16px] text-gray-500">
            이미지 추가
          </div>
          <div
            onClick={
              () =>
                mentorId && router.push(`/skills/request?skillId=${mentorId}`) // mentorId를 skillId로 전달
            }
            className="h-[36px] cursor-pointer rounded-[100px] bg-gradient-to-r from-[#ADB6FD] to-[#A4C2F8] p-[1px]"
          >
            <div className="bg-brand-50 text-brand-600 flex h-full items-center rounded-[100px] px-[16px] font-semibold">
              스킬 요청 보내기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
