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
    <div>
      {categories.map((category) => (
        <span key={category}>{category}</span>
      ))}
    </div>
  );
};
