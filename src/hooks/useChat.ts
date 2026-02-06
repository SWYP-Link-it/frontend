'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, ChatRoomDetail } from '@/src/types/chat';
import { api } from '@/src/lib/api/api';
import {
  connectSocket,
  enterRoom,
  subscribeToRoom,
  exitRoom,
  disconnectSocket,
  sendMessage as sendSocketMessage,
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

  const getMyId = useCallback(() => {
    if (!accessToken) return 0;
    const payload = parseJwt(accessToken);
    return payload?.userId || payload?.sub || payload?.id || 0;
  }, [accessToken]);

  const markAsRead = useCallback(async () => {
    if (!roomId) return;
    try {
      await api.post(`/chat/rooms/${roomId}/read`);
      window.dispatchEvent(new Event('chat-update'));
    } catch (error) {
      console.error('읽음 처리 실패:', error);
    }
  }, [roomId]);

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
        const fixedMessages = messagesRes.data.data.map((msg: any) => ({
          ...msg,
          isMine: msg.senderId === myId,
        }));
        setMessages(fixedMessages);
        await markAsRead();
      }
    } catch (error) {
      console.error('채팅 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId, getMyId, markAsRead]);

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

              if (payload.senderId !== myId) {
                markAsRead();
              }

              window.dispatchEvent(new Event('chat-update'));
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
  }, [roomId, accessToken, fetchInitialData, getMyId, markAsRead]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    try {
      sendSocketMessage(roomId, content);
      window.dispatchEvent(new Event('chat-update'));
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  return { messages, roomInfo, isLoading, sendMessage };
};
