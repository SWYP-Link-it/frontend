'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/src/lib/api/api';
import { useAuthStore } from '@/src/stores/authStore';
import { RequestCard } from '@/src/components/request/RequestCard';
import { EmptyState } from '@/src/components/request/EmptyState';
import {
  SkillRequest,
  TabType,
  ApiRequestItem,
  RequestStatus,
} from '@/src/types/request';
import { Tabbar } from '@/src/components/Tabbar';

// 날짜 포맷팅 유틸 (YYYY-MM-DDT... -> YYYY년 MM월 DD일)
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

// Enum 명세 반영 매핑 함수
const mapStatus = (koreanStatus: string): RequestStatus => {
  switch (koreanStatus) {
    case '수락됨':
      return 'ACCEPTED';
    case '거절됨':
      return 'REJECTED';
    case '취소됨':
      return 'CANCELED';
    case '만료됨':
      return 'EXPIRED';
    case '완료됨':
      return 'COMPLETED';
    case '대기중':
      return 'PENDING';
    default:
      return 'PENDING';
  }
};

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

  // Tabbar 컴포넌트의 제네릭 구조에 맞게 수정된 아이템 리스트
  const TAB_ITEMS: { key: TabType; label: string }[] = [
    { key: 'received', label: '받은 요청' },
    { key: 'sent', label: '보낸 요청' },
  ];

  // 클릭 시 전달받는 key가 바로 TabType('received' | 'sent')이므로 로직이 단순해집니다.
  const handleTabClick = (key: TabType) => {
    setActiveTab(key);
  };

  const getMyId = () => {
    if (!accessToken) return 0;
    const payload = parseJwt(accessToken);
    return payload?.userId || payload?.sub || 0;
  };

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const endpoint =
        activeTab === 'received'
          ? '/exchange/request/received'
          : '/exchange/request/sent';
      const response = await api.get(endpoint, { params: { size: 50 } });

      const contentList: ApiRequestItem[] = response.data?.data?.contents || [];
      const mappedRequests: SkillRequest[] = contentList.map((item) => ({
        id: item.skillExchangeId,
        partnerId: item.targetUserId,
        partnerNickname: item.targetNickname,
        partnerTag: item.skillName,
        partnerProfileImageUrl: item.targetProfileImageUrl,
        description: item.message,
        status: mapStatus(item.exchangeStatus),
        sessionDate: formatDate(item.exchangeDateTime),
        sessionTime: `${item.exchangeDuration}분`,
        credits: item.creditPrice,
        createdAt: item.requestedDate,
        isSentByMe: activeTab === 'sent',
      }));

      setRequests(mappedRequests);
    } catch (error) {
      console.error('불러오기 실패:', error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAccept = async (id: number) => {
    if (!confirm('요청을 수락하시겠습니까?')) return;
    try {
      await api.post(`/exchange/request/${id}/accept`);
      alert('수락되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('수락 처리에 실패했습니다.');
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm('요청을 거절하시겠습니까?')) return;
    try {
      await api.post(`/exchange/request/${id}/reject`);
      alert('거절되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('거절 처리에 실패했습니다.');
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm('요청을 취소하시겠습니까?')) return;
    try {
      // 명세서에 따라 POST /cancel 사용
      await api.post(`/exchange/request/${id}/cancel`);
      alert('취소되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('취소 처리에 실패했습니다.');
    }
  };

  const handleInquiry = async (partnerId: number) => {
    const myId = Number(getMyId());
    if (!myId) return alert('로그인이 필요합니다.');

    try {
      const response = await api.post('/chat/rooms', null, {
        params: {
          mentorId: activeTab === 'sent' ? partnerId : myId,
          menteeId: activeTab === 'sent' ? myId : partnerId,
          type: 'MENTORING',
        },
      });
      router.push(`/messages/${response.data.data.roomId}`);
    } catch (error) {
      alert('채팅방 연결에 실패했습니다.');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex h-[100px] flex-col justify-center">
            <h1 className="text-[24px] font-bold text-gray-900">요청 관리</h1>
            <p className="text-sm text-gray-500">
              파트너와 주고받은 스킬 교환 요청을 확인하세요.
            </p>
          </div>
          <div className="mt-2">
            <Tabbar
              items={TAB_ITEMS}
              currentItem={activeTab}
              onClickItem={handleTabClick}
            />
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 py-10">
        <div className="space-y-6">
          {isLoading ? (
            <div className="flex h-60 items-center justify-center font-medium text-gray-400">
              데이터를 불러오는 중입니다...
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
                  ? '받은 요청이 없습니다.'
                  : '보낸 요청이 없습니다.'
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}
