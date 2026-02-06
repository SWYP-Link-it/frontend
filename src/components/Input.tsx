'use client';

import React, { useState } from 'react';

const sizeStyles = {
  md: {
    label: 'text-md text-gray-700 font-semibold',
    input: 'rounded-lg px-4 py-[14px] text-sm h-12',
    error: '',
    gap: 'gap-3',
  },
  lg: {
    label: 'text-xl font-medium text-gray-800/65',
    input: 'rounded-2xl px-6 py-[14px] text-xl h-[58px] ',
    error: 'text-base font-semibold',
    gap: 'gap-3',
  },
};

interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size'
> {
  /** 입력 필드 위쪽에 표시될 라벨 */
  label?: string;
  /** 아래쪽에 표시할 에러 메시지 */
  errorMessage?: string;
  size?: 'md' | 'lg';
}

export const Input = ({
  label,
  errorMessage,
  className,
  onFocus,
  onBlur,
  size = 'md',
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const styles = sizeStyles[size];

  const borderColor = errorMessage
    ? 'border-[#FF4242]/60'
    : isFocused
      ? 'border-brand-600'
      : 'border-gray-300';

  return (
    <div className={`flex flex-col ${styles.gap} ${className}`}>
      {label && <span className={` ${styles.label}`}>{label}</span>}
      <input
        {...props}
        className={`${borderColor} border-2 bg-white placeholder-gray-400 outline-none ${styles.input}`}
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
        <div className={`text-[#FF4242]/65 ${styles.error}`}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
