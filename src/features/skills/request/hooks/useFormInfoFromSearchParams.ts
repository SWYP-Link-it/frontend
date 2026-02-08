'use client';

import { useSearchParams } from 'next/navigation';

export const useFormInfoFromSearchParams = () => {
  const searchParams = useSearchParams();

  const mentorId = searchParams.get('mentorId');
  const skillId = searchParams.get('skillId');

  return {
    mentorId: Number(mentorId),
    skillId: Number(skillId),
  };
};
