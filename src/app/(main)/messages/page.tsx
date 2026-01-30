import Image from 'next/image';

export default function MessagePage() {
  return (
    <div className="flex h-full w-full flex-col rounded-[12px] border border-gray-200 bg-white text-gray-400">
      <div className="mx-[20px] h-[64px] shrink-0 border-b border-gray-100" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image
          alt="채팅 아이콘"
          src="/icons/icon_message.svg"
          width={56}
          height={56}
          className="mb-[20px]"
        />
        <p className="pb-[4px] text-[16px] font-bold text-gray-600">
          배움의 시작, 첫 인사를 건네보세요!
        </p>
        <p className="text-[14px] text-gray-500">
          서로의 성장을 응원하는 따뜻한 대화를 나눠보세요
        </p>
      </div>
    </div>
  );
}
