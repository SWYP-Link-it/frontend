import { Profile } from '@/src/types/types';

type UserProfileProps = {
  profile: Profile;
};

export const UserProfile = ({ profile }: UserProfileProps) => {
  const { nickname, teachCnt, rate } = profile;

  return (
    <div className="mt-[26px] mb-[30px] flex flex-col gap-3">
      <div className="flex gap-3">
        <span className="bg-brand-200 h-8 w-8 rounded-full">프</span>
        <div className="text-xl leading-[1.5] font-semibold text-gray-800">
          {nickname}
        </div>
      </div>
      <div className="leading-[1.5] font-semibold text-gray-800">
        가르친 횟수&nbsp;&nbsp;
        <span className="text-brand-600">{teachCnt}회</span>
        <span className="text-gray-300">&nbsp;ㅣ&nbsp;</span>평점&nbsp;&nbsp;
        <span className="text-brand-600">{rate} / 5</span>
      </div>
    </div>
  );
};
