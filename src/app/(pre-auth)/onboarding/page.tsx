'use client';

import { ProgressBar } from '@/src/components/ProgressBar';
import { OnboardingStep } from '@/src/features/auth/OnboardingStep';
import Image from 'next/image';
import { useState } from 'react';

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="mx-auto flex h-full w-[490px] flex-col items-center justify-center">
      <ProgressBar step={step} totalSteps={3} />
      <OnboardingStep step={step} setStep={setStep} />
    </div>
  );
}
