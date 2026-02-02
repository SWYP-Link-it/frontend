'use client';

import { useSearchParams } from 'next/navigation';

export const useFromInfoFromSearchParams = () => {
  const searchParams = useSearchParams();

  const mentorId = searchParams.get('mentorId');
  const skillId = searchParams.get('skillId');

  return {
    mentorId: Number(mentorId),
    skillId: Number(skillId),
  };
};
