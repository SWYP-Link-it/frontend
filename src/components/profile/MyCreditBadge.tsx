'use client';

import { useQueryCreditBalance } from '@/src/features/profile/hooks/useQueryCreditBalance';

type MyCreditBadgeProps = {
  className?: string;
};

export const MyCreditBadge = ({ className }: MyCreditBadgeProps) => {
  const { data: credit } = useQueryCreditBalance();

  return credit ? (
    <span
      className={`text-brand-600 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] text-base font-semibold ${className}`}
    >
      내 크레딧 | {credit}
    </span>
  ) : null;
};
