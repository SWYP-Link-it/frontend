'use client';

import React, { useState } from 'react';
import { RequestCard } from '@/src/components/request/RequestCard';
import { SkillRequest, TabType } from '@/src/types/request';

export default function RequestPage() {
  const [activeTab, setActiveTab] = useState<TabType>('received');

  // TODO: 목데이터 (추후 수정 예정)
  const [requests, setRequests] = useState<SkillRequest[]>([
    {
      id: '1',
      userName: '5년차키위',
      userTag: '리액트',
      description:
        'Figma를 활용한 실무 중심의 UX/UI 디자인을 가르쳐드립니다. 언제든 문의주세요.',
      date: '2025.7.20',
      time: '7:30',
      skillTradeTime: '30분',
      credits: 1,
      status: 'pending',
    },
    {
      id: '2',
      userName: '신입개발자',
      userTag: '타입스크립트',
      description:
        '타입스크립트 기초부터 탄탄하게 배우고 싶습니다. 멘토링 부탁드립니다.',
      date: '2025.7.21',
      time: '14:00',
      skillTradeTime: '1시간',
      credits: 2,
      status: 'pending',
    },
  ]);

  const handleAccept = (id: string) => {
    alert('수락되었습니다.');
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'accepted' } : req)),
    );
  };

  const handleReject = (id: string) => {
    alert('거절되었습니다.');
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'rejected' } : req)),
    );
  };

  const pendingRequests = requests.filter((req) => req.status === 'pending');

  return (
    <div className="flex min-h-screen flex-col">
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-[100px] flex-col justify-center">
            <h1 className="mb-[4px] text-[24px] font-bold text-gray-800">
              요청 관리
            </h1>
            <p className="text-[12px] text-gray-400">
              받은 요청과 보낸 요청을 관리하세요
            </p>
          </div>

          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('received')}
              className={`pb-4 text-sm font-bold transition-all ${
                activeTab === 'received'
                  ? 'border-brand-600 border-b-2 text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              받은 요청
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`pb-4 text-sm font-bold transition-all ${
                activeTab === 'sent'
                  ? 'border-brand-600 border-b-2 text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              보낸 요청
            </button>
          </div>
        </div>
      </div>

      <div className="bg-brand-50 flex-1">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {activeTab === 'received' ? (
              pendingRequests.length > 0 ? (
                pendingRequests.map((request) => (
                  <RequestCard
                    key={request.id}
                    request={request}
                    onAccept={handleAccept}
                    onReject={handleReject}
                  />
                ))
              ) : (
                <div className="py-20 text-center text-gray-400">
                  대기 중인 받은 요청이 없습니다.
                </div>
              )
            ) : (
              <div className="py-20 text-center text-gray-400">
                보낸 요청 내역이 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
