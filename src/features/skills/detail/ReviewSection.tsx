import { SkillReviewDto } from '@/src/types/skill';
import Image from 'next/image';
import { ReviewContentCard } from './ReviewContentCard';

type ReviewSectionProps = {
  reviews: SkillReviewDto[];
  skillRating: {
    avgRating: number;
    star1Percentage: number;
    star2Percentage: number;
    star3Percentage: number;
    star4Percentage: number;
    star5Percentage: number;
  };
};

export const ReviewSection = ({ reviews, skillRating }: ReviewSectionProps) => {
  const {
    avgRating,
    star1Percentage,
    star2Percentage,
    star3Percentage,
    star4Percentage,
    star5Percentage,
  } = skillRating;
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-[49px]">
        <div className="flex shrink-0 flex-col gap-1">
          <div className="flex items-center gap-2 text-4xl leading-11 font-semibold text-gray-800">
            {avgRating}
            <Image src={'/icons/star.svg'} alt="별" width={20} height={20} />
          </div>
          <div className="text-xs leading-[18px] font-normal text-gray-400">
            {reviews.length}개의 리뷰
          </div>
        </div>
        <div className="flex w-full flex-col">
          <PercentageBar label="5" percentage={star5Percentage} />
          <PercentageBar label="4" percentage={star4Percentage} />
          <PercentageBar label="3" percentage={star3Percentage} />
          <PercentageBar label="2" percentage={star2Percentage} />
          <PercentageBar label="1" percentage={star1Percentage} />
        </div>
      </div>
      <div className="mt-15 flex gap-5 overflow-x-auto pb-[30px]">
        {reviews.length > 0 &&
          reviews.map((review) => (
            <ReviewContentCard key={review.reviewId} review={review} />
          ))}
        {reviews.length <= 0 && (
          <div className="flex h-20 w-full items-center justify-center text-sm text-gray-400">
            이용 후기가 아직 없습니다.
          </div>
        )}
      </div>
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
