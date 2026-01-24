import { CardBanner } from './CardBanner';
import { SkillCard } from './SkillCard';

type SkillListProps = {
  category?: string;
};

export const SkillList = ({ category }: SkillListProps) => {
  const list: any[] = [];
  // const list = [
  //   {
  //     id: 1,
  //     nickname: '홍길동',
  //     title: '리액트 기초',
  //     description: '리액트 기초를 배워봅시다',
  //     rate: 4.5,
  //   },
  //   {
  //     id: 2,
  //     nickname: '김철수',
  //     title: '디자인 입문',
  //     description: '디자인의 기본 개념을 알아봅시다',
  //     rate: 4.0,
  //   },
  //   {
  //     id: 3,
  //     nickname: '이영희',
  //     title: '마케팅 전략',
  //     description: '효과적인 마케팅 전략을 수립하는 방법',
  //     rate: 4.8,
  //   },
  //   {
  //     id: 4,
  //     nickname: '홍길동',
  //     title: '리액트 기초',
  //     description: '리액트 기초를 배워봅시다',
  //     rate: 4.5,
  //   },
  //   {
  //     id: 5,
  //     nickname: '김철수',
  //     title: '디자인 입문',
  //     description: '디자인의 기본 개념을 알아봅시다',
  //     rate: 4.0,
  //   },
  //   {
  //     id: 6,
  //     nickname: '이영희',
  //     title: '마케팅 전략',
  //     description:
  //       '효과적인 마케팅 전략을 수립하는 방법효과적인 마케팅 전략을 수립하는 방법효과적인 마케팅 전략을 수립하는 방법',
  //   },
  // ];

  return (
    <>
      {list?.length > 0 && (
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
