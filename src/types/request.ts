export type TabType = 'received' | 'sent';
export type RequestStatus = 'pending' | 'accepted' | 'rejected';

export type SkillRequest = {
  id: string;
  userName: string;
  userTag: string;
  description: string;
  date: string;
  time: string;
  skillTradeTime: string;
  credits: number;
  status: RequestStatus;
};
