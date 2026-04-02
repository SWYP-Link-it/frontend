import { Category, SkillCardDto } from '@/src/types/skill';
import { SkillList } from './SkillList';

type SkillListWrapperProps = {
  selectedCategory: Category;
  searchKeyword?: string;
};

export const SkillListWrapper = async ({
  selectedCategory,
  searchKeyword,
}: SkillListWrapperProps) => {
  const params = new URLSearchParams();
  if (selectedCategory !== 'ALL') params.append('category', selectedCategory);
  if (searchKeyword) params.append('searchKeyword', searchKeyword);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills?${params}&size=19`,
    { next: { revalidate: 30 } },
  );

  if (!res.ok) {
    return null;
  }

  const { skills, nextCursorId } = (await res.json()).data as {
    skills: SkillCardDto[];
    nextCursorId: number | null;
  };

  return (
    <SkillList
      selectedCategory={selectedCategory}
      searchKeyword={searchKeyword}
      initialData={skills}
      initialCursorId={nextCursorId}
    />
  );
};
