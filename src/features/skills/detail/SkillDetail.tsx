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
    <div className="flex flex-col bg-white">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div>디자인</div>
          <div>그래픽 디자인</div>
          <div>숙련도 - 중</div>
        </div>
        <div>그래픽</div>
      </div>
      <div>구분선</div>
      <div className="grid grid-cols-2 gap-x-25">
        <div>경력 스타트업 리드</div>
        <div>가능 크레딧 30분 / 1회</div>
        <div>선호 방식 온라인 + 오프라인 가능</div>
        <div>선호 지역 서울특별시 강남구</div>
      </div>
      <div>구분선</div>
      <div className="flex flex-col">
        <SectionTitle icon="icon" title="스킬 소개" />
        <div>
          {`Figma를 활용한 실무 중심의 UX/UI 디자인을 가르쳐드립니다. 언제든
          문의주세요. 시간대 언제든 환영입니다!언제든 문의주세요. 시간대 언제든
          환영입니다!`}
        </div>
      </div>
      <div className="flex flex-col">
        <SectionTitle icon="icon" title="선호 시간대" />
        <div className="flex flex-wrap">
          <div>월 16:00 ~ 17:00</div>
          <div>월 16:00 ~ 17:00</div>
          <div>월 16:00 ~ 17:00</div>
          <div>월 16:00 ~ 17:00</div>
          <div>월 16:00 ~ 17:00</div>
        </div>
      </div>
      <div className="flex flex-col">
        <SectionTitle icon="icon" title="포트폴리오 이미지" />
        <div className="flex overflow-x-auto">
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
          <div className="h-[250px] w-[250px] shrink-0 border">이미지</div>
        </div>
      </div>
      <div className="flex flex-col">
        <SectionTitle icon="icon" title="이용 후기" />
        <div className="flex flex-col">
          <div className="flex">
            <div className="flex flex-col">
              <div>4.7 별</div>
              <div>5개의 리뷰</div>
            </div>
            <div className="flex flex-col">
              <div>5 ------------------------------------ 90%</div>
              <div>5 ------------------------------------ 90%</div>
              <div>5 ------------------------------------ 90%</div>
              <div>5 ------------------------------------ 90%</div>
              <div>5 ------------------------------------ 90%</div>
            </div>
          </div>
          <div className="flex overflow-x-auto">
            <div className="flex flex-col">
              <div className="line-clamp-3 w-[370px]">
                처음 키위님에게 컨설팅을 받기 전에는 솔직히 반신반의한 이전에도
                여러 피드백이나 조언을 들어본 경험이 있었지만, 처음 키위님에게
                컨설팅을 받기 전에는 솔직히 반신반의한 이전에도 여러 피드백이나
                조언을 들어본 경험이 있었지만,
              </div>
              <div>펭귄 님</div>
            </div>
            <div className="flex flex-col">
              <div className="line-clamp-3 w-[370px]">
                처음 키위님에게 컨설팅을 받기 전에는 솔직히 반신반의한 이전에도
                여러 피드백이나 조언을 들어본 경험이 있었지만, 처음 키위님에게
                컨설팅을 받기 전에는 솔직히 반신반의한 이전에도 여러 피드백이나
                조언을 들어본 경험이 있었지만,
              </div>
              <div>펭귄 님</div>
            </div>
            <div className="flex flex-col">
              <div className="line-clamp-3 w-[370px]">
                처음 키위님에게 컨설팅을 받기 전에는 솔직히 반신반의한 이전에도
                여러 피드백이나 조언을 들어본 경험이 있었지만, 처음 키위님에게
                컨설 팅을 받기 전에는 솔직히 반신반의한 이전에도 여러 피드백이나
                조언을 들어본 경험이 있었지만,
              </div>
              <div>펭귄 님</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="flex">
      <span className="h-6 w-6">{icon}</span>
      <div>{title}</div>
    </div>
  );
};
