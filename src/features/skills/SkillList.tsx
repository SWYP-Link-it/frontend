import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';
import { Skill } from '@/src/types/types';

type SkillListProps = {
  list?: Skill[];
};

export const SkillList = ({ list }: SkillListProps) => {
  return (
    <>
      {list && list?.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {list.slice(0, 3).map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
          {list.length < 3 &&
            Array.from({ length: 3 - list.length }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

          <CardBanner />
          {list.slice(3).map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
      {!list ||
        (list.length === 0 && (
          <div className="bg-brand-100 flex flex-1 items-center justify-center gap-3 rounded-xl">
            <div className="flex flex-col items-center text-gray-400">
              <span>icon</span>
              <span className="text-center leading-[1.5] font-semibold whitespace-pre-wrap">{`아직 게시글이 없네요.\n게시글을 올려 게시판에 등록해보세요!`}</span>
            </div>
          </div>
        ))}
    </>
  );
};
