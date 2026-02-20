import { SkillDetailDto } from '@/src/types/skill';
import Image from 'next/image';
import { ReviewSection } from './ReviewSection';
import { ReactElement } from 'react';
import { CursorBoxIcon } from '@/src/components/icons/CursorBoxIcon';
import { ClockIcon } from '@/src/components/icons/ClockIcon';
import { ImageIcon } from '@/src/components/icons/ImageIcon';
import {
  REGION_LABELS,
  EXCHANGE_TYPE_LABELS,
  PROFICIENCY_LABELS,
} from '@/src/constants/profile';
import { CategoryFigure } from '@/src/components/skill/CategoryFigure';

export const SkillDetail = ({
  mainSkill,
  experienceDescription,
  exchangeType,
  preferredRegion,
  availableSchedules,
  detailedLocation,
}: SkillDetailDto) => {
  const {
    skillName,
    skillTitle,
    skillDescription,
    skillProficiency,
    skillCategoryType,
    exchangeDuration,
    imageUrls,
  } = mainSkill;
  return (
    <div className="flex flex-col gap-12 rounded-2xl bg-white px-9 pt-[54px] pb-20">
      <div id="skill-detail-overview" className="flex justify-between">
        <div className="flex flex-col">
          <div className="mb-3 w-fit rounded-md bg-[#E9F0FF] px-[10px] py-1 text-xs font-semibold text-[#3477FF]">
            {skillName}
          </div>
          <div className="mb-1 text-xl leading-[30px] font-bold text-gray-900">
            {skillTitle}
          </div>
          <div className="leading-[1.5] font-semibold text-gray-500">
            숙련도 - {PROFICIENCY_LABELS[skillProficiency]}
          </div>
        </div>
        <CategoryFigure
          category={skillCategoryType}
          isActive={true}
          size="lg"
        />
      </div>
      <div className="border-y border-gray-200 py-6">
        <div className="grid w-fit grid-cols-2 gap-x-25 text-sm font-semibold text-gray-600">
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">경력</span>
            {experienceDescription}
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">가능 크레딧</span>
            {exchangeDuration}분 / 1회
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">선호 방식</span>
            {EXCHANGE_TYPE_LABELS[exchangeType]}
          </div>
          <div className="py-2">
            <span className="mr-4 font-normal text-gray-500">선호 지역</span>
            {REGION_LABELS[preferredRegion]} {detailedLocation}
          </div>
        </div>
      </div>
      <div id="skill-detail-introduction" className="flex flex-col gap-4">
        <SectionTitle
          icon={<CursorBoxIcon size={18} className="text-gray-800" />}
          title="스킬 소개"
        />
        <div className="text-sm leading-[1.6] font-medium text-gray-700">
          {skillDescription}
        </div>
      </div>
      <div id="skill-detail-time" className="flex flex-col gap-[18px]">
        <SectionTitle
          icon={<ClockIcon size={18} className="text-gray-800" />}
          title="선호 시간대"
        />
        <div className="flex flex-wrap gap-x-5 gap-y-4">
          {availableSchedules.map(({ dayOfWeek, startTime, endTime }) => {
            const label = `${dayOfWeek} ${startTime} ~ ${endTime}`;
            return (
              <div
                key={label}
                className="h-8 rounded-xl bg-gray-200 px-3 py-[6px] text-sm leading-[1.5] font-medium text-gray-600"
              >
                {label}
              </div>
            );
          })}
        </div>
      </div>
      <div id="skill-detail-portfolio" className="mt-3 flex flex-col gap-6">
        <SectionTitle
          icon={<ImageIcon size={18} className="text-gray-800" />}
          title="포트폴리오 이미지"
        />
        <div className="flex gap-5 overflow-x-auto pb-10">
          {imageUrls &&
            imageUrls.length > 0 &&
            imageUrls.map((url) => (
              <div
                key={url}
                className="relative h-[250px] w-[250px] shrink-0 overflow-hidden rounded-3xl"
              >
                <Image
                  src={url}
                  alt="portfolio 이미지"
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          {(!imageUrls || imageUrls.length === 0) &&
            Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="flex h-[250px] w-[250px] shrink-0 flex-col items-center justify-center gap-[5px] rounded-3xl bg-gray-200"
              >
                <Image
                  src={'/icons/camera.svg'}
                  alt={''}
                  width={36}
                  height={36}
                />
                <span className="text-xs text-gray-400">
                  이미지 업로드 필요
                </span>
              </div>
            ))}
        </div>
      </div>
      {/* <div id="skill-detail-reviews" className="mt-3 flex flex-col gap-[9px]">
        <SectionTitle
          icon={<EditIcon size={18} className="text-gray-800" />}
          title="이용 후기"
        />
        <ReviewSection reviews={reviews} />
      </div> */}
    </div>
  );
};

const SectionTitle = ({
  icon,
  title,
}: {
  icon: ReactElement;
  title: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <div className="text-lg leading-7 font-semibold text-gray-800">
        {title}
      </div>
    </div>
  );
};
