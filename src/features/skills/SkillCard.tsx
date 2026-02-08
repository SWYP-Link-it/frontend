import { SkillCardDto } from '@/src/types/skill';
import Link from 'next/link';
import Image from 'next/image';

type SkillCardProps = {
  skill: SkillCardDto;
};

export const SkillCard = ({ skill }: SkillCardProps) => {
  const { skillId, skillTitle, skillName, nickname } = skill;

  const dummyRate = 3.5;

  return (
    <Link
      href={`/skills/detail/${skillId}`}
      className="flex h-[234px] cursor-pointer flex-col rounded-xl bg-white p-6"
    >
      <div className="mb-[17px] flex items-center gap-2">
        <Image src={'/icons/avatar.svg'} alt="profile" width={28} height={28} />
        {nickname}
      </div>
      <div className="line-clamp-3 leading-6 font-semibold text-gray-700">
        {skillTitle}
      </div>
      {/* <div className="mt-auto flex items-center gap-[3.27px]">
        <span>별</span>
        <div
          className={`text-sm leading-[1.5] font-medium ${dummyRate ? 'text-gray-600' : 'text-gray-400'}`}
        >
          {dummyRate ? `${dummyRate}/5` : '평가 없음'}
        </div>
      </div> */}
      <span className="mt-auto w-fit rounded-md bg-[#F4F2FF] px-[10px] py-[2px] text-xs leading-[18px] font-semibold text-[#3477FF]">
        {skillName}
      </span>
    </Link>
  );
};
