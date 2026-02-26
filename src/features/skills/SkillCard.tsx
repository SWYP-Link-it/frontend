import { SkillCardDto } from '@/src/types/skill';
import Link from 'next/link';
import Image from 'next/image';

type SkillCardProps = {
  skill: SkillCardDto;
};

export const SkillCard = ({ skill }: SkillCardProps) => {
  const { skillId, skillTitle, skillName, nickname, avgRating } = skill;

  return (
    <li className="h-[234px]">
      <Link
        href={`/skills/detail/${skillId}`}
        className="flex h-full cursor-pointer flex-col rounded-xl bg-white p-6"
      >
        <div className="mb-[17px] flex items-center gap-2">
          <Image src="/icons/avatar.svg" alt="profile" width={28} height={28} />
          {nickname}
        </div>

        <div className="line-clamp-3 leading-6 font-semibold text-gray-700">
          {skillTitle}
        </div>

        <div className="mt-auto mb-3 flex items-center gap-[3.27px]">
          <Image src="/icons/star.svg" alt="별" width={16} height={16} />
          <div
            className={`text-sm leading-[1.5] font-medium ${
              avgRating ? 'text-gray-600' : 'text-gray-400'
            }`}
          >
            {avgRating ? `${avgRating} / 5` : '평가 없음'}
          </div>
        </div>

        <span className="w-fit rounded-md bg-[#F4F2FF] px-[10px] py-[2px] text-xs font-semibold text-[#3477FF]">
          {skillName}
        </span>
      </Link>
    </li>
  );
};
