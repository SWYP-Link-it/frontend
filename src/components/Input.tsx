'use client';

import { useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 입력 필드 위쪽에 표시될 라벨 */
  label: string;
  /** 아래쪽에 표시할 에러 메시지 */
  errorMessage?: string;
}

export const Input = ({
  label,
  errorMessage,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="text-xl leading-[30px] font-medium">{label}</span>
      <input
        {...props}
        className={`${
          errorMessage
            ? 'border-2 border-[#FF4242]/60'
            : isFocused
              ? 'border-brand-600 border-2'
              : 'border border-gray-300'
        } ${
          errorMessage ? 'border-2 border-[#FF4242]/60' : ''
        } rounded-[15px] bg-white px-6 py-[14px] text-xl placeholder-gray-400 outline-none`}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
      />
      {errorMessage && (
        <div className="text-base leading-[1.5] font-semibold text-[#FF4242]/65">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
