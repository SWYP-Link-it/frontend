'use client';

import { ProgressBar } from '@/src/components/ProgressBar';
import { useFromInfoFromSearchParams } from '@/src/features/skills/request/hooks/useFormInfoFromSearchParams';
import { RequestFormProvider } from '@/src/features/skills/request/RequestFormProvider';
import { RequestStep } from '@/src/features/skills/request/RequestStep';
import { mockSkillList } from '@/src/lib/mocks/data';
import { useState } from 'react';

export default function SkillRequest() {
  const { mentorId, skillId } = useFromInfoFromSearchParams();
  const [step, setStep] = useState(1);

  if (!mentorId) {
    return <div>경고: 잘못된 경로입니다.</div>;
  }

  const otherSkills = mockSkillList.filter(
    (s) => s.profile.id == Number(mentorId),
  );

  return (
    <RequestFormProvider key={skillId} skillList={otherSkills}>
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
