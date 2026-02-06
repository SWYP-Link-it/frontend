import { DetailTabs } from '@/src/features/skills/detail/DetailTabs';
import { UserProfile } from '@/src/features/skills/detail/UserProfile';
import { SkillDetail } from '@/src/features/skills/detail/SkillDetail';
import { ProfileSkillList } from '@/src/features/skills/detail/ProfileSkillList';
import { ScrollToTop } from '@/src/components/ScrollToTop';
import { SkillDetailDto } from '@/src/types/skill';
import { RequestFooter } from '@/src/features/skills/request/RequestFooter';

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const skillId = Number(id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills/${skillId}`,
  );

  if (!res.ok) {
    return null;
  }

  const skillDetail: SkillDetailDto = (await res.json()).data;

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="sticky top-[77px] z-50 bg-white px-28">
          <UserProfile
            nickname={skillDetail.nickname}
            timesTaught={skillDetail.timesTaught}
          />
          <DetailTabs />
        </div>
        <div className="flex flex-1 gap-5 bg-[#F8FAFE] px-28 pt-12 pb-9">
          <div className="w-0 flex-1">
            <SkillDetail {...skillDetail} />
          </div>
          <div className="sticky top-77 h-fit w-[173px]">
            <ProfileSkillList list={skillDetail.skills} currentId={skillId} />
          </div>
        </div>
        <RequestFooter mentorId={skillDetail.profileId} skillId={skillId} />
      </div>
      <ScrollToTop deps={[id]} />
    </>
  );
}
