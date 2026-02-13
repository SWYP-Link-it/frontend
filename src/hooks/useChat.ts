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

  useEffect(() => {
    if (!accessToken || !roomId) return;

    let isComponentMounted = true;

    const initChat = async () => {
      try {
        setIsLoading(true);

        const [roomRes, messagesRes] = await Promise.all([
          api.get(`/chat/rooms/${roomId}`),
          api.get(`/chat/rooms/${roomId}/messages`),
        ]);
        console.log(messagesRes);
        if (!isComponentMounted) return;

        if (roomRes.data.success) setRoomInfo(roomRes.data.data);
        if (messagesRes.data.success) {
          const myId = Number(getMyId());
          const fixedMessages = messagesRes.data.data.map((msg: any) => ({
            ...msg,
            isMine: msg.senderId === myId,
          }));
          setMessages(fixedMessages);
          await markAsRead();
        }

        await connectSocket(accessToken);
        enterRoom(roomId);

        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
        }

        subscriptionRef.current = subscribeToRoom(
          roomId,
          (payload: ChatPayload) => {
            if (!payload.system) {
              const myId = Number(getMyId());

              setMessages((prev) => {
                const isAlreadyExists = prev.some(
                  (m) => m.messageId === payload.messageId,
                );
                if (isAlreadyExists) return prev;

                const newMessage: ChatMessage = {
                  messageId: payload.messageId,
                  roomId: payload.roomId,
                  senderId: payload.senderId,
                  senderRole: payload.senderRole,
                  content: payload.text || '',
                  fileUrl: (payload as any).imageUrl || payload.fileUrl || null,
                  createdAtEpochMs: payload.sentAtEpochMs,
                  isMine: payload.senderId === myId,
                };
                return [...prev, newMessage];
              });

              if (payload.senderId !== myId) markAsRead();
              window.dispatchEvent(new Event('chat-update'));
            }
          },
        );
      } catch (err) {
        console.error('채팅 연결 에러:', err);
      } finally {
        if (isComponentMounted) setIsLoading(false);
      }
    };

    initChat();

    return () => {
      isComponentMounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }
      exitRoom(roomId);
      disconnectSocket();
    };
  }, [roomId, accessToken, getMyId, markAsRead]);

  const sendMessage = async (content: string, file?: File) => {
    if (!content.trim() && !file) return;
    try {
      const fileUrl = null;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadRes = await api.post(
          `/chat/file/upload?roomId=${roomId}`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          },
        );

        // console.log('1. 이미지 업로드 응답:', uploadRes.data);

        // if (uploadRes.data.success) {
        //   // 서버 응답 구조가 { data: "http://..." } 인지 확인 필요
        //   fileUrl = uploadRes.data.data;
        //   console.log('2. 설정된 fileUrl:', fileUrl);
        // }
      }

      // console.log('3. 최종 소켓 전송 데이터:', { roomId, content, fileUrl });

      sendSocketMessage(roomId, content, fileUrl);
      window.dispatchEvent(new Event('chat-update'));
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  return { messages, roomInfo, isLoading, sendMessage };
};
