import { AlertIcon } from '@/src/components/icons/AlertIcon';
import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';
import { SkillCardDto } from '@/src/types/skill';

type SkillListProps = {
  list?: SkillCardDto[];
};

export const SkillList = ({ list }: SkillListProps) => {
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
