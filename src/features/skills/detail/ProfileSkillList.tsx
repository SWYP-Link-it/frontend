'use client';

import Link from 'next/link';
import { RequestIcon } from '@/src/components/icons/RequestIcon';

type ProfileSkillListProps = {
  currentId: number;
  list?: {
    skillId: number;
    skillName: string;
  }[];
};

export const ProfileSkillList = ({
  currentId,
  list,
}: ProfileSkillListProps) => {
  return (
    <aside className="flex cursor-pointer flex-col gap-3 rounded-xl bg-white px-4 py-5">
      <div className="flex items-center leading-[1.5] font-semibold text-gray-500">
        <RequestIcon size={20} className="text-brand-600 m-[6px]" />
        스킬 모음
      </div>
      <div className="flex flex-col gap-[11px]">
        {list?.map(({ skillId, skillName }, idx) => (
          <Link
            key={skillId}
            title={skillName}
            replace
            href={`/skills/detail/${skillId}`}
            className={`truncate rounded-xl ${currentId === skillId ? 'bg-gray-200' : ''} px-5 py-1 text-sm leading-[1.5] font-semibold text-gray-500`}
          >
            <span className="mr-2 text-base">{idx + 1}</span> {skillName}
          </Link>
        ))}
      </div>
    </aside>
  );
};
