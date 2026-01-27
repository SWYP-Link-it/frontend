// src/hooks/useChat.ts
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { ChatMessage, ChatRoomDetail } from '@/src/types/chat';
import {
  connectSocket,
  disconnectSocket,
  subscribeToRoom,
  enterRoom,
  exitRoom,
  sendMessage as sendSocketMessage,
  ChatPayload,
} from '@/src/utils/socket';

export const useChat = (roomId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [roomInfo, setRoomInfo] = useState<ChatRoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const subscriptionRef = useRef<any>(null);

  const fetchInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      const headers = { Authorization: `Bearer ${token}` };
      const BASE_URL = 'https://api.desklab.kr';

      const [roomRes, msgsRes] = await Promise.all([
        axios.get(`${BASE_URL}/chat/rooms/${roomId}`, { headers }),
        axios.get(`${BASE_URL}/chat/rooms/${roomId}/messages`, { headers }),
      ]);

      if (roomRes.data && roomRes.data.success) {
        setRoomInfo(roomRes.data.data);
      }

      if (msgsRes.data && msgsRes.data.success) {
        setMessages(msgsRes.data.data);
      }
    } catch (error) {
      console.error('데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token || !roomId) return;

    const setupSocket = async () => {
      try {
        await connectSocket(token);

        subscriptionRef.current = subscribeToRoom(
          roomId,
          (payload: ChatPayload) => {
            if (!payload.system) {
              const myId = Number(localStorage.getItem('userId') || 0);

              const newMessage: ChatMessage = {
                messageId: payload.messageId,
                roomId: payload.roomId,
                senderId: payload.senderId,
                content: payload.text,
                createdAtEpochMs: payload.sentAtEpochMs,
                isMine: payload.senderId === myId,
                senderRole: payload.senderRole,
              };

              setMessages((prev) => [...prev, newMessage]);
            }
          },
        );

        enterRoom(roomId);
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
  }, [roomId, fetchInitialData]);

  const sendMessage = async (content: string) => {
    try {
      sendSocketMessage(roomId, content);
    } catch (error) {
      console.error('전송 실패:', error);
    }
  };

  return { messages, roomInfo, isLoading, sendMessage };
};
