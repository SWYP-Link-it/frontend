'use client';

import { useSearchParams } from 'next/navigation';

export const useFormInfoFromSearchParams = () => {
  const searchParams = useSearchParams();

  const mentorId = searchParams.get('mentorId');
  const skillId = searchParams.get('skillId');

  return {
    mentorId: mentorId ? Number(mentorId) : null,
    skillId: skillId ? Number(skillId) : null,
  };
};
