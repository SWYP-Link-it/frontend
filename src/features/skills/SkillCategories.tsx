'use client';

import { Tabbar } from '@/src/components/Tabbar';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams();
    params.set('category', category);
    router.replace(`?${params.toString()}`, { scroll: true });
  };

  return (
    <Tabbar
      items={categories}
      currentItem={category}
      onClickItem={handleCategoryClick}
    />
  );
};
