import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuthStore } from '@/src/stores/authStore';
import { ChatMessage, ChatRoomDetail } from '@/src/types/chat';
import { getChatMessages, getChatRoomDetail } from '@/src/lib/api/chat';
import {
  connectSocket,
  disconnectSocket,
  subscribeToRoom,
  enterRoom,
  exitRoom,
  sendMessage as sendSocketMessage,
  ChatPayload,
} from '@/src/utils/socket';

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

export const useChat = (roomId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [roomInfo, setRoomInfo] = useState<ChatRoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = useAuthStore((state) => state.accessToken);

  const getMyId = () => {
    if (!accessToken) return 0;
    const payload = parseJwt(accessToken);
    return payload?.userId || payload?.sub || payload?.id || 0;
  };

  const subscriptionRef = useRef<any>(null);

  const fetchInitialData = useCallback(async () => {
    if (!roomId) return;
    try {
      setIsLoading(true);
      const [roomData, msgsData] = await Promise.all([
        getChatRoomDetail(roomId),
        getChatMessages(roomId),
      ]);

      if (roomData.success) {
        // TODO: 백엔드 상세 조회 API에서 partnerNickname이 null로 오는 이슈가 해결되면 이 fallback 로직 제거 필요
        const fixedRoomInfo = {
          ...roomData.data,
          partnerNickname: roomData.data.partnerNickname || '알 수 없는 사용자',
          partnerProfileImageUrl: roomData.data.partnerProfileImageUrl || '',
        };
        setRoomInfo(fixedRoomInfo);
      }

      if (msgsData.success) {
        const myId = Number(getMyId());
        const fixedMessages = msgsData.data.map((msg) => ({
          ...msg,
          isMine: msg.senderId === myId,
        }));
        setMessages(fixedMessages);
      }
    } catch (error) {
      console.error('초기 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, accessToken]);

  useEffect(() => {
    if (!accessToken || !roomId) return;

    const setupSocket = async () => {
      try {
        await connectSocket(accessToken);
        enterRoom(roomId);

        subscriptionRef.current = subscribeToRoom(
          roomId,
          (payload: ChatPayload) => {
            if (!payload.system) {
              const myId = Number(getMyId());

              const newMessage: ChatMessage = {
                messageId: payload.messageId,
                roomId: payload.roomId,
                senderId: payload.senderId,
                senderRole: payload.senderRole,
                content: payload.text,
                createdAtEpochMs: payload.sentAtEpochMs,
                isMine: payload.senderId === myId,
              };

              setMessages((prev) => [...prev, newMessage]);
            }
          },
        );
      } catch (err) {
        console.error('소켓 연결 실패:', err);
      }
    };

    fetchInitialData().then(() => {
      setupSocket();
    });

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      exitRoom(roomId);
      disconnectSocket();
    };
  }, [roomId, accessToken, fetchInitialData]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    try {
      sendSocketMessage(roomId, content);
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  return { messages, roomInfo, isLoading, sendMessage };
};
