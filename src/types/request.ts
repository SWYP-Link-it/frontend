export type TabType = 'received' | 'sent';

// Enum 명세 반영: ExchangeStatus
export type RequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELED'
  | 'EXPIRED'
  | 'COMPLETED'
  | 'SETTLED';

export type ApiRequestItem = {
  skillExchangeId: number;
  targetUserId: number;
  skillId: number;
  chatRoomId: number | null;
  targetProfileImageUrl: string | null;
  targetNickname: string;
  skillName: string;
  exchangeStatus: string; // "대기중", "수락됨", "취소됨" 등 한글 응답
  creditPrice: number;
  message: string;
  requestedDate: string;
  exchangeDateTime: string;
  exchangeDuration: number;
  isNew: boolean;
};

export type SkillRequest = {
  id: number;
  partnerId: number;
  partnerNickname: string;
  partnerTag: string;
  partnerProfileImageUrl?: string | null;
  description: string;
  status: RequestStatus;
  sessionDate: string;
  sessionTime: string;
  credits: number;
  createdAt: string;
  isSentByMe: boolean;
};
