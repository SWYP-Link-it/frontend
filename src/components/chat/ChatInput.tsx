'use client';

import { useState } from 'react';

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  const handleSendMessage = () => {
    if (!message.trim()) return;
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') {
      e.preventDefault(); // 엔터 쳤을 때 줄바꿈 되는 것 방지(form 태그 내부일 경우 refresh 방지)
      handleSendMessage();
    }
  };
  return (
    <div className="flex items-center gap-4 border-t border-gray-100 bg-white px-8 py-4">
      <img alt="프로필" />
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="의견을 남겨보세요"
          onKeyDown={handleKeyDown}
          className="focus:ring-brand-500 w-full rounded-lg bg-gray-50 px-4 py-3 focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  );
};
