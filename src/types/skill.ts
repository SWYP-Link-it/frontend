export type SkillCardDto = {
  skillId: number;
  profileImageUrl: string;
  nickname: string;
  skillTitle: string;
  skillName: string;
};

export type Skill = {
  id: number;
  category: string;
  title: string;
  description: string;
  credit: number;
  rate?: number;
  profile: Profile;
  level: '하' | '중' | '상';
  portfolioUrls: string[];
  reviews: Review[];
};

export type Profile = {
  id: number;
  nickname: string;
  experience: string;
  teachCnt: number;
  rate?: number;
  mode: 'online' | 'offline' | 'all';
  region: string;
  time: string[];
};

export type Review = {
  id: number;
  reviewerNickname: string;
  content: string;
  rating: number;
};

export const CATEGORIES = [
  'ALL',
  'DEVELOPMENT',
  'DESIGN',
  'EDITING',
  'MARKETING',
  'LANGUAGE',
  'FINANCE',
  'SPORTS',
  'MUSIC',
  'ETC',
] as const;

export type Category = (typeof CATEGORIES)[number];

export type SkillDetailDto = {
  userId: number;
  profileImageUrl: string;
  nickname: string;
  mainSkill: {
    id: number;
    skillCategoryType: Category;
    skillCategoryName: string;
    skillName: string;
    skillTitle: string;
    skillProficiency: 'HIGH' | 'MEDIUM' | 'LOW';
    skillDescription: string;
    exchangeDuration: number;
    viewCount: number;
    isVisible: boolean;
    imageUrls: string[];
  };
  profileId: number;
  experienceDescription: string;
  timesTaught: number;
  exchangeType: 'ONLINE' | 'OFFLINE' | 'BOTH';
  preferredRegion:
    | 'SEOUL'
    | 'GYEONGGI'
    | 'GANGWON'
    | 'CHUNGCHEONG'
    | 'GYEONGSANG'
    | 'JEOLLA'
    | 'JEJU';
  detailedLocation: string;
  availableSchedules: {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
  }[];
  skills: {
    skillId: number;
    skillName: string;
  }[];
};
