import { Review } from '@/src/types/types';
import Image from 'next/image';

type ReviewSectionProps = {
  reviews: Review[];
};

const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Number((sum / reviews.length).toFixed(1));
};

const calculateRatingDistribution = (
  reviews: Review[],
): Record<number, number> => {
  const distribution: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((review) => {
    distribution[review.rating]++;
  });

  const total = reviews.length;
  return {
    5: total > 0 ? Math.round((distribution[5] / total) * 100) : 0,
    4: total > 0 ? Math.round((distribution[4] / total) * 100) : 0,
    3: total > 0 ? Math.round((distribution[3] / total) * 100) : 0,
    2: total > 0 ? Math.round((distribution[2] / total) * 100) : 0,
    1: total > 0 ? Math.round((distribution[1] / total) * 100) : 0,
  };
};

export const ReviewSection = ({ reviews }: ReviewSectionProps) => {
  const averageRating = calculateAverageRating(reviews);
  const ratingDistribution = calculateRatingDistribution(reviews);

  return reviews.length > 0 ? (
    <div className="flex flex-col">
      <div className="flex items-center gap-[49px]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-4xl leading-11 font-semibold text-gray-800">
            {averageRating}
            <Image src={'/icons/star.svg'} alt="별" width={20} height={20} />
          </div>
          <div className="text-xs leading-[18px] font-normal text-gray-400">
            {reviews.length}개의 리뷰
          </div>
        </div>
        <div className="flex w-full flex-col">
          <PercentageBar label="5" percentage={ratingDistribution[5]} />
          <PercentageBar label="4" percentage={ratingDistribution[4]} />
          <PercentageBar label="3" percentage={ratingDistribution[3]} />
          <PercentageBar label="2" percentage={ratingDistribution[2]} />
          <PercentageBar label="1" percentage={ratingDistribution[1]} />
        </div>
      </div>
      <div className="mt-15 flex gap-5 overflow-x-auto pb-[30px]">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex w-[370px] shrink-0 flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]"
          >
            <div className="line-clamp-3 leading-6 text-gray-800">
              {review.content}
            </div>
            <span className="text-sm leading-[1.5] font-semibold text-gray-500">
              {review.reviewerNickname} 님
            </span>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>후기가 아직 없습니다.</div>
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
