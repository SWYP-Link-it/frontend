import { SkillRequest } from '@/src/types/request';
import React from 'react';

interface RequestCardProps {
  request: SkillRequest;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const RequestCard = ({
  request,
  onAccept,
  onReject,
}: RequestCardProps) => {
  return (
    <div className="mb-6 rounded-[16px] bg-white p-[40px]">
      <div className="mb-6 flex flex-col justify-between md:flex-row">
        <div className="mb-4 flex items-start space-x-4 md:mb-0">
          <div className="text-brand-600 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DCE8FF]">
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
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {request.userName}
            </h3>
            <span className="text-brand-600 mt-1 inline-block rounded bg-blue-50 px-2 py-0.5 text-xs font-medium">
              {request.userTag}
            </span>
          </div>
        </div>

        <div className="md:w-3/5">
          <p className="text-sm leading-relaxed break-keep text-gray-600">
            {request.description}
          </p>
        </div>
      </div>

      <hr className="mb-6 border-gray-100" />

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <p className="mb-1 text-xs text-gray-400">날짜 및 시간</p>
          <p className="text-sm font-medium text-gray-900">
            {request.date} {request.time}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs text-gray-400">스킬 거래 시간</p>
          <p className="text-sm font-medium text-gray-900">
            {request.skillTradeTime} · {request.credits} 크레딧
          </p>
        </div>
      </div>

      <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => onAccept(request.id)}
          className="bg-brand-600 flex-1 rounded-[12px] px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
        >
          수락
        </button>
        <button
          onClick={() => onReject(request.id)}
          className="flex-1 rounded-[12px] bg-gray-100 px-4 py-3 font-bold text-gray-500 transition-colors hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none"
        >
          거절
        </button>
      </div>
    </div>
  );
};
