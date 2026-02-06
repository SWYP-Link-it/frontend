'use client';

import { useEffect, useState } from 'react';
import { ChatListItem } from './ChatListItem';
import { ChatRoomListItem } from '@/src/types/chat';
import { api } from '@/src/lib/api/api';
import { MessageIcon } from '../icons/MessageIcon';

export const ChatSidebar = () => {
  const [rooms, setRooms] = useState<ChatRoomListItem[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
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
    };

    // 최초 실행
    fetchRooms();

    const handleChatUpdate = () => {
      fetchRooms();
    };

    window.addEventListener('chat-update', handleChatUpdate);

    return () => {
      window.removeEventListener('chat-update', handleChatUpdate);
    };
  }, []); // 외부 의존성이 없으므로 빈 배열로 설정합니다.

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[48px] items-center justify-between px-[20px] pt-[10px]">
        <div className="flex items-center">
          <span className="text-[16px] font-bold text-gray-800">대화 목록</span>
          <span className="ml-1 text-gray-300">
            <MessageIcon />
          </span>
        </div>
      </div>
      {rooms.length > 0 ? (
        <div className="custom-scrollbar flex-1 overflow-y-auto pr-1">
          {rooms.map((room) => (
            <ChatListItem key={room.roomId} data={room} />
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[14px] text-gray-500">
          대화 목록이 없습니다
        </div>
      )}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};
