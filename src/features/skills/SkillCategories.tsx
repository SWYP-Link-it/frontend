import Link from 'next/link';

const categories = [
  '전체',
  '개발',
  '디자인',
  '편집',
  '마케팅',
  '외국어',
  '재테크',
  '운동',
  '음악',
  '기타',
] as const;

type SkillCategoriesProps = {
  category: string;
};
export const SkillCategories = ({ category }: SkillCategoriesProps) => {
  const position =
    categories.indexOf(category as (typeof categories)[number]) * 90;

  return (
    <div className="w-fit">
      <div className="flex">
        {categories.map((category) => (
          <Link
            href={`?category=${category}`}
            className="w-[90px] cursor-pointer pb-2 text-center text-lg leading-7 font-semibold text-gray-700"
            key={category}
          >
            {category}
          </Link>
        ))}
      </div>
      <div
        className="bg-brand-600 h-[2px] w-[90px] rounded-full duration-300 ease-in-out"
        style={{
          transform: `translateX(${position}px)`,
        }}
      ></div>
      <div className="bg-brand-200 h-[1px] w-full rounded-full"></div>
    </div>
  );
};
