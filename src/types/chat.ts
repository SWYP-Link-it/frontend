// src/types/chat.ts (없으면 만드셔도 됩니다)

export interface ChatMessage {
  roomId: number;
  messageId: number;
  senderId: number;
  senderRole: 'MENTOR' | 'MENTEE';
  text: string;
  sentAtEpochMs: number; // 시간값 (new Date(sentAtEpochMs)로 변환해서 사용)
  system: boolean; // true면 시스템 메시지(입장/퇴장 등)
}
