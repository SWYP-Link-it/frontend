import { api } from '@/src/lib/api/api';
import { ChatMessage, ChatRoomDetail, ApiResponse } from '@/src/types/chat';

// 채팅방 상세 정보 조회 (상대방 프로필 등)
export const getChatRoomDetail = async (roomId: number) => {
  const response = await api.get<ApiResponse<ChatRoomDetail>>(
    `/chat/rooms/${roomId}`,
  );
  return response.data;
};

// 채팅방 메시지 목록 조회 (과거 내역)
export const getChatMessages = async (roomId: number) => {
  const response = await api.get<ApiResponse<ChatMessage[]>>(
    `/chat/rooms/${roomId}/messages`,
  );
  return response.data;
};
