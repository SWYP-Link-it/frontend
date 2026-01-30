import { Skill } from '@/src/types/types';
import Link from 'next/link';

type SkillCardProps = {
  skill: Skill;
};

export const SkillCard = ({ skill }: SkillCardProps) => {
  const { id, profile, title, description, rate } = skill;
  return (
    <Link
      href={`/skills/detail/${id}`}
      className="flex h-[234px] cursor-pointer flex-col rounded-xl bg-white p-6"
    >
      <div className="mb-[17px] flex items-center gap-2">
        <div className="bg-brand-100 h-7 w-7 overflow-hidden rounded-full">
          Avatar
        </div>
        {profile.nickname}
      </div>
      <div className="line-clamp-3 leading-6 font-semibold text-gray-700">
        {description}
      </div>
      <div className="mt-auto flex items-center gap-[3.27px]">
        <span>별</span>
        <div
          className={`text-sm leading-[1.5] font-medium ${rate ? 'text-gray-600' : 'text-gray-400'}`}
        >
          {rate ? `${rate}/5` : '평가 없음'}
        </div>
      </div>
      <span className="mt-3 w-fit rounded-md bg-[#F4F2FF] px-[10px] py-[2px] text-xs leading-[18px] font-semibold text-[#3477FF]">
        {title}
      </span>
    </Link>
  );
};
