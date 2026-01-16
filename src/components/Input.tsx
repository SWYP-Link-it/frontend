'use client';

import { Dispatch, SetStateAction, useState } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  text: string;
  onChangeText: (text: string) => void;
}

export const Input = ({
  label,
  errorMessage,
  text,
  onChangeText,
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
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => onChangeText(e.target.value)}
        value={text}
      />
      {errorMessage && (
        <div className="text-base leading-[1.5] font-semibold text-[#FF4242]/65">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
