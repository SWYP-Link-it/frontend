'use client';

import { ProgressBar } from '@/src/components/ProgressBar';
import { RequestFormProvider } from '@/src/features/skills/request/RequestFormProvider';
import { RequestStep } from '@/src/features/skills/request/RequestStep';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SkillRequest() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);

  const skillId = searchParams.get('skillId');

  if (!skillId) return null;

  return (
    <RequestFormProvider key={skillId} skillId={Number(skillId)}>
      <div className="flex flex-1 flex-col items-center pt-[91px] pb-22">
        <div className="w-[492px]">
          <ProgressBar step={step} totalSteps={3} />
        </div>
        <h1 className="mt-[34px] mb-[27px] text-2xl leading-[1.5] font-semibold text-gray-800">
          스킬 요청서 작성
        </h1>
        <RequestStep step={step} setStep={setStep} />
      </div>
    </RequestFormProvider>
  );
}
