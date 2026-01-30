'use client';

import Image from 'next/image';
import { useState, useRef } from 'react';

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용만큼 늘리기
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await onSendMessage(message);

      setMessage('');

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    } catch (error) {
      console.error('전송 중 에러 발생:', error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return; // 한글 조합 중 중복 전송 방지

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 줄바꿈 방지
      handleSendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    handleResizeHeight();
  };

  return (
    <div className="flex-col items-center gap-4 border-t border-gray-100 bg-white px-[20px] py-[24px]">
      <div className="mb-[32px] w-full rounded-lg bg-gray-200 p-[1px] focus-within:bg-gradient-to-r focus-within:from-[#ADB6FD] focus-within:via-[#8EDBFF] focus-within:to-[#A4C2F8]">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="메세지를 입력하세요"
          rows={1}
          className="block max-h-[150px] w-full resize-none overflow-y-auto rounded-[7px] bg-gray-50 px-4 py-3 text-[14px] focus:outline-none"
          style={{ minHeight: '46px' }}
        />
      </div>

      <div className="flex justify-between text-[14px]">
        <div className="flex">
          <div className="mr-[8px] flex h-[36px] cursor-pointer items-center justify-center rounded-[100px] border border-gray-200 px-[16px] font-semibold text-gray-500 hover:bg-gray-50">
            <Image
              className="mr-[3px]"
              src="/icons/icon_image_btn.svg"
              alt="첨부파일버튼"
              height={20}
              width={20}
            />
            이미지 추가
          </div>

          <div className="h-[36px] cursor-pointer rounded-[100px] bg-gradient-to-r from-[#ADB6FD] via-[#8EDBFF] to-[#A4C2F8] p-[1px]">
            <div className="bg-brand-50 flex h-full w-full items-center justify-center rounded-[100px] px-[16px] text-gray-500 transition-colors hover:bg-white">
              <Image
                className="mr-[3px]"
                src="/icons/icon_skill_btn.svg"
                alt="스킬요청버튼"
                height={20}
                width={20}
              />
              <span className="text-brand-600 font-semibold">
                스킬 요청 보내기
              </span>
            </div>
          </div>
        </div>

        <div
          onClick={handleSendMessage}
          className="bg-brand-600 hover:bg-brand-700 flex h-[36px] cursor-pointer items-center justify-center rounded-[8px] px-[16px] font-bold text-white"
        >
          전송
        </div>
      </div>
    </div>
  );
};
