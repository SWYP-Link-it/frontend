export type TabType = 'received' | 'sent';

export type RequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'pending'
  | 'accepted'
  | 'rejected';

export interface SkillRequest {
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
}
