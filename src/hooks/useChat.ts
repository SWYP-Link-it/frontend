'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, ChatRoomDetail } from '@/src/types/chat';
import { api } from '@/src/lib/api/api';
// 보내주신 파일 경로에 맞춰 import (파일명이 socket.ts인지 확인 필요)
import {
  connectSocket,
  enterRoom,
  subscribeToRoom,
  exitRoom,
  disconnectSocket,
  sendMessage as sendSocketMessage, // 이름 중복 방지를 위해 별칭 사용
  ChatPayload,
} from '@/src/utils/socket';
import { useAuthStore } from '../stores/authStore';
import { parseJwt } from '../utils/parseJwt';

export const useChat = (roomId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [roomInfo, setRoomInfo] = useState<ChatRoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const accessToken = useAuthStore((state) => state.accessToken);
  const subscriptionRef = useRef<any>(null);

  // 내 ID 추출 함수
  const getMyId = useCallback(() => {
    if (!accessToken) return 0;
    const payload = parseJwt(accessToken);
    return payload?.userId || payload?.sub || payload?.id || 0;
  }, [accessToken]);

  // 초기 데이터 로딩
  const fetchInitialData = useCallback(async () => {
    if (!roomId) return;
    try {
      setIsLoading(true);
      const [roomRes, messagesRes] = await Promise.all([
        api.get(`/chat/rooms/${roomId}`),
        api.get(`/chat/rooms/${roomId}/messages`),
      ]);

      if (roomRes.data.success) {
        setRoomInfo(roomRes.data.data);
      }
      if (messagesRes.data.success) {
        const myId = Number(getMyId());
        // 기존 메시지들에 isMine 속성 부여
        const fixedMessages = messagesRes.data.data.map((msg: any) => ({
          ...msg,
          isMine: msg.senderId === myId,
        }));
        setMessages(fixedMessages);
      }
    } catch (error) {
      console.error('채팅 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, getMyId]);

  useEffect(() => {
    if (!accessToken || !roomId) return;

    const setupSocket = async () => {
      try {
        await connectSocket(accessToken);
        enterRoom(roomId);

        // 실시간 메시지 구독
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

    fetchInitialData().then(() => setupSocket());

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
      exitRoom(roomId);
      disconnectSocket();
    };
  }, [roomId, accessToken, fetchInitialData, getMyId]);

  // 메시지 전송 (소켓 이용)
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    try {
      // 소켓을 통해 전송 (백엔드에서 저장 후 구독자들에게 브로드캐스팅됨)
      sendSocketMessage(roomId, content);

      // 만약 백엔드에서 전송 API를 따로 호출해야 한다면 아래 주석 해제
      // await api.post(`/chat/rooms/${roomId}/messages`, { content });
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  return { messages, roomInfo, isLoading, sendMessage };
};
