type SkillDetailProps = {
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
};

export const SkillDetail = ({
  title,
  description,
  price,
  rating,
  reviewCount,
}: SkillDetailProps) => {
  return (
    <div className="flex flex-col gap-12 rounded-2xl bg-white px-9 pt-[54px] pb-20">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="mb-3">디자인</div>
          <div className="mb-1 text-xl leading-[30px] font-bold text-gray-900">
            그래픽 디자인
          </div>
          <div className="leading-[1.5] font-semibold text-gray-500">
            숙련도 - 중
          </div>
        </div>
        <div className="bg-brand-200 h-25 w-25 rounded-2xl">그래픽 이미지</div>
      </div>
      <div className="border-y border-gray-200 py-6">
        <div className="grid w-fit grid-cols-2 gap-x-25 text-sm font-semibold text-gray-600">
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">경력</span>스타트업
            리드
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">가능 크레딧</span>
            30분 / 1회
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">선호 방식</span>
            온라인 + 오프라인 가능
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">선호 지역</span>
            서울특별시 강남구
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <SectionTitle icon="icon" title="스킬 소개" />
        <div className="text-sm leading-[1.6] font-medium text-gray-700">
          {`Figma를 활용한 실무 중심의 UX/UI 디자인을 가르쳐드립니다. 언제든
          문의주세요. 시간대 언제든 환영입니다!언제든 문의주세요. 시간대 언제든
          환영입니다!`}
        </div>
      </div>
      <div className="flex flex-col gap-[18px]">
        <SectionTitle icon="icon" title="선호 시간대" />
        <div className="flex flex-wrap gap-x-5 gap-y-4">
          <div className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600">
            월 16:00 ~ 17:00
          </div>
          <div className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600">
            월 16:00 ~ 17:00
          </div>
          <div className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600">
            월 16:00 ~ 17:00
          </div>
          <div className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600">
            월 16:00 ~ 17:00
          </div>
          <div className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600">
            월 16:00 ~ 17:00
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-6">
        <SectionTitle icon="icon" title="포트폴리오 이미지" />
        <div className="flex gap-5 overflow-x-auto pb-10">
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
        </div>
      </div>
      <div className="mt-3 flex flex-col">
        <SectionTitle icon="icon" title="이용 후기" />
        <div className="mt-[9px] flex flex-col">
          <div className="flex items-center gap-[49px]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-4xl leading-11 font-semibold text-gray-800">
                4.7<span className="text-brand-400 h-5 w-5 text-sm">별</span>
              </div>
              <div className="text-xs leading-[18px] font-normal text-gray-400">
                5개의 리뷰
              </div>
            </div>
            <div className="flex w-full flex-col">
              <PercentageBar label="5" percentage={80} />
              <PercentageBar label="4" percentage={10} />
              <PercentageBar label="3" percentage={5} />
              <PercentageBar label="2" percentage={3} />
              <PercentageBar label="1" percentage={2} />
            </div>
          </div>
          <div className="mt-15 flex gap-5 overflow-x-auto pb-[30px]">
            <div className="flex w-[370px] shrink-0 flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]">
              <div className="line-clamp-3 leading-6 text-gray-800">
                처음 키위님에게 컨설팅을 받기 전에는 솔직히 반신반의한 이전에도
                여러 피드백이나 조언을 들어본 경험이 있었지만, 처음 키위님에게
                컨설팅을 받기 전에는 솔직히 반신반의한 이전에도 여러 피드백이나
                조언을 들어본 경험이 있었지만,
              </div>
              <span className="text-sm leading-[1.5] font-semibold text-gray-500">
                펭귄 님
              </span>
            </div>
            <div className="flex w-[370px] shrink-0 flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]">
              <div className="line-clamp-3 leading-6 text-gray-800">
                처음 키위님에게 컨설팅을 받기 전에는 솔직히 반신반의한 이전에도
                여러 피드백이나 조언을 들어본 경험이 있었지만, 처음 키위님에게
                컨설팅을 받기 전에는 솔직히 반신반의한 이전에도 여러 피드백이나
                조언을 들어본 경험이 있었지만,
              </div>
              <span className="text-sm leading-[1.5] font-semibold text-gray-500">
                펭귄 님
              </span>
            </div>
            <div className="flex w-[370px] shrink-0 flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]">
              <div className="line-clamp-3 leading-6 text-gray-800">
                처음 키위님에게 컨설팅을 받기 전에는 솔직히 반신반의한 이전에도
                여러 피드백이나 조언을 들어본 경험이 있었지만, 처음 키위님에게
                컨설팅을 받기 전에는 솔직히 반신반의한 이전에도 여러 피드백이나
                조언을 들어본 경험이 있었지만,
              </div>
              <span className="text-sm leading-[1.5] font-semibold text-gray-500">
                펭귄 님
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="flex gap-2">
      <span className="h-[18px] w-[18px]">{icon}</span>
      <div className="leading-7 font-semibold text-gray-800">{title}</div>
    </div>
  );
};

const PercentageBar = ({
  label,
  percentage,
}: {
  label: string;
  percentage: number;
}) => {
  return (
    <div className="flex w-full items-center">
      <span className="w-2 text-center text-xs leading-[18px] text-gray-400">
        {label}
      </span>
      <div className="relative mr-[10px] ml-[6px] h-[6px] max-w-[490px] flex-1 rounded-full bg-[#D9D9D9]">
        <span
          className="bg-brand-600 absolute left-0 h-[6px] rounded-full"
          style={{ width: `${percentage}%` }}
        ></span>
      </div>
      <span className="w-[30px] text-right text-xs leading-[18px] text-gray-400">
        {percentage}%
      </span>
    </div>
  );
};
