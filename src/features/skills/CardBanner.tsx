export const CardBanner = () => {
  return (
    <div className="bg-brand-200 flex h-[234px] cursor-pointer flex-col gap-[7px] rounded-xl p-6">
      <div className="leading-[1.5] font-bold text-[#2F333B]">
        누구나 스킬을 가르칠 수 있어요!
      </div>
      <div className="text-xs leading-[1.5] font-medium whitespace-pre-wrap text-[#303946]">{`링킷에선 누구나 스킬을 가르치고 배우는\n선순환 배움 생태계를 조성해요!`}</div>
    </div>
  );
};
