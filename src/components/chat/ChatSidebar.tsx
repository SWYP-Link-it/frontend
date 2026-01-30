'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChatListItem } from './ChatListItem';
import { ChatRoomListItem } from '@/src/types/chat';
import { api } from '@/src/lib/api/api';

export const ChatSidebar = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<ChatRoomListItem[]>([]);

  const fetchRooms = useCallback(async () => {
    try {
      const response = await api.get('/chat/rooms');
      const roomList = response.data.data || [];

      const sortedList = roomList.sort(
        (a: ChatRoomListItem, b: ChatRoomListItem) => {
          const timeA = a.lastMessageAtEpochMs || 0;
          const timeB = b.lastMessageAtEpochMs || 0;
          return timeB - timeA;
        },
      );

      setRooms(sortedList);
    } catch (error) {
      console.error('채팅방 목록 로딩 실패:', error);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await fetchRooms();
    };
    init();
  }, [fetchRooms]);

  const handleCreateTestRoom = async () => {
    try {
      // TODO: 실제 구현 시에는 로그인한 유저 ID(menteeId)와 멘토 상세 페이지에서 넘겨받은 mentorId를 동적으로 사용해야 함
      const myId = 17;
      const partnerId = 15;

      const response = await api.post('/chat/rooms', null, {
        params: {
          mentorId: partnerId,
          menteeId: myId,
          type: 'MENTORING',
        },
      });

      const newRoomId = response.data.data.roomId;
      alert(`성공! 방 ID: ${newRoomId}`);

      fetchRooms();
      router.push(`/messages/${newRoomId}`);
    } catch (error: any) {
      console.error('방 생성 실패:', error.response?.data);
      const msg = error.response?.data?.message || '생성 실패';
      alert(`실패: ${msg}`);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[48px] items-center justify-between px-[20px] pt-[10px]">
        <div className="flex items-center">
          <span className="text-[16px] font-bold text-gray-800">대화 목록</span>
          <span className="ml-1 text-gray-300">● {rooms.length}</span>
        </div>

        <button
          onClick={handleCreateTestRoom}
          className="text-brand-600 rounded bg-blue-100 px-2 py-1 text-xs hover:bg-blue-200"
        >
          + 테스트방 생성(ID:1)
        </button>
      </div>

      {rooms.length > 0 ? (
        <div className="flex-1 overflow-y-auto pr-1">
          {rooms.map((room) => {
            return <ChatListItem key={room.roomId} data={room} />;
          })}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[14px] text-gray-500">
          대화 목록이 없습니다
        </div>
      )}
    </div>
  );
};
