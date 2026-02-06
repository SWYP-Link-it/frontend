'use client';

import { SkillRequest } from '@/src/types/request';

interface RequestCardProps {
  request: SkillRequest;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
  onCancel?: (id: number) => void;
  onInquiry?: (partnerId: number) => void;
}

export const RequestCard = ({
  request,
  onAccept,
  onReject,
  onCancel,
  onInquiry,
}: RequestCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACCEPTED':
        return (
          <span className="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
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

  // 버튼 노출 로직 (명세 기준)
  const isPending = request.status === 'PENDING';
  const isAccepted = request.status === 'ACCEPTED';

  // 멘티(보낸 사람): 대기중, 수락됨 상태에서 취소 가능
  // 멘토(받은 사람): 수락됨 상태에서 취소 가능
  const canCancel = request.isSentByMe ? isPending || isAccepted : isAccepted;

  // 수락/거절은 멘토가 대기중일 때만 가능
  const canRespond = !request.isSentByMe && isPending;

  return (
    <div className="border-brand-50 rounded-[16px] border bg-white p-6 transition-all hover:shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
        <div className="flex items-start space-x-4">
          <div className="bg-brand-50 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full">
            {request.partnerProfileImageUrl ? (
              <img
                src={request.partnerProfileImageUrl}
                alt="profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-blue-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
          </div>

          <div>
            <div className="mb-1 flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-900">
                {request.partnerNickname}
              </h3>
              <span className="rounded bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                {request.partnerTag}
              </span>
              {getStatusBadge(request.status)}
            </div>
            <p className="text-xs text-gray-400">{request.createdAt} 요청됨</p>
          </div>
        </div>

        <div className="mt-4 flex space-x-8 md:mt-0">
          <div>
            <p className="mb-1 text-xs text-gray-300">날짜</p>
            <p className="text-sm font-bold text-gray-700">
              {request.sessionDate}
            </p>
          </div>
          <div className="border-l border-gray-100 pl-8">
            <p className="mb-1 text-xs text-gray-300">조건</p>
            <p className="text-sm font-bold text-gray-700">
              {request.sessionTime} / {request.credits} 크레딧
            </p>
          </div>
        </div>
      </div>

      <div className="my-6 border-t border-gray-100"></div>

      <div className="mb-8">
        <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-600">
          {request.description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onInquiry?.(request.partnerId)}
          className="flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg
            className="mr-2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          문의하기
        </button>

        <div className="flex flex-1 gap-3">
          {canRespond && (
            <>
              <button
                onClick={() => onAccept?.(request.id)}
                className="flex-1 rounded-[12px] bg-blue-600 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
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
              className="w-full rounded-[12px] bg-gray-100 py-3 text-sm font-bold text-gray-500 hover:bg-gray-200"
            >
              요청 취소
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
