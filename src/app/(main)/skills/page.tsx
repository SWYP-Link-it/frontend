import { ScrollToTop } from '@/src/components/ScrollToTop';
import { CreditInfoBanner } from '@/src/features/skills/CreditInfoBanner';
import { SkillList } from '@/src/features/skills/SkillList';
import { Category, SkillCardDto } from '@/src/types/skill';
import { MyCreditBadge } from '@/src/components/profile/MyCreditBadge';
import { CategoryTab } from '@/src/features/skills/CategoryTab';

export default async function Skills({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; searchKeyword?: string }>;
}) {
  const selectedCategory: Category =
    ((await searchParams).category as Category) || 'ALL';

  const searchKeyword = (await searchParams).searchKeyword;

  const params = new URLSearchParams();

  if (selectedCategory !== 'ALL') params.append('category', selectedCategory);
  if (searchKeyword) params.append('searchKeyword', searchKeyword);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills?${params.toString()}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    return null;
  }

  const data: SkillCardDto[] = (await res.json()).data;

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="sticky top-18 z-50 bg-white px-28">
          <div className="mx-auto max-w-284">
            <div className="my-6 flex flex-col gap-[2px]">
              <h1 className="text-2xl leading-[1.5] font-semibold text-gray-800">
                스킬 게시판
              </h1>
              <span className="leading-[1.5] font-medium text-gray-400">
                게시글을 확인하고 진짜 실력자에게 스킬을 배워보세요!
              </span>
            </div>
            <CategoryTab category={selectedCategory} />
          </div>
        </div>
        <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 flex-1 flex-col pb-[126px]">
          <div className="my-7">
            <CreditInfoBanner />
          </div>
          <MyCreditBadge className="mb-6" />
          <SkillList list={data} />
        </div>
      </div>
      <ScrollToTop deps={[selectedCategory]} />
    </>
  );
}
