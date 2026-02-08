'use client';

import { useUserInfoStore } from '@/src/stores/userInfoStore';

type MyCreditBadgeProps = {
  className?: string;
};

export const MyCreditBadge = ({ className }: MyCreditBadgeProps) => {
  const creditBalance = useUserInfoStore(
    (state) => state.userInfo?.creditBalance,
  );

  if (creditBalance === undefined) return null;

  return (
    <span
      className={`text-brand-600 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] text-base font-semibold ${className}`}
    >
      내 크레딧 | {creditBalance}
    </span>
  );
};
