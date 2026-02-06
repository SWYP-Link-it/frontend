'use client';

import { Tabbar } from '@/src/components/Tabbar';
import { useRouter } from 'next/navigation';
import { Category } from '@/src/types/skill';
import { CATEGORY_LABELS } from '@/src/constants/skill';

type SkillCategoriesProps = {
  category: Category;
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
      items={Object.entries(CATEGORY_LABELS).map(([category, label]) => ({
        key: category,
        label,
      }))}
      currentItem={category}
      onClickItem={handleCategoryClick}
    />
  );
};
