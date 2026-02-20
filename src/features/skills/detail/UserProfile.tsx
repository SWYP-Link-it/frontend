import Image from 'next/image';

type UserProfileProps = {
  nickname: string;
  timesTaught: number;
  userAvgRating: number;
};

export const UserProfile = ({
  nickname,
  timesTaught,
  userAvgRating,
}: UserProfileProps) => {
  return (
    <div className="mt-[22px] mb-[24px] flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Image src="/icons/avatar.svg" alt={nickname} width={40} height={40} />
        <div className="text-xl leading-[1.5] font-semibold text-gray-800">
          {nickname}
        </div>
      </div>
      <div className="leading-[1.5] font-semibold text-gray-800">
        가르친 횟수&nbsp;&nbsp;
        <span className="text-brand-600">{timesTaught}회</span>
        <span className="text-gray-300">&nbsp;ㅣ&nbsp;</span>평점&nbsp;&nbsp;
        <span className="text-brand-600">{userAvgRating} / 5</span>
      </div>
    </div>
  );
};
