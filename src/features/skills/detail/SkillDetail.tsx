import { Skill } from '@/src/types/types';
import Image from 'next/image';
import { ReviewSection } from './ReviewSection';

type SkillDetailProps = {
  skill: Skill;
};

export const SkillDetail = ({ skill }: SkillDetailProps) => {
  const {
    category,
    title,
    description,
    credit,
    rate,
    profile,
    level,
    portfolioUrls,
    reviews,
  } = skill;

  return (
    <div className="flex flex-col gap-12 rounded-2xl bg-white px-9 pt-[54px] pb-20">
      <div id="skill-detail-overview" className="flex justify-between">
        <div className="flex flex-col">
          <div className="mb-3">{category}</div>
          <div className="mb-1 text-xl leading-[30px] font-bold text-gray-900">
            {title}
          </div>
          <div className="leading-[1.5] font-semibold text-gray-500">
            숙련도 - {level}
          </div>
        </div>
        <div className="bg-brand-200 h-25 w-25 rounded-2xl">그래픽 이미지</div>
      </div>
      <div className="border-y border-gray-200 py-6">
        <div className="grid w-fit grid-cols-2 gap-x-25 text-sm font-semibold text-gray-600">
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">경력</span>
            {profile.experience}
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">가능 크레딧</span>
            {credit * 30}분 / 1회
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">선호 방식</span>
            {profile.mode}
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">선호 지역</span>
            {profile.region}
          </div>
        </div>
      </div>
      <div id="skill-detail-introduction" className="flex flex-col gap-4">
        <SectionTitle icon="icon" title="스킬 소개" />
        <div className="text-sm leading-[1.6] font-medium text-gray-700">
          {description}
        </div>
      </div>
      <div id="skill-detail-time" className="flex flex-col gap-[18px]">
        <SectionTitle icon="icon" title="선호 시간대" />
        <div className="flex flex-wrap gap-x-5 gap-y-4">
          {profile.time.map((t) => (
            <div
              key={t}
              className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
      <div id="skill-detail-portfolio" className="mt-3 flex flex-col gap-6">
        <SectionTitle icon="icon" title="포트폴리오 이미지" />
        <div className="flex gap-5 overflow-x-auto pb-10">
          {portfolioUrls.map((url) => (
            <div key={url} className="border">
              <Image
                src={url}
                alt="portfolio 이미지"
                width={250}
                height={250}
                className="shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
      <div id="skill-detail-reviews" className="mt-3 flex flex-col gap-[9px]">
        <SectionTitle icon="icon" title="이용 후기" />
        <ReviewSection reviews={reviews} />
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }: { icon: string; title: string }) => {
  return (
    <div className="flex gap-2">
      <span className="h-[18px] w-[18px]">{icon}</span>
      <div className="text-lg leading-7 font-semibold text-gray-800">
        {title}
      </div>
    </div>
  );
};
