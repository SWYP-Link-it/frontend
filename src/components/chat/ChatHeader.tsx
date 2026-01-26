import Image from 'next/image';

export const ChatHeader = () => {
  return (
    <div className="mx-[20px] flex h-[64px] shrink-0 items-center border-b border-gray-100">
      <Image
        className="mr-[12px] text-[16px]"
        height={36}
        width={36}
        src="/icons/icon_default_user.svg"
        alt="default
      "
      />
      <span>닉네임</span>
    </div>
  );
};
