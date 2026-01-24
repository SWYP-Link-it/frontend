import { SkillCard } from './SkillCard';

export const SkillList = () => {
  const list = [
    {
      id: 1,
      nickname: '홍길동',
      title: '리액트 기초',
      description: '리액트 기초를 배워봅시다',
      rate: 4.5,
    },
    {
      id: 2,
      nickname: '김철수',
      title: '디자인 입문',
      description: '디자인의 기본 개념을 알아봅시다',
      rate: 4.0,
    },
    {
      id: 3,
      nickname: '이영희',
      title: '마케팅 전략',
      description: '효과적인 마케팅 전략을 수립하는 방법',
      rate: 4.8,
    },
    {
      id: 4,
      nickname: '홍길동',
      title: '리액트 기초',
      description: '리액트 기초를 배워봅시다',
      rate: 4.5,
    },
    {
      id: 5,
      nickname: '김철수',
      title: '디자인 입문',
      description: '디자인의 기본 개념을 알아봅시다',
      rate: 4.0,
    },
    {
      id: 6,
      nickname: '이영희',
      title: '마케팅 전략',
      description: '효과적인 마케팅 전략을 수립하는 방법',
      rate: 4.8,
    },
  ];

  return (
    <div className="grid grid-cols-4">
      {list.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};
