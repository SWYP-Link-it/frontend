import { AlertIcon } from '@/src/components/icons/AlertIcon';
import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';
import { SkillCardDto } from '@/src/types/skill';

type SkillListProps = {
  category: string;
  searchKeyword?: string;
};

export const SkillList = async ({
  category,
  searchKeyword,
}: SkillListProps) => {
  const params = new URLSearchParams();
  if (category !== 'ALL') params.append('category', category);
  if (searchKeyword) params.append('searchKeyword', searchKeyword);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills?${params}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    return null;
  }

  const list: SkillCardDto[] = (await res.json()).data;

  return (
    <>
      {list && list.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {list.slice(0, 3).map((skill) => (
            <SkillCard key={skill.skillId} skill={skill} />
          ))}
          {list.length < 3 &&
            Array.from({ length: 3 - list.length }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

          <CardBanner />
          {list.slice(3).map((skill) => (
            <SkillCard key={skill.skillId} skill={skill} />
          ))}
        </div>
      )}
      {(!list || list.length === 0) && (
        <div className="bg-brand-100 flex flex-1 flex-col items-center justify-center gap-3 rounded-xl text-gray-400">
          <AlertIcon size={24} />
          <span className="text-center leading-[1.5] font-semibold whitespace-pre-wrap">{`아직 게시글이 없네요.\n게시글을 올려 게시판에 등록해보세요!`}</span>
        </div>
      )}
    </>
  );
};
