'use client';

import { Dispatch, SetStateAction } from 'react';
import { Button } from '@/src/components/Button';
import { useRouter } from 'next/navigation';

type OnboardingStepProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export const OnboardingStep = ({ step, setStep }: OnboardingStepProps) => {
  const router = useRouter();

  return (
    <>
      <div className="mt-10 text-center text-3xl leading-[1.4] font-bold whitespace-pre-wrap">
        {TITLE_LIST[step - 1]}
      </div>
      <div className="border-brand-600 mt-10 h-[350px] w-[500px] border">
        {IMAGE[step - 1]}
      </div>

      {step !== 3 && (
        <div className="mt-10 w-[380px]">
          <Button
            text="다음으로"
            mode="active"
            onClick={() => setStep((step) => step + 1)}
          />
        </div>
      )}
      {step === 3 && (
        <div className="mt-5 flex w-[380px] flex-col gap-3">
          <Button
            text="스킬 등록하고 2크레딧 받기"
            // TODO: 경로 변경 필요
            mode="active"
            onClick={() => router.push('/mypage/skills')}
          />
          <Button text="홈으로 이동하기" onClick={() => router.push('/')} />
        </div>
      )}
    </>
  );
};

const TITLE_LIST = [
  '당신의 스킬이 누군가에는\n꼭 필요한 도움이 됩니다',
  '링킷에선 돈 대신 크레딧으로\n스킬을 배울 수 있어요!',
  '시작부터 든든하게,\n2 크레딧을 충전해드릴게요!',
];

const IMAGE = [
  '/images/onboarding1.png',
  '/images/onboarding2.png',
  '/images/onboarding3.png',
];
