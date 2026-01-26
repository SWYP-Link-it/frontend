import { DetailTabs } from '@/src/features/skills/detail/DetailTabs';
import { UserIntroduction } from '@/src/features/skills/detail/UserIntroduction';
import { SkillDetail } from '@/src/features/skills/detail/SkillDetail';

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
      <div className="flex flex-1 flex-row bg-[#F8FAFE] px-28">
        <div className="w-0 flex-1">
          <SkillDetail
            title={'example'}
            description={'example description'}
            price={0}
            rating={0}
            reviewCount={0}
          />
        </div>
        <div className="flex h-fit w-[173px] flex-col bg-white">
          <div>
            <span>아이콘</span>스킬 모음
          </div>
          <div>1 그래픽 디자인</div>
          <div>2 인터랙션 디자인</div>
          <div>3 그래피티 디자인</div>
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full justify-between bg-white px-28">
        <span>내 크레딧</span>
        <div className="flex">
          <button>스킬 요청하기</button>
          <button>메세지 보내기</button>
        </div>
      </div>
    </div>
  );
}
