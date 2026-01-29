'use client';

import { ProgressBar } from '@/src/components/ProgressBar';
import { RequestStep } from '@/src/features/skills/request/RequestStep';
import { useState } from 'react';

export default function SkillRequest() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-1 flex-col items-center pt-[91px] pb-22">
      <div className="w-[492px]">
        <ProgressBar step={step} totalSteps={3} />
      </div>
      <h1 className="mt-[34px] mb-[27px] text-2xl leading-[1.5] font-semibold text-gray-800">
        스킬 요청서 작성
      </h1>
      <RequestStep step={step} setStep={setStep} />
    </div>
  );
}
