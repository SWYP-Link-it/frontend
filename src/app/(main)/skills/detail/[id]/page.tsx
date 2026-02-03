import Link from 'next/link';
import { DetailTabs } from '@/src/features/skills/detail/DetailTabs';
import { UserProfile } from '@/src/features/skills/detail/UserProfile';
import { SkillDetail } from '@/src/features/skills/detail/SkillDetail';
import { Button } from '@/src/components/Button';
import { ProfileSkillList } from '@/src/features/skills/detail/ProfileSkillList';
import { RequiredAuth } from '@/src/features/auth/RequiredAuth';
import { ScrollToTop } from '@/src/components/ScrollToTop';
import { RequestIcon } from '@/src/components/icons/RequestIcon';
import { MessageIcon } from '@/src/components/icons/MessageIcon';
import { SkillDetailDto } from '@/src/types/skill';

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
            <ProfileSkillList
              list={skillDetail.otherSkills}
              currentId={skillId}
            />
          </div>
        </div>
        <div className="sticky bottom-0 flex w-full items-center justify-between bg-white px-28 py-6">
          <span className="text-brand-600 w-fit rounded-lg bg-[#F4F2FF] px-3 py-[5px] leading-6 font-semibold">
            내 크레딧 | 30
          </span>
          <div className="flex gap-[15px]">
            <RequiredAuth>
              <Link
                className="w-[380px]"
                href={`/skills/request?mentorId=${skillDetail.profileId}&skillId=${skillId}`}
              >
                <Button
                  text={'스킬 요청하기'}
                  mode="active"
                  icon={<RequestIcon size={20} />}
                />
              </Link>
            </RequiredAuth>
            <RequiredAuth>
              <Link className="w-[380px]" href="/messages">
                <Button
                  text={'메세지 보내기'}
                  icon={<MessageIcon size={20} />}
                />
              </Link>
            </RequiredAuth>
          </div>
        </div>
      </div>
      <ScrollToTop deps={[id]} />
    </>
  );
}
