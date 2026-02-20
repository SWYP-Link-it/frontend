'use client';

import { toast } from 'sonner';
import { Button } from '../Button';
import { useEffect, useState } from 'react';
import { StarIcon } from 'lucide-react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/src/lib/api/api';
import { isAxiosError } from 'axios';
import Image from 'next/image';

type SkillReviewModalContentProps = {
  reviewId?: number;
  skillExchangeId: number;
  skillId: number;
  mentorId: number;
  onSuccess?: () => void;
  onClose: () => void;
};

export const SkillReviewModalContent = ({
  reviewId,
  skillExchangeId,
  skillId,
  mentorId,
  onSuccess,
  onClose,
}: SkillReviewModalContentProps) => {
  const { data } = useQuery<{ content: string; rating: number }>({
    queryKey: ['reviews', reviewId],
    queryFn: async () => {
      const res = await api.get(`/reviews/${reviewId}`);
      return res.data.data;
    },
    enabled: Boolean(reviewId),
  });

  const { mutate: createReview } = useMutation({
    mutationFn: async (data: { rating: number; content: string }) => {
      return await api.post(`/reviews`, {
        skillExchangeId,
        skillId,
        mentorId,
        content: data.content,
        rating: data.rating,
      });
    },
    onSuccess: () => {
      toast.success('후기가 작성되었습니다.');
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const serverError = error.response?.data;
        if (serverError?.code === 'C006') {
          toast.error(serverError.data[0].message);
          return;
        }
        if (serverError?.message) {
          toast.error(serverError.message);
          return;
        }
      }
      toast.error('후기 작성에 실패하였습니다.');
      console.error(error);
    },
  });

  const { mutate: editReview } = useMutation({
    mutationFn: async (data: { rating: number; content: string }) => {
      return await api.put(`/reviews/${reviewId}`, data);
    },
    onSuccess: () => {
      toast.success('후기가 수정되었습니다.');
      onSuccess?.();
      onClose();
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        const serverError = error.response?.data;
        if (serverError?.code === 'C006') {
          toast.error(serverError.data[0].message);
          return;
        }
        if (serverError?.message) {
          toast.error(serverError.message);
          return;
        }
      }
      toast.error('후기 수정에 실패하였습니다.');
      console.error(error);
    },
  });

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.warning('평점을 선택해주세요.');
      return;
    }

    if (reviewId) {
      // 리뷰 id가 있으면 리뷰 수정
      editReview({ rating, content });
    } else {
      // 없으면 리뷰 생성
      createReview({ rating, content });
    }
  };

  useEffect(() => {
    if (!reviewId || !data) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRating(data.rating);
    setContent(data.content);
  }, [reviewId, data]);

  return (
    <div className="flex flex-col items-center p-12">
      <h1 className="text-2xl font-bold text-gray-800">
        {reviewId ? `후기 수정` : `후기 작성`}
      </h1>
      <div className="mb-6 text-sm text-gray-400">
        여러분의 소중한 의견을 들려주세요
      </div>

      <h2 className="mb-4 self-start font-semibold text-gray-800">
        평점을 선택해주세요
      </h2>
      <div className="mb-8 flex">
        {Array.from({ length: rating }).map((_, idx) => (
          <Image
            onClick={() => setRating(idx + 1)}
            key={idx}
            src={'/icons/star.svg'}
            alt="별"
            width={40}
            height={40}
            className="p-1 hover:cursor-pointer"
          />
        ))}
        {Array.from({ length: 5 - rating }).map((_, idx) => (
          <StarIcon
            key={idx}
            onClick={() => setRating(rating + idx + 1)}
            className={`h-10 w-10 p-1 text-gray-400 hover:cursor-pointer`}
          />
        ))}
      </div>

      <h2 className="mb-4 self-start font-semibold text-gray-800">
        후기를 작성해주세요
      </h2>
      <textarea
        placeholder="스킬 거래는 어땠나요? 따뜻한 후기를 전달해주세요."
        className="focus:border-brand-600 h-30 w-full resize-none rounded-[15px] border border-gray-200 p-6 text-sm text-gray-800 placeholder-gray-400 outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="mt-10 flex h-12 w-full gap-4">
        <Button text={'취소'} onClick={onClose} />
        <Button text={'작성 완료'} mode="active" onClick={handleSubmit} />
      </div>
    </div>
  );
};
