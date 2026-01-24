const categories = [
  '개발',
  '디자인',
  '편집',
  '마케팅',
  '외국어',
  '전공',
  '재테크',
  '운동',
  '음악',
  '기타',
] as const;

export const SkillCategories = () => {
  return (
    <div className="flex">
      {categories.map((category) => (
        <span
          className="w-[90px] pb-2 text-center text-lg leading-7 font-semibold text-gray-700"
          key={category}
        >
          {category}
        </span>
      ))}
    </div>
  );
};
