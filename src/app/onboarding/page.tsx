'use client';

import { ProgressBar } from '@/src/components/ProgressBar';
import { OnboardingStep } from '@/src/features/auth/steps/OnboardingStep';
import { ProfileStep } from '@/src/features/auth/steps/ProfileStep';
import Image from 'next/image';
import { useState } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#F8FAFE]">
      <Image
        className="absolute top-12.5 left-25"
        src="/icons/logo.svg"
        alt="logo"
        width={134}
        height={54}
      />
      <div className="flex w-[490px] flex-col items-center">
        <ProgressBar step={step} totalSteps={4} />
        {step === 1 && <ProfileStep setStep={setStep} />}
        {step === 2 && <OnboardingStep step={step} setStep={setStep} />}
        {step === 3 && <OnboardingStep step={step} setStep={setStep} />}
        {step === 4 && <OnboardingStep step={step} setStep={setStep} />}
      </div>
    </div>
  );
}
