'use client';

import Image from 'next/image';
import { Trash2, Edit3, Star } from 'lucide-react';
import { formatCreditDate } from '@/src/utils/date';

interface ReviewCardProps {
  review: any;
  showActions: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export const ReviewCard = ({
  review,
  showActions,
  onDelete,
  onEdit,
}: ReviewCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100 bg-gray-50">
            <Image
              src="/icons/avatar.svg"
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              {review.reviewerNickname}
            </p>
            <p className="text-[11px] text-gray-400">{review.skillName}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {showActions && (
            <div className="flex gap-1.5">
              <button
                onClick={onDelete}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-red-500"
              >
                <Trash2 size={14} />
                삭제
              </button>
              <button
                onClick={onEdit}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-100 bg-white px-3 text-[12px] font-medium text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                <Edit3 size={14} />
                수정
              </button>
            </div>
          )}
          <span className="text-[12px] text-gray-300">
            {formatCreditDate(review.createdDateTime)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center gap-1">
          <div className="flex gap-0.5 text-orange-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < review.rating ? 'currentColor' : 'transparent'}
                className={i < review.rating ? '' : 'text-gray-200'}
              />
            ))}
          </div>
          <span className="ml-1 text-[13px] font-bold text-gray-400">
            {review.rating.toFixed(1)}
          </span>
        </div>
        <p className="text-[14px] leading-relaxed text-gray-600">
          {review.content}
        </p>
      </div>
    </div>
  );
};
