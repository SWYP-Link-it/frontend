'use client';

import { ProgressBar } from '@/src/components/ProgressBar';

import { api } from '@/src/lib/api/api';
import { SkillInfo } from '@/src/types/skill';
import { useEffect, useState } from 'react';
import { useFormInfoFromSearchParams } from './hooks/useFormInfoFromSearchParams';
import { RequestFormProvider } from './RequestFormProvider';
import { RequestStep } from './RequestStep';
import { toast } from 'sonner';

export default function SkillRequestClient() {
  const { mentorId, skillId } = useFormInfoFromSearchParams();
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<SkillInfo[]>([]);

  useEffect(() => {
    if (!mentorId) return;

    api
      .get(`/exchange/mentors/${mentorId}/skills`)
      .then((response) => {
        setSkills(response.data.data);
      })
      .catch((error) => {
        const serverError = error.response?.data;
        toast.error(serverError.message);
      });
  }, []);

  if (!mentorId) {
    return <div>경고: 잘못된 경로입니다.</div>;
  }

  return (
    <RequestFormProvider key={skillId} skillList={skills}>
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
