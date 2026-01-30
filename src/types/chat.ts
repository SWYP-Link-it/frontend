// 📂 src/types/chat.ts

export type ApiResponse<T> = {
  success: boolean;
  code: string | null;
  message: string;
  data: T;
};

// GET /chat/rooms/{roomId}
export type ChatRoomDetail = {
  roomId: number;
  mentorId: number;
  menteeId: number;
  status: 'ACTIVE' | 'INACTIVE';
  partnerId: number;
  partnerNickname: string;
  partnerProfileImageUrl: string;
  lastMessageId: number;
  lastMessageContent: string;
  lastMessageAtEpochMs: number;
  unreadCount: number;
  unreadMentorCount: number;
  unreadMenteeCount: number;
  createdAtEpochMs: number;
  modifiedAtEpochMs: number;
};

// GET /chat/rooms/{roomId}/messages
export type ChatMessage = {
  messageId: number;
  roomId: number;
  senderId: number;
  senderRole: 'MENTOR' | 'MENTEE';
  content: string;
  createdAtEpochMs: number;
  isMine: boolean;
};

export interface ChatRoomListItem {
  roomId: number;
  roomName: string;
  partnerId: number;
  partnerNickname: string;
  partnerProfileImageUrl: string | null;
  lastMessage: string | null;
  lastMessageAtEpochMs: number | null;
  unreadCount: number;
}
