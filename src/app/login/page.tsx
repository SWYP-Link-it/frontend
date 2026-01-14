'use client';

import axios from 'axios';
import Image from 'next/image';

export default function Login() {
  const handleLogin = () => {
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/login`, {
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#17171C]">
      <Image
        className="absolute top-12.5 left-25"
        src="/icons/logo.svg"
        alt="logo"
        width={111}
        height={48}
      />
      <div className="flex w-120 flex-col items-center gap-[50px] rounded-2xl bg-black px-[50px] py-15 text-white">
        <div className="flex flex-col items-center gap-[29px]">
          <Image src="/icons/logo.svg" alt="logo" width={152} height={66} />
          <div className="flex flex-col items-center gap-4">
            <div className="text-2xl font-bold">링킷에 오신걸 환영합니다!</div>
            <div className="text-center text-base font-medium whitespace-pre-wrap text-[#9599A4]">
              {` 재능을 나누고 필요한 스킬을 배우는 가장 쉬운 방법,\n링킷에서 당신의 스킬을 나눠보세요.`}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <button
            className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FEE501] py-2"
            onClick={handleLogin}
          >
            <Image src="/icons/kakao.svg" alt="kakao" width={24} height={24} />
            <span className="font-semibold text-black">
              카카오 계정으로 계속하기
            </span>
          </button>
          <button className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#02C75A] py-2">
            <Image src="/icons/naver.svg" alt="naver" width={24} height={24} />
            <span className="font-semibold text-white">
              네이버 계정으로 계속하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
