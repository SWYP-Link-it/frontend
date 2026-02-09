import Image from 'next/image';

export const CreditInfoBanner = () => {
  return (
    <div className="relative flex justify-between overflow-hidden rounded-xl bg-gray-800">
      <Image
        src={'/images/main_banner.jpg'}
        alt={'배너 이미지'}
        fill
        className="object-cover object-right"
      />
      <div className="z-10 flex flex-col gap-2 py-10 pl-7">
        <div className="text-xl leading-[1.5] font-bold text-white">
          크레딧 시스템은 무슨 기능인가요?
        </div>
        <div className="text-xs leading-[1.5] font-medium whitespace-pre-wrap text-gray-400">
          {`크레딧 시스템은 링킷의 메인이 되는 재화 단위로\n크레딧을 지출하여 스킬을 배울 수 있어요!`}
        </div>
      </div>
      {/* <div className="my-2 mr-[47px] w-[231px] bg-gray-100">
        그래픽 이미지 영역
      </div> */}
    </div>
  );
};
