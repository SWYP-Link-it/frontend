'use client';

import { BaseModal } from '@/src/components/BaseModal';
import { SkillReviewDto } from '@/src/types/skill';
import { useState } from 'react';
import Image from 'next/image';

type ReviewContentCardProps = {
  review: SkillReviewDto;
};

export const ReviewContentCard = ({ review }: ReviewContentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="flex w-[370px] shrink-0 cursor-pointer flex-col gap-[10px] rounded-3xl bg-gray-100 px-8 py-[29px]"
      >
        <div className="line-clamp-3 leading-6 text-gray-800">
          {review.content}
        </div>
        <span className="text-sm leading-[1.5] font-semibold text-gray-500">
          {review.reviewerNickname} 님
        </span>
      </div>
      <BaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="max-w-lg"
      >
        <div className="flex flex-col items-center p-12 whitespace-pre-wrap">
          <h3 className="mb-1 text-lg font-semibold text-gray-700">
            {review.reviewerNickname} 님의 후기
          </h3>
          <div className="mb-3 flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, idx) => (
              <Image
                key={idx}
                src={'/icons/star.svg'}
                alt="별"
                width={20}
                height={20}
              />
            ))}
          </div>
          <p className="w-full rounded-2xl bg-gray-100 p-4">{review.content}</p>
        </div>
      </BaseModal>
    </>
  );
};
