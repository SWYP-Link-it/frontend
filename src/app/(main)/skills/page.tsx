import { ScrollToTop } from '@/src/components/ScrollToTop';
import { Category } from '@/src/features/skills/constants';
import { CreditInfoBanner } from '@/src/features/skills/CreditInfoBanner';
import { SkillCategories } from '@/src/features/skills/SkillCategories';
import { SkillList } from '@/src/features/skills/SkillList';
import { SkillCardDto } from '@/src/types/skill';

export default async function Skills({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const selectedCategory: Category =
    ((await searchParams).category as Category) || 'ALL';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills${
      selectedCategory === 'ALL' ? '' : `?category=${selectedCategory}`
    }`,
  );

  if (!res.ok) {
    return null;
  }

  const data: SkillCardDto[] = (await res.json()).data;

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="sticky top-[77px] z-50 bg-white px-28">
          <div className="my-6 flex flex-col gap-[2px]">
            <h1 className="text-2xl leading-[1.5] font-semibold text-gray-800">
              스킬 게시판
            </h1>
            <span className="leading-[1.5] font-medium text-gray-400">
              게시글을 확인하고 진짜 실력자에게 스킬을 배워보세요!
            </span>
          </div>
          <SkillCategories category={selectedCategory} />
        </div>
        <div className="flex flex-1 flex-col px-28 pb-[126px]">
          <div className="my-7">
            <CreditInfoBanner />
          </div>
          <span className="text-brand-600 mb-6 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] leading-6 font-semibold">
            내 크레딧 | 30
          </span>
          <SkillList list={data} />
        </div>
      </div>
      <ScrollToTop deps={[selectedCategory]} />
    </>
  );
}
