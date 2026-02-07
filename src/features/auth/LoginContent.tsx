'use client';

import Image from 'next/image';

export const LoginContent = () => {
  const handleLogin = (provider: 'naver' | 'kakao') => {
    const returnUrl =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/'
        : 'https://app.desklab.kr/';

    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/${provider}?returnUrl=${encodeURIComponent(returnUrl)}`;
  };

  return (
    <div className="flex w-120 flex-col items-center gap-[50px] rounded-2xl bg-white py-[59px]">
      <div className="flex flex-col items-center">
        <Image src="/icons/logo.svg" alt="logo" width={167.24} height={72} />
        <div className="mt-6 mb-4 text-2xl font-bold text-gray-900">
          링킷에 오신걸 환영합니다!
        </div>
        <div className="text-center text-base font-medium whitespace-pre-wrap text-gray-500">
          {` 재능을 나누고 필요한 스킬을 배우는 가장 쉬운 방법,\n링킷에서 당신의 스킬을 나눠보세요.`}
        </div>
      </div>
      <div className="flex w-[380px] flex-col gap-3">
        <button
          className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FEE501] py-2"
          onClick={() => handleLogin('kakao')}
        >
          <Image src="/icons/kakao.svg" alt="kakao" width={24} height={24} />
          <span className="font-semibold text-gray-900">
            카카오 계정으로 계속하기
          </span>
        </button>
        <button
          className="flex h-[58px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#02C75A] py-2"
          onClick={() => handleLogin('naver')}
        >
          <Image src="/icons/naver.svg" alt="naver" width={24} height={24} />
          <span className="font-semibold text-white">
            네이버 계정으로 계속하기
          </span>
        </button>
      </div>
    </div>
  );
};
