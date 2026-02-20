'use client';

import { SkillRequest } from '@/src/types/request';
import Image from 'next/image';
import { MessageIcon } from '../icons/MessageIcon';
import { BaseModal } from '../BaseModal';
import { SkillReviewModalContent } from './SkillReviewModalContent';
import { useState } from 'react';

interface RequestCardProps {
  request: SkillRequest;
  fetchRequests: () => void;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onCancel?: (id: number) => void;
  onInquiry?: (partnerId: number) => void;
}

export const RequestCard = ({
  request,
  fetchRequests,
  onAccept,
  onReject,
  onCancel,
  onInquiry,
}: RequestCardProps) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="bg-success-100 text-success-500 rounded px-2 py-0.5 text-[11px] font-semibold">
            수락됨
          </span>
        );
      case 'REJECTED':
        return (
          <span className="rounded bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-600">
            거절됨
          </span>
        );
      case 'CANCELED':
        return (
          <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-400">
            취소됨
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="rounded bg-orange-100 px-2 py-0.5 text-[11px] font-semibold text-orange-600">
            만료됨
          </span>
        );
      case 'COMPLETED':
      case 'SETTLED':
        return (
          <span className="rounded bg-green-100 px-2 py-0.5 text-[11px] font-semibold text-green-600">
            완료됨
          </span>
        );
      default:
        return (
          <span className="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">
            대기중
          </span>
        );
    }
  };

  const isPending = request.status === 'PENDING';
  const isAccepted = request.status === 'ACCEPTED';

  const canCancel = request.isSentByMe ? isPending || isAccepted : isAccepted;

  const canRespond = !request.isSentByMe && isPending;

  return (
    <div className="rounded-[16px] border border-gray-200 bg-white p-6 transition-all hover:shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
        <div className="flex items-start space-x-4">
          <Image
            key={request.id}
            src={'/icons/avatar.svg'}
            alt="profile"
            width={32}
            height={32}
          />
          <div>
            <div className="mb-1 flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-900">
                {request.partnerNickname}
              </h3>
              <span className="text-brand-600 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold">
                {request.partnerTag}
              </span>
              {getStatusBadge(request.status)}
            </div>
            <p className="text-xs text-gray-400">{request.createdAt} 요청됨</p>
          </div>
        </div>

        <div className="mt-4 mr-12 flex space-x-8 md:mt-0">
          <div>
            <p className="mb-1 text-xs text-gray-400">날짜 및 시간</p>
            <p className="text-sm font-bold text-gray-700">
              {request.sessionDate}
            </p>
          </div>
          <div className="border-l border-gray-100 pl-8">
            <p className="mb-1 text-xs text-gray-400">스킬 거래 시간</p>
            <p className="text-sm font-bold text-gray-700">
              {request.sessionTime} / {request.credits} 크레딧
            </p>
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-gray-100"></div>

      <div className="mb-8">
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-700">
          {request.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onInquiry?.(request.partnerId)}
          className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-lg text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <MessageIcon className="mr-2" />
          문의
        </button>

        <div className="flex flex-1 gap-3">
          {canRespond && (
            <>
              <button
                onClick={() => onAccept?.(request.id)}
                className="bg-brand-600 flex-1 rounded-[12px] py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
              >
                수락
              </button>
              <button
                onClick={() => onReject?.(request.id)}
                className="flex-1 rounded-[12px] bg-gray-100 py-3 text-sm font-bold text-gray-500 hover:bg-gray-200"
              >
                거절
              </button>
            </>
          )}
          {canCancel && (
            <button
              onClick={() => onCancel?.(request.id)}
              className="ml-auto w-[380px] rounded-[12px] bg-gray-100 py-3 text-sm font-bold text-gray-500 hover:bg-gray-200"
            >
              취소하기
            </button>
          )}
          {request.canReview && (
            <>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="ml-auto w-[380px] rounded-[12px] bg-gray-100 py-3 text-sm font-bold text-gray-500 hover:bg-gray-200"
              >
                <span className="relative">
                  {request.reviewId === null || request.reviewId === undefined
                    ? '후기 쓰기'
                    : '후기 수정'}
                  {(request.reviewId === null ||
                    request.reviewId === undefined) && (
                    <span className="absolute -top-0.5 -right-3 h-1.5 w-1.5 rounded-full bg-red-500" />
                  )}
                </span>
              </button>
              <BaseModal
                isOpen={isReviewModalOpen}
                onClose={() => setIsReviewModalOpen(false)}
                maxWidth="max-w-lg"
              >
                <SkillReviewModalContent
                  reviewId={request.reviewId}
                  skillExchangeId={request.id}
                  mentorId={request.partnerId}
                  skillId={request.skillId}
                  onSuccess={() => fetchRequests()}
                  onClose={() => setIsReviewModalOpen(false)}
                />
              </BaseModal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
