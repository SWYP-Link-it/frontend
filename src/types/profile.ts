import { Category } from './skill';

export type SkillProficiency = 'LOW' | 'MEDIUM' | 'HIGH';
export type ExchangeType = 'ONLINE' | 'OFFLINE' | 'BOTH' | null;

export interface UserSkill {
  id: number;
  skillCategoryType: Exclude<Category, 'ALL'>;
  skillCategoryName: string;
  skillName: string;
  skillTitle: string;
  skillProficiency: SkillProficiency;
  skillDescription: string;
  exchangeDuration: number;
  viewCount: number;
  isVisible: boolean;
  imageUrls: string[];
}

export interface AvailableSchedule {
  id?: number;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export interface ProfileData {
  id?: number;
  userId?: number;
  nickname: string;
  experienceDescription: string;
  timesTaught: number;
  exchangeType: ExchangeType;
  preferredRegion: string;
  detailedLocation: string;
  skills: UserSkill[];
  availableSchedules: AvailableSchedule[];
}

export interface DaySelectorProps {
  selectedDays: string[];
  onChange: (days: string[]) => void;
}
export type SkillData = {
  skillCategoryType?: string;
  category?: string;
  skillName?: string;
  name?: string;
  skillProficiency?: string;
  proficiency?: string;
  skillTitle?: string;
  title?: string;
  skillDescription?: string;
  description?: string;
  exchangeDuration?: number;
  imageUrls?: string[];
  imageFiles?: File[];
  // [key: string]: unknown;
};

export type SkillFormData = {
  category: string;
  name: string;
  proficiency: 'LOW' | 'MEDIUM' | 'HIGH';
  exchangeDuration: number;
  title: string;
  description: string;
  existingImages: string[];
  newFiles: File[];
};

export type CreditTransactionType =
  | 'CANCEL'
  | 'REQUEST'
  | 'REJECT'
  | 'REWARD'
  | 'COMPLETED';

export type CreditStatusLabel = '리워드' | '요청' | '취소' | '거절' | '정산';

export interface CreditTransaction {
  creditHistoryId: number;
  targetNickname: string | null;
  contentName: string;
  createdAt: string;
  statusLabel: CreditStatusLabel;
  changeAmount: number;
  targetProfileImageUrl?: string | null;
  skillId?: number | null;
}
