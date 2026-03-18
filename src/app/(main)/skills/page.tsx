import { CreditInfoBanner } from '@/src/features/skills/CreditInfoBanner';
import { CATEGORIES, Category } from '@/src/types/skill';
import { MyCreditBadge } from '@/src/components/profile/MyCreditBadge';
import { CategoryTab } from '@/src/features/skills/CategoryTab';
import { redirect } from 'next/navigation';
import { CATEGORY_LABELS } from '@/src/constants/skill';
import { SkillListWrapper } from '@/src/features/skills/SkillListWrapper';
import { Suspense } from 'react';
import { LoaderView } from '@/src/components/LoaderView';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; searchKeyword?: string }>;
}) {
  const { category, searchKeyword } = await searchParams;
  return {
    title: '스킬 장터 둘러보기 | 링킷',
    description: getSkillListDescription({ category, searchKeyword }),
    openGraph: {
      title: '스킬 장터 둘러보기 | 링킷',
      description: getSkillListDescription({ category, searchKeyword }),
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/skills`,
    },
  };
}

export default async function Skills({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; searchKeyword?: string }>;
}) {
  const { category, searchKeyword } = await searchParams;

  if (category && !CATEGORIES.includes(category as Category)) {
    redirect('/skills');
  }

  const selectedCategory: Category = (category as Category) || 'ALL';

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="sticky top-18 z-50 bg-white px-28">
          <div className="mx-auto max-w-284">
            <div className="my-6 flex flex-col gap-[2px]">
              <h1 className="text-2xl leading-[1.5] font-semibold text-gray-800">
                스킬 게시판
              </h1>
              <span className="text-xs font-medium text-gray-400">
                게시글을 확인하고 진짜 실력자에게 스킬을 배워보세요!
              </span>
            </div>
            <CategoryTab currentCategory={selectedCategory} />
          </div>
        </div>
        <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 flex-1 flex-col pb-[126px]">
          <div className="my-7">
            <CreditInfoBanner />
          </div>
          <MyCreditBadge className="mb-6" />
          <Suspense fallback={<LoaderView loadingText="불러오는 중..." />}>
            <SkillListWrapper
              selectedCategory={selectedCategory}
              searchKeyword={searchKeyword}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

const getSkillListDescription = ({
  category,
  searchKeyword,
}: {
  category?: string;
  searchKeyword?: string;
}) => {
  if (searchKeyword) {
    if (category) {
      return `${CATEGORY_LABELS[category as Category]} 분야에서 '${searchKeyword}' 관련 스킬을 찾아보세요`;
    }
    return `'${searchKeyword}' 관련 스킬을 탐색해보세요`;
  }

  if (category) {
    return `${CATEGORY_LABELS[category as Category]} 분야의 다양한 스킬을 탐색해보세요`;
  }

  return '링킷 유저들이 공유한 다양한 스킬을 탐색해보세요';
};
