'use client';

import { SkillReviewDto } from '@/src/types/skill';

type ReviewContentCardProps = {
  review: SkillReviewDto;
};

export const ReviewContentCard = ({ review }: ReviewContentCardProps) => {
  return (
    <div className="flex w-[370px] shrink-0 flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]">
      <div className="line-clamp-3 leading-6 text-gray-800">
        {review.content}
      </div>
      <span className="mt-auto text-sm leading-[1.5] font-semibold text-gray-500">
        {review.reviewerNickname} 님
      </span>
    </div>
  );
};
