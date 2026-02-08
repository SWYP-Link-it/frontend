import { DetailSectionTab } from '@/src/features/skills/detail/DetailSectionTab';
import { UserProfile } from '@/src/features/skills/detail/UserProfile';
import { SkillDetail } from '@/src/features/skills/detail/SkillDetail';
import { ProfileSkillList } from '@/src/features/skills/detail/ProfileSkillList';
import { ScrollToTop } from '@/src/components/ScrollToTop';
import { SkillDetailDto } from '@/src/types/skill';
import { DetailFooter } from '@/src/features/skills/detail/DetailFooter';

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const skillId = Number(id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills/${skillId}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    return null;
  }

  const skillDetail: SkillDetailDto = (await res.json()).data;

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#F8FAFE]">
        <div className="sticky top-18 z-50 bg-white px-28">
          <div className="mx-auto max-w-284">
            <UserProfile
              nickname={skillDetail.nickname}
              timesTaught={skillDetail.timesTaught}
            />
            <DetailSectionTab />
          </div>
        </div>
        <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 flex-1 gap-5 pt-12 pb-9">
          <div className="w-0 flex-1">
            <SkillDetail {...skillDetail} />
          </div>
          <div className="sticky top-75 h-fit w-[173px]">
            <ProfileSkillList list={skillDetail.skills} currentId={skillId} />
          </div>
        </div>
        <DetailFooter mentorId={skillDetail.profileId} skillId={skillId} />
      </div>
      <ScrollToTop deps={[id]} />
    </>
  );
}
