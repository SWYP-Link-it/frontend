'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string, file?: File) => Promise<void>;
  mentorId?: number;
  isFirstChat: boolean;
}

export const ChatInput = ({
  onSendMessage,
  mentorId,
  isFirstChat,
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showTooltip, setShowTooltip] = useState(isFirstChat);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;
    try {
      await onSendMessage(message, selectedFile || undefined);
      setMessage('');
      handleRemoveImage();
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
      {previewUrl && (
        <div className="relative mb-[12px] flex w-fit">
          <div className="h-[80px] w-[80px] overflow-hidden rounded-[8px] border border-gray-200">
            <img
              src={previewUrl}
              alt="preview"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-800 text-white"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className="focus-within:border-brand-500 mb-[12px] flex min-h-[44px] w-full items-end rounded-[8px] border border-gray-200 bg-white px-[16px] py-[10px]">
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
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex h-[36px] items-center rounded-[100px] border border-gray-200 px-[16px] text-gray-600 transition-colors hover:bg-gray-50"
          >
            이미지 추가
          </button>

          <div className="relative">
            {showTooltip && (
              <div className="absolute bottom-full left-1/2 z-50 mb-[14px] -translate-x-1/2">
                <div className="relative rounded-[12px] bg-gray-800 px-[16px] py-[12px] text-[13px] leading-[1.6] font-medium whitespace-nowrap text-white shadow-xl">
                  <div className="flex items-start justify-between gap-3">
                    <p>
                      대화 후{' '}
                      <span className="font-bold text-[#ADB6FD]">
                        스킬 요청
                      </span>
                      을 보내보세요.
                      <br />
                      버튼을 누르면{' '}
                      <span className="font-bold text-[#ADB6FD]">
                        요청서 작성 화면
                      </span>
                      으로 이동해요.
                    </p>
                    <button
                      onClick={() => setShowTooltip(false)}
                      className="mt-[2px] text-gray-400 transition-colors hover:text-white"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 border-[7px] border-transparent border-t-gray-800" />
                </div>
              </div>
            )}

            <div
              onClick={() =>
                mentorId && router.push(`/skills/request?mentorId=${mentorId}`)
              }
              className="h-[36px] cursor-pointer rounded-[100px] bg-gradient-to-r from-[#ADB6FD] to-[#A4C2F8] p-[1px]"
            >
              <div className="bg-brand-50 text-brand-600 hover:bg-brand-100 flex h-full items-center rounded-[100px] px-[16px] font-semibold transition-colors">
                스킬 요청 보내기
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSendMessage}
          disabled={!message.trim() && !selectedFile}
          className={`h-[36px] rounded-[8px] px-[16px] font-bold text-white transition-colors ${
            message.trim() || selectedFile
              ? 'bg-brand-600'
              : 'cursor-not-allowed bg-gray-200'
          }`}
        >
          전송
        </button>
      </div>
    </div>
  );
};
