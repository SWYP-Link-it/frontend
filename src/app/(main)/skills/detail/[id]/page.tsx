import { DetailSectionTab } from '@/src/features/skills/detail/DetailSectionTab';
import { UserProfile } from '@/src/features/skills/detail/UserProfile';
import { SkillDetail } from '@/src/features/skills/detail/SkillDetail';
import { ProfileSkillList } from '@/src/features/skills/detail/ProfileSkillList';
import { ScrollToTop } from '@/src/components/ScrollToTop';
import { SkillDetailDto, SkillReviewDto } from '@/src/types/skill';
import { DetailFooter } from '@/src/features/skills/detail/DetailFooter';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const skillId = Number(id);
  const detailRes = await fetchSkillDetail(skillId, {
    next: { revalidate: 60 },
  });

  if (!detailRes.ok) {
    notFound();
  }

  const skillDetail: SkillDetailDto = (await detailRes.json()).data;

  const {
    nickname,
    mainSkill: { skillName },
  } = skillDetail;
  return {
    title: `스킬 상세보기 · ${skillName} | 링킷`,
    description: `${nickname}님이 공유한 ${skillName} 스킬을 확인해보세요`,
    openGraph: {
      title: `스킬 상세보기 · ${skillName} | 링킷`,
      description: `${nickname}님이 공유한 ${skillName} 스킬을 확인해보세요`,
    },
  };
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const skillId = Number(id);

  const [detailRes, reviewRes] = await Promise.all([
    fetchSkillDetail(skillId, { cache: 'no-store' }),
    fetchSkillReviews(skillId),
  ]);
  if (!detailRes.ok) {
    return <div>존재하지 않는 스킬입니다.</div>;
  }

  const skillDetail: SkillDetailDto = (await detailRes.json()).data;
  const reviewList: SkillReviewDto[] = (await reviewRes.json()).data.contents;

  return (
    <>
      <div className="flex flex-1 flex-col bg-[#F8FAFE]">
        <div className="sticky top-18 z-50 bg-white px-28">
          <div className="mx-auto max-w-284">
            <UserProfile
              nickname={skillDetail.nickname}
              timesTaught={skillDetail.timesTaught}
              userAvgRating={skillDetail.userAvgRating}
            />
            <DetailSectionTab />
          </div>
        </div>
        <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 flex-1 gap-5 pt-12 pb-9">
          <div className="w-0 flex-1">
            <SkillDetail skillDetail={skillDetail} reviews={reviewList} />
          </div>
          <div className="sticky top-75 h-fit w-[173px]">
            <ProfileSkillList list={skillDetail.skills} currentId={skillId} />
          </div>
        </div>
        <DetailFooter mentorId={skillDetail.userId} skillId={skillId} />
      </div>
      <ScrollToTop deps={[id]} />
    </>
  );
}

const fetchSkillDetail = (skillId: number, init?: RequestInit) =>
  fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/market/skills/${skillId}`, init);

const fetchSkillReviews = (skillId: number) =>
  fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/reviews/skills/${skillId}?size=5`,
    { next: { revalidate: 30 } },
  );
