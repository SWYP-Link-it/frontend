'use client';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { api } from '@/src/lib/api/api';
import { useState } from 'react';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function Signup() {
  const [file, setFile] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        alert('이미지 용량은 5MB 이하만 가능합니다.');
        return;
      }
      setFile(file);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('nickname', nickname);
    if (file) formData.append('profileImage', file);

    await api.post('/auth/complete-registration', formData);
  };

  return (
    <div className="mx-auto flex h-full w-[490px] flex-col items-center justify-center">
      <div className="mt-10 text-center text-3xl leading-[1.4] font-bold whitespace-pre-wrap">
        {`링킷에서 사용할 프로필을\n등록해주세요.`}
      </div>
      <input
        className="border-brand-600 mt-10 h-[200px] w-[300px] cursor-pointer border"
        type="file"
        accept="image/jpeg,image/png"
        onChange={handleFileChange}
      />
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
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
