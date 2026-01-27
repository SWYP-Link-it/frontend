import { DetailTabs } from '@/src/features/skills/detail/DetailTabs';
import { UserIntroduction } from '@/src/features/skills/detail/UserIntroduction';
import { SkillDetail } from '@/src/features/skills/detail/SkillDetail';
import { Button } from '@/src/components/Button';

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className="relative flex h-full flex-col overflow-y-auto">
      <div className="sticky top-0 bg-white px-28">
        <UserIntroduction />
        <DetailTabs />
      </div>
      <div className="flex flex-1 gap-5 bg-[#F8FAFE] px-28 pt-12 pb-9">
        <div className="w-0 flex-1">
          <SkillDetail
            title={'example'}
            description={'example description'}
            price={0}
            rating={0}
            reviewCount={0}
          />
        </div>
        <div className="flex h-fit w-[173px] flex-col gap-3 rounded-xl bg-white px-4 py-5">
          <div className="flex items-center leading-[1.5] font-semibold text-gray-500">
            <span className="h-8 w-8 border">아</span>스킬 모음
          </div>
          <div className="flex flex-col gap-[11px]">
            <div className="truncate rounded-xl bg-gray-200 px-5 py-1 text-sm leading-[1.5] font-semibold text-gray-500">
              <span className="mr-2 text-base">1</span> 그래픽 디자인
            </div>
            <div className="truncate rounded-xl bg-gray-200 px-5 py-1 text-sm leading-[1.5] font-semibold text-gray-500">
              <span className="mr-2 text-base">2</span> 인터랙션 디자인
            </div>
            <div className="truncate rounded-xl bg-gray-200 px-5 py-1 text-sm leading-[1.5] font-semibold text-gray-500">
              <span className="mr-2 text-base">3</span> 그래피티 디자인
            </div>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full items-center justify-between bg-white px-28 py-6">
        <span className="text-brand-600 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] leading-6 font-semibold">
          내 크레딧 | 30
        </span>
        <div className="flex gap-[15px]">
          <div className="w-[380px]">
            <Button text={'스킬 요청하기'} mode="active" />
          </div>
          <div className="w-[380px]">
            <Button text={'메세지 보내기'} />
          </div>
        </div>
      </div>
    </div>
  );
}
