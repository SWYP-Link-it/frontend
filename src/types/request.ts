export type TabType = 'received' | 'sent';

// UI에서 사용하는 상태값 (영어)
export type RequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'pending'
  | 'accepted'
  | 'rejected';

// 백엔드 API가 주는 원본 데이터 타입 (Swagger 기준)
export type ApiRequestItem = {
  skillExchangeId: number; // ID
  targetUserId: number; // 상대방 ID
  skillId: number; // 스킬 ID
  chatRoomId: number | null; // 채팅방 ID (없으면 null일 수 있음)
  targetProfileImageUrl: string | null;
  targetNickname: string;
  skillName: string; // 상대방 스킬 (태그용)
  exchangeStatus: string; // "대기중", "수락됨" 등 한글로 올 가능성 있음
  creditPrice: number; // 크레딧
  message: string; // 요청 내용
  requestedDate: string; // 요청 날짜 "2024-01-20"
  exchangeDateTime: string; // 교환 일시 "2024-01-25T12:00:00"
  exchangeDuration: number; // 진행 시간(분) 60
  new: boolean;
};

// 프론트엔드 UI 컴포넌트용 타입 (기존 유지)
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
