export default function SignupProfile() {
  return (
    <div className="relative flex h-full w-full justify-center bg-indigo-950">
      <div className="absolute top-10 left-10">Linkit 로고</div>
      <div className="w-125 pt-20 text-white">
        <div className="whitespace-pre-wrap">
          {`링킷에서 사용할 프로필을\n등록해주세요.`}
        </div>
        <div className="mx-auto h-24 w-24 rounded-full bg-white"></div>
        <div className="flex flex-col">
          <label>닉네임</label>
          <input type="text" className="border-2 border-purple-400" />
        </div>

        <div className="flex">
          <button className="flex-1 bg-gray-600 py-2">이전으로</button>
          <button className="flex-1 bg-purple-600 py-2">다음으로</button>
        </div>
      </div>
    </div>
  );
}
