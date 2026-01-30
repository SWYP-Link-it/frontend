'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api/api';
import { useAuthStore } from '@/src/stores/authStore';
import { RequestCard } from '@/src/components/request/RequestCard';
import { EmptyState } from '@/src/components/request/EmptyState';
import { SkillRequest, TabType } from '@/src/types/request';

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

export default function RequestPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('received');
  const [requests, setRequests] = useState<SkillRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = useAuthStore((state) => state.accessToken);

  const getMyId = () => {
    if (!accessToken) return 0;
    const payload = parseJwt(accessToken);
    return payload?.userId || payload?.sub || payload?.id || 0;
  };

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);

      // TODO: 확인용 MOCK DATA (수정 예정)
      // 1. 전체 가짜 데이터
      const MOCK_DATA = [
        // [받은 요청] 1. 대기중인 요청 (React 멘토링)
        {
          id: 1,
          partnerId: 101, // 채팅용 상대방 ID
          partnerNickname: '코딩하는고양이',
          partnerTag: 'React',
          partnerProfileImageUrl: '', // 없으면 기본이미지 뜸
          description:
            '안녕하세요! 리액트 상태관리 라이브러리(Zustand)에 대해 1:1 멘토링을 받고 싶습니다. 실무에서 어떻게 쓰는지 궁금해요!',
          status: 'PENDING',
          sessionDate: '2025년 07월 20일',
          sessionTime: '1시간',
          credits: 3,
          createdAt: '2025.07.19',
          isSentByMe: false, // 내가 받은 것
        },
        {
          id: 2,
          partnerId: 102,
          partnerNickname: '디자인깎는노인',
          partnerTag: 'Figma',
          partnerProfileImageUrl: '',
          description:
            '피그마 오토레이아웃 기능이 너무 어려워서 과외 요청드립니다. 기초부터 알려주세요.',
          status: 'ACCEPTED',
          sessionDate: '2025년 07월 22일',
          sessionTime: '30분',
          credits: 1,
          createdAt: '2025.07.18',
          isSentByMe: false, // 내가 받은 것
        },
        {
          id: 3,
          partnerId: 103,
          partnerNickname: '자바의신',
          partnerTag: 'Java',
          partnerProfileImageUrl: '',
          description:
            '스프링부트 JPA N+1 문제 해결 때문에 머리가 아픕니다. 코드 리뷰 좀 부탁드려도 될까요?',
          status: 'PENDING',
          sessionDate: '2025년 07월 25일',
          sessionTime: '1시간',
          credits: 5,
          createdAt: '2025.07.20',
          isSentByMe: true, // 내가 보낸 것
        },
        {
          id: 4,
          partnerId: 104,
          partnerNickname: '풀스택개발자',
          partnerTag: 'Node.js',
          partnerProfileImageUrl: '',
          description: 'NestJS 아키텍처 설계 조언 구합니다.',
          status: 'REJECTED',
          sessionDate: '2025년 07월 21일',
          sessionTime: '30분',
          credits: 2,
          createdAt: '2025.07.15',
          isSentByMe: true, // 내가 보낸 것
        },
      ];

      const filteredMockData = MOCK_DATA.filter((item) =>
        activeTab === 'received' ? !item.isSentByMe : item.isSentByMe,
      );

      setRequests(filteredMockData as any);

      /* const response = await api.get('/requests', {
        params: { type: activeTab },
      });
      const rawData = response.data.data || [];
      const mappedRequests = rawData.map(...)
      setRequests(mappedRequests);
      */
    } catch (error) {
      console.error(error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  // const fetchRequests = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.get('/requests', {
  //       params: { type: activeTab },
  //     });

  //     const rawData = response.data.data || [];
  //     const mappedRequests = rawData.map((item: any) => ({
  //       id: item.id,
  //       partnerId: item.partnerId || item.senderId || 0,
  //       partnerNickname:
  //         item.partnerNickname ||
  //         item.nickname ||
  //         item.partner?.nickname ||
  //         '알 수 없음',
  //       partnerTag:
  //         item.partnerTag || item.tag || item.partner?.tag || '태그 없음',
  //       partnerProfileImageUrl:
  //         item.partnerProfileImageUrl || item.profileImageUrl,
  //       description: item.description,
  //       status: item.status,
  //       sessionDate: item.sessionDate || '날짜 미정',
  //       sessionTime: item.sessionTime || '시간 미정',
  //       credits: item.credits || 0,
  //       createdAt: item.createdAt || '',
  //       isSentByMe: activeTab === 'sent',
  //     }));

  //     setRequests(mappedRequests);
  //   } catch (error) {
  //     console.error(error);
  //     setRequests([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [activeTab]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAccept = async (id: number) => {
    if (!confirm('요청을 수락하시겠습니까?')) return;
    try {
      await api.post(`/requests/${id}/accept`);
      alert('수락되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm('요청을 거절하시겠습니까?')) return;
    try {
      await api.post(`/requests/${id}/reject`);
      alert('거절되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm('요청을 취소하시겠습니까?')) return;
    try {
      await api.delete(`/requests/${id}`);
      alert('취소되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleInquiry = async (partnerId: number) => {
    const myId = Number(getMyId());
    if (!myId) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const response = await api.post('/chat/rooms', null, {
        params: {
          mentorId: activeTab === 'sent' ? partnerId : myId,
          menteeId: activeTab === 'sent' ? myId : partnerId,
          type: 'MENTORING',
        },
      });

      const newRoomId = response.data.data.roomId;
      router.push(`/messages/${newRoomId}`);
    } catch (error: any) {
      const msg = error.response?.data?.message || '채팅 연결 실패';
      alert(msg);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* 1. 상단 섹션 (흰색 배경) - 제목과 탭은 여기에 위치 */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex h-[100px] flex-col justify-center">
            <h1 className="mb-[4px] text-[24px] font-semibold text-gray-800">
              요청 관리
            </h1>
            <p className="text-[12px] text-gray-400">
              받은 요청과 보낸 요청을 관리하세요
            </p>
          </div>

          {/* 탭 버튼: 흰색 배경의 바닥에 붙음 */}
          <div className="flex h-[56px] border-b border-gray-200">
            <button
              onClick={() => setActiveTab('received')}
              className={`px-[8px] text-[18px] font-semibold transition-all ${
                activeTab === 'received'
                  ? 'border-brand-600 border-b-2 text-gray-700'
                  : 'text-gray-500'
              }`}
            >
              받은 요청
            </button>
            <button
              onClick={() => setActiveTab('sent')}
              className={`px-[8px] text-[18px] font-semibold transition-all ${
                activeTab === 'sent'
                  ? 'border-brand-600 border-b-2 text-gray-700'
                  : 'text-gray-500'
              }`}
            >
              보낸 요청
            </button>
          </div>
        </div>
      </div>

      {/* 2. 하단 섹션 (회색 배경) - 카드 리스트는 여기에 위치 */}
      <div className="w-full flex-1 bg-[#F8FAFC]">
        <main className="mx-auto w-full max-w-6xl px-4 py-10">
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex h-60 items-center justify-center text-gray-400">
                로딩 중...
              </div>
            ) : requests.length > 0 ? (
              requests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onCancel={handleCancel}
                  onInquiry={handleInquiry}
                />
              ))
            ) : (
              <EmptyState
                message={
                  activeTab === 'received'
                    ? '아직 받은 요청이 없어요.'
                    : '아직 보낸 요청이 없어요.'
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
