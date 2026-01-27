import Image from 'next/image';
interface ChatHeaderProps {
  nickname: string;
  profileUrl?: string | null;
}

export const ChatHeader = ({ nickname, profileUrl }: ChatHeaderProps) => {
  const DEFAULT_PROFILE = '/icons/icon_default_user.svg';

  return (
    <div className="mx-[20px] flex h-[64px] shrink-0 items-center border-b border-gray-100">
      <Image
        className="mr-[12px] rounded-full object-cover"
        height={36}
        width={36}
        src={profileUrl || DEFAULT_PROFILE}
        alt="profile"
      />
      <span className="text-[16px] font-bold text-gray-900">{nickname}</span>
    </div>
  );
};
