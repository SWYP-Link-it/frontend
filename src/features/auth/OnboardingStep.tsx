'use client';

import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/src/components/Button';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api/api';
import { useUserInfoStore } from '@/src/stores/userInfoStore';
import Image from 'next/image';

type OnboardingStepProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const OnboardingStep = ({ step, setStep }: OnboardingStepProps) => {
  const router = useRouter();
  const { setUserInfo: setUserCreditInfo } = useUserInfoStore();

  const fetchUserCreditInfo = () => {
    api.get(`/credits/balance-user-details`).then((response) => {
      const { userId, userNickname, creditBalance } = response.data.data;
      setUserCreditInfo({ userId, userNickname, creditBalance });
    });
  };

  return (
    <>
      <div className="mt-[46px] text-center text-3xl leading-[1.4] font-bold whitespace-pre-wrap">
        {TITLE_LIST[step - 1]}
      </div>
      <div className="relative mt-8 h-[344px] w-[495px]">
        {IMAGE.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Step ${index + 1}`}
            width={495}
            height={344}
            className={`absolute top-0 left-0 transition-opacity duration-300 ${
              step === index + 1
                ? 'opacity-100'
                : 'pointer-events-none opacity-0'
            }`}
            priority
          />
        ))}
      </div>
      {step !== 3 && (
        <div className="mt-15 w-[380px]">
          <Button
            text="다음으로"
            mode="active"
            onClick={() => setStep((step) => step + 1)}
          />
        </div>
      )}
      {step === 3 && (
        <div className="mt-15 flex w-[380px] flex-col gap-3">
          <Button
            text="스킬 등록하고 1크레딧 받기"
            mode="active"
            onClick={() => {
              fetchUserCreditInfo();
              router.push('/profile');
            }}
          />
          <Button
            text="홈으로 이동하기"
            onClick={() => {
              fetchUserCreditInfo();
              router.push('/');
            }}
          />
        </div>
      )}
    </>
  );
};

const TITLE_LIST = [
  '회원가입을 완료하여\n2크레딧을 추가해드렸어요!',
  '링킷에선 돈 대신 크레딧으로\n스킬을 배울 수 있어요!',
  '시작부터 든든하게,\n1 크레딧을 더 충전해드릴게요!',
];

const IMAGE = [
  '/images/onboarding1.png',
  '/images/onboarding2.png',
  '/images/onboarding3.png',
];
