export type SkillProficiency = 'LOW' | 'MEDIUM' | 'HIGH';
export type ExchangeType = 'ONLINE' | 'OFFLINE' | 'BOTH' | 'NONE';

export interface UserSkill {
  id: number;
  skillCategoryType: string;
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
