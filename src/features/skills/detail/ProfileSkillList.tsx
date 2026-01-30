'use client';

import { Skill } from '@/src/types/types';
import Link from 'next/link';

type ProfileSkillListProps = {
  currentId: number;
  list?: Skill[];
};

export const ProfileSkillList = ({
  currentId,
  list,
}: ProfileSkillListProps) => {
  return (
    <div className="flex cursor-pointer flex-col gap-3 rounded-xl bg-white px-4 py-5">
      <div className="flex items-center leading-[1.5] font-semibold text-gray-500">
        <span className="h-8 w-8 border">아</span>스킬 모음
      </div>
      <div className="flex flex-col gap-[11px]">
        {list?.map((skill, idx) => (
          <Link
            key={skill.id}
            title={skill.title}
            href={`/skills/detail/${skill.id}`}
            className={`truncate rounded-xl ${currentId === skill.id ? 'bg-gray-200' : ''} px-5 py-1 text-sm leading-[1.5] font-semibold text-gray-500`}
          >
            <span className="mr-2 text-base">{idx + 1}</span> {skill.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
