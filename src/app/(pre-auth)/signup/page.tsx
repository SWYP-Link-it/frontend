'use client';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { useState } from 'react';

export default function Signup() {
  const [nickname, setNickname] = useState('');
  const [showError, setShowError] = useState(false);
  const errorMessage =
    showError && (nickname.length < 1 || nickname.length > 10)
      ? '닉네임은 최소 1자~10자 이내로 작성 가능해요.'
      : undefined;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedRegex = /^[a-zA-Z0-9가-힣]$/;
    const isControlKey =
      e.ctrlKey ||
      e.metaKey ||
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'ArrowLeft' ||
      e.key === 'ArrowRight';

    if (!allowedRegex.test(e.key) && !isControlKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="mx-auto flex h-full w-[490px] flex-col items-center justify-center">
      <div className="mt-10 text-center text-3xl leading-[1.4] font-bold whitespace-pre-wrap">
        {`링킷에서 사용할 프로필을\n등록해주세요.`}
      </div>
      <div className="border-brand-600 mt-10 h-[200px] w-[300px] border">
        avatar
      </div>
      <div className="mt-10 w-full">
        <Input
          label="닉네임"
          placeholder="사용할 이름을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onBlur={() => setShowError(true)}
          errorMessage={errorMessage}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="mt-10 w-[380px]">
        <Button
          text="회원가입"
          mode={!nickname || errorMessage ? 'inactive' : 'active'}
        />
      </div>
    </div>
  );
}
