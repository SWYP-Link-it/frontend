import { CreditInfoBanner } from '@/src/features/skills/CreditInfoBanner';
import { SkillCategories } from '@/src/features/skills/SkillCategories';
import { SkillList } from '@/src/features/skills/SkillList';

export default async function Skills({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const selectedCategory = (await searchParams).category || '전체';

  return (
    <div className="flex flex-1 flex-col px-28 pb-[126px]">
      <div className="bg-brand-50 sticky top-[77px]">
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
      <div className="my-7">
        <CreditInfoBanner />
      </div>
      <span className="text-brand-600 mb-6 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] leading-6 font-semibold">
        내 크레딧 | 30
      </span>
      <SkillList category={selectedCategory} />
    </div>
  );
}
