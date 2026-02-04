'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, ChatRoomDetail } from '@/src/types/chat';
import { api } from '@/src/lib/api/api';

export const useChat = (roomId: number) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [roomInfo, setRoomInfo] = useState<ChatRoomDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        setMessages(messagesRes.data.data || []);
      }
    } catch (error) {
      console.error('채팅 데이터 로딩 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const sendMessage = async (content: string) => {
    try {
      const response = await api.post(`/chat/rooms/${roomId}/messages`, {
        content: content,
      });
      if (response.data.success) {
        const newMessage = response.data.data;
        setMessages((prev) => [...prev, newMessage]);
      }
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      alert('메시지 전송에 실패했습니다.');
    }
  };

  return { messages, roomInfo, isLoading, sendMessage };
};
