'use client';

import { Tabbar } from '@/src/components/Tabbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/src/types/skill';
import { CATEGORY_LABELS } from '@/src/constants/skill';

type SkillCategoriesProps = {
  currentCategory: Category;
};
export const CategoryTab = ({ currentCategory }: SkillCategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = (newCategory: Category) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory === 'ALL') params.delete('category');
    else params.set('category', newCategory);
    router.replace(`?${params.toString()}`, { scroll: true });
  };

  return (
    <Tabbar
      items={Object.entries(CATEGORY_LABELS).map(([category, label]) => ({
        key: category as Category,
        label,
      }))}
      currentItem={currentCategory}
      onClickItem={handleCategoryClick}
    />
  );
};
