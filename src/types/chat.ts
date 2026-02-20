export type ApiResponse<T> = {
  success: boolean;
  code: string | null;
  message: string;
  data: T;
};

export type ChatRoomDetail = {
  roomId: number;
  mentorId: number;
  menteeId: number;
  status: 'ACTIVE' | 'CLOSED';
  partnerId: number;
  partnerNickname: string;
  partnerProfileImageUrl: string | null;
  lastMessageId: number | null;
  lastMessageContent: string | null;
  lastMessageAtEpochMs: number | null;
  unreadCount: number;
  unreadMentorCount: number;
  unreadMenteeCount: number;
  createdAtEpochMs: number;
  modifiedAtEpochMs: number;
};

export type ChatMessage = {
  messageId: number;
  roomId: number;
  senderId: number;
  senderRole: 'MENTOR' | 'MENTEE';
  content: string;
  fileUrl?: string | null;
  createdAtEpochMs: number;
  isMine: boolean;
};

export interface ChatRoomListItem {
  roomId: number;
  mentorId: number;
  menteeId: number;
  status: string;
  partnerId: number;
  partnerNickname: string;
  partnerProfileImageUrl: string | null;
  lastMessageId: number | null;
  lastMessageContent: string | null;
  lastMessageAtEpochMs: number | null;
  unreadCount: number;
  createdAtEpochMs: number;
  modifiedAtEpochMs: number;
}
