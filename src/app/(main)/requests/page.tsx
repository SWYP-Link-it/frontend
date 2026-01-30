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

// 백엔드 상태값(한글) -> 프론트 상태값(영어) 변환
const mapStatus = (koreanStatus: string): RequestStatus => {
  switch (koreanStatus) {
    case '수락됨':
      return 'ACCEPTED';
    case '거절됨':
      return 'REJECTED';
    case '대기중':
      return 'PENDING';
    default:
      return 'PENDING'; // 기본값
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

  // 탭바 설정
  const TAB_ITEMS = ['받은 요청', '보낸 요청'] as const;
  const tabLabelToId: Record<string, TabType> = {
    '받은 요청': 'received',
    '보낸 요청': 'sent',
  };
  const currentTabLabel = activeTab === 'received' ? '받은 요청' : '보낸 요청';

  const handleTabClick = (label: string) => {
    const newTabId = tabLabelToId[label];
    if (newTabId) setActiveTab(newTabId);
  };

  const getMyId = () => {
    if (!accessToken) return 0;
    const payload = parseJwt(accessToken);
    return payload?.userId || payload?.sub || payload?.id || 0;
  };

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);

      // 1. 탭에 따라 엔드포인트 결정
      const endpoint =
        activeTab === 'received'
          ? '/exchange/request/received'
          : '/exchange/request/sent';

      // 2. 실제 API 호출
      const response = await api.get(endpoint, {
        params: {
          size: 100, // 일단 넉넉하게 가져옴 (나중에 무한스크롤 적용 시 nextCursor 사용)
        },
      });

      // 3. 데이터 매핑 (Swagger 응답 -> UI 타입)
      const contentList: ApiRequestItem[] = response.data?.data?.contents || [];

      const mappedRequests: SkillRequest[] = contentList.map((item) => ({
        id: item.skillExchangeId,
        partnerId: item.targetUserId,
        partnerNickname: item.targetNickname,
        partnerTag: item.skillName, // 스킬 이름 (예: Java)
        partnerProfileImageUrl: item.targetProfileImageUrl,
        description: item.message, // 요청 메시지
        status: mapStatus(item.exchangeStatus), // 상태값 변환
        sessionDate: formatDate(item.exchangeDateTime), // 날짜 포맷팅
        sessionTime: `${item.exchangeDuration}분`, // 60 -> "60분"
        credits: item.creditPrice,
        createdAt: item.requestedDate,
        isSentByMe: activeTab === 'sent',
      }));

      setRequests(mappedRequests);
    } catch (error) {
      console.error('요청 내역 불러오기 실패:', error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // --- 아래 액션 핸들러들은 백엔드 API 명세에 따라 URL 확인 필요 ---
  // (일단 기존 로직 유지하되 ID를 skillExchangeId로 사용)

  const handleAccept = async (id: number) => {
    if (!confirm('요청을 수락하시겠습니까?')) return;
    try {
      // TODO: 수락 API 엔드포인트 확인 필요 (예상: /exchange/request/{id}/accept)
      // 현재는 임시 URL 사용
      await api.post(`/exchange/request/${id}/accept`);
      alert('수락되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleReject = async (id: number) => {
    if (!confirm('요청을 거절하시겠습니까?')) return;
    try {
      await api.post(`/exchange/request/${id}/reject`);
      alert('거절되었습니다.');
      fetchRequests();
    } catch (error) {
      alert('오류가 발생했습니다.');
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm('요청을 취소하시겠습니까?')) return;
    try {
      await api.delete(`/exchange/request/${id}`);
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
      {/* 1. 상단 섹션 */}
      <div className="w-full bg-white">
        {/* Header와 동일한 여백 px-[112px] */}
        <div className="w-full px-[112px]">
          <div className="flex h-[100px] flex-col justify-center">
            <h1 className="mb-[4px] text-[24px] font-semibold text-gray-800">
              요청 관리
            </h1>
            <p className="text-[12px] text-gray-400">
              받은 요청과 보낸 요청을 관리하세요
            </p>
          </div>

          <div className="mt-4">
            <Tabbar
              items={TAB_ITEMS}
              currentItem={currentTabLabel}
              onClickItem={handleTabClick}
            />
          </div>
        </div>
      </div>

      {/* 2. 하단 섹션 */}
      <div className="w-full flex-1 bg-[#F8FAFC]">
        <main className="w-full px-[112px] py-10">
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
