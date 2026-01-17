import Image from 'next/image';

type SkillCardProps = {
  avatarUrl: string;
  nickname: string;
  skillTitle: string;
  rate: number;
  categories: string[];
};

export const SkillCard = ({
  avatarUrl,
  nickname,
  skillTitle,
  rate,
  categories,
}: SkillCardProps) => {
  return (
    <div className="flex h-[260px] w-[260px] flex-col rounded-xl bg-white p-4">
      <div className="flex items-center gap-2">
        <Image
          src={avatarUrl}
          alt={`a`}
          width={30}
          height={30}
          className="rounded-full border"
        />
        <div>{nickname}</div>
      </div>
      <div className="text-lg">{skillTitle}</div>
      <div>⭐ {rate}/5</div>
      <div className="flex gap-2">
        {categories.map((category) => (
          <div key={category} className="bg-gray-200">
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};
