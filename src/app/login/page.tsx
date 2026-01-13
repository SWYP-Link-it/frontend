'use client';

export default function Login() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="absolute top-10 left-10">Linkit 로고</div>
      <div className="flex w-125 flex-col items-center justify-center rounded-lg bg-black px-10 py-20 text-white">
        <div>Linkit 로고</div>
        <div className="mt-4 text-[28px] font-bold">메시지 메시지 메시지</div>
        <div className="mt-2 text-center text-[15px] whitespace-pre-wrap text-[#9599A4]">
          {`스터디와 사이드 프로젝트를 찾는 가장 쉬운 방법!\nLINKIT에서 함께 할 팀원들을 찾으세요`}
        </div>
        <div className="mt-20 w-full rounded-md bg-[#FEE501] py-2 text-center">
          카카오 계정으로 계속하기
        </div>
        <div className="mt-3 w-full rounded-md bg-[#02C75A] py-2 text-center">
          네이버 계정으로 계속하기
        </div>
      </div>
    </div>
  );
}
