'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
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

dayjs.locale('ko');

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
  const [unreadInfo, setUnreadInfo] = useState({
    received: false,
    sent: false,
  });
  const accessToken = useAuthStore((state) => state.accessToken);

  const TAB_ITEMS: { key: TabType; label: string }[] = [
    { key: 'received', label: '받은 요청' },
    { key: 'sent', label: '보낸 요청' },
  ];

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
        sessionDate: dayjs(item.exchangeDateTime.replace('T', ' ')).format(
          'YYYY년 M월 D일 A h:mm',
        ),
        sessionTime: `${item.exchangeDuration}분`,
        credits: item.creditPrice,
        createdAt: item.requestedDate,
        isSentByMe: activeTab === 'sent',
        canReview: item.canReview,
        reviewId: item.reviewId,
        skillId: item.skillId,
      }));

      setRequests(mappedRequests);
    } catch (error) {
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  const fetchUnreadStatus = useCallback(async () => {
    try {
      const res = await api.get('/exchange/request/notification');
      setUnreadInfo({
        received: res.data.data.hasUnreadReceived,
        sent: res.data.data.hasUnreadSent,
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
    fetchUnreadStatus();
  }, [fetchRequests, fetchUnreadStatus]);

  useEffect(() => {
    if (
      (activeTab === 'received' && unreadInfo.received) ||
      (activeTab === 'sent' && unreadInfo.sent)
    ) {
      window.dispatchEvent(new Event('chat-update'));
      setUnreadInfo((prev) => ({ ...prev, [activeTab]: false }));
    }
  }, [activeTab, unreadInfo]);

  const handleTabClick = (key: TabType) => {
    setActiveTab(key);
  };

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
    <div className="mx-auto flex w-[calc(100%-224px)] max-w-284 flex-col items-center bg-white shadow-[0_0_0_100vw_white]">
      <div className="w-full shrink-0 border-b border-gray-100 bg-white">
        <div className="my-6 flex shrink-0 flex-col justify-center gap-1">
          <h2 className="text-[24px] font-semibold text-gray-800">요청 관리</h2>
          <p className="text-[12px] text-gray-400">
            파트너와 주고받은 스킬 교환 요청을 확인하세요.
          </p>
        </div>
        <div className="relative mt-2">
          <div className="pointer-events-none absolute top-0 left-0 z-10 flex h-[40px]">
            <div className="relative w-[90px]">
              {unreadInfo.received && (
                <span className="absolute top-[14px] right-[2px] h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </div>
            <div className="relative w-[90px]">
              {unreadInfo.sent && (
                <span className="absolute top-[14px] right-[2px] h-1.5 w-1.5 rounded-full bg-red-500" />
              )}
            </div>
          </div>
          <Tabbar
            items={TAB_ITEMS}
            currentItem={activeTab}
            onClickItem={handleTabClick}
          />
        </div>
      </div>

      <main className="w-full px-6 py-10 pb-20">
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
                fetchRequests={fetchRequests}
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
