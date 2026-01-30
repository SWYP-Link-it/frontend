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
    const normalizedStatus = status?.toUpperCase() || 'PENDING';
    switch (normalizedStatus) {
      case 'ACCEPTED':
        return (
          <span className="text-brand-600 rounded bg-blue-100 px-2 py-0.5 text-[11px] font-semibold">
            수락됨
          </span>
        );
      case 'REJECTED':
        return (
          <span className="rounded bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-600">
            거절됨
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

  const showActions = request.status?.toUpperCase() === 'PENDING';

  return (
    <div className="border-brand-50 rounded-[16px] border bg-white p-6 transition-all">
      <div className="mb-6 flex flex-col items-start justify-between md:flex-row">
        <div className="flex items-start space-x-4">
          <div className="bg-brand-50 text-brand-600 flex h-12 w-12 items-center justify-center rounded-full">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <div>
            <div className="mb-1 flex items-center space-x-2">
              <h3 className="text-lg font-bold text-gray-900">
                {request.partnerNickname}
              </h3>
              <span className="text-brand-600 bg-brand-50 rounded px-2 py-0.5 text-[11px] font-semibold">
                {request.partnerTag}
              </span>
              {getStatusBadge(request.status)}
            </div>
            <p className="text-xs text-gray-400">{request.createdAt}</p>
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
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          문의
        </button>

        {showActions && (
          <div className="flex flex-1 gap-3">
            {request.isSentByMe ? (
              <button
                onClick={() => onCancel?.(request.id)}
                className="w-full rounded-[12px] bg-gray-100 py-3 text-sm font-bold text-gray-500"
              >
                취소하기
              </button>
            ) : (
              <>
                <button
                  onClick={() => onAccept?.(request.id)}
                  className="bg-brand-600 flex-1 rounded-[12px] py-3 text-sm font-bold text-white"
                >
                  수락
                </button>
                <button
                  onClick={() => onReject?.(request.id)}
                  className="flex-1 rounded-[12px] bg-gray-100 py-3 text-sm font-bold text-gray-500"
                >
                  거절
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
