'use client';

import { Button } from '@/src/components/Button';
import { Input } from '@/src/components/Input';
import { api } from '@/src/lib/api/api';
import { useAuthStore } from '@/src/stores/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Signup() {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();

  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedRegex = /^[a-zA-Z0-9가-힣]$/;
    const isControlKey =
      e.ctrlKey || e.metaKey || navigationKeys.includes(e.key);

    if (!allowedRegex.test(e.key) && !isControlKey) {
      e.preventDefault();
    }
  };

  const handleSubmit = async () => {
    api
      .post('/auth/complete-registration', {
        nickname,
      })
      .then((response) => {
        setAccessToken(response.data.data.accessToken);
        router.push('/onboarding');
      })
      .catch((error) => {
        // TODO: toast 에러
        // TODO: 에러 메시지 상세화
        setErrorMessage('회원가입 실패');
      });
  };

  return (
    <div className="mx-auto flex h-full w-[490px] flex-col items-center justify-center gap-12">
      <div className="text-center text-3xl leading-[1.4] font-bold whitespace-pre-wrap">
        {`링킷에서 사용할 프로필을\n등록해주세요.`}
      </div>
      <div className="border-brand-600 h-[200px] w-[300px] border">avatar</div>
      <div className="w-full">
        <Input
          label="닉네임"
          placeholder="사용할 이름을 입력해주세요."
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          errorMessage={errorMessage}
          onKeyDown={handleKeyDown}
          maxLength={10}
        />
      </div>
      <div className="w-[380px]">
        <Button
          text="회원가입"
          mode={!nickname ? 'inactive' : 'active'}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}

const navigationKeys = [
  'Backspace',
  'Delete',
  'ArrowLeft',
  'ArrowRight',
  'Home',
  'End',
  'Tab',
];
