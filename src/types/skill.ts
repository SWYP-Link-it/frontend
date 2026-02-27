export type SkillCardDto = {
  skillId: number;
  profileImageUrl: string;
  nickname: string;
  skillTitle: string;
  skillName: string;
  avgRating: number;
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
    skillCategoryType: Exclude<Category, 'ALL'>;
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
  userAvgRating: number;
  skillRating: {
    avgRating: number;
    star1Percentage: number;
    star2Percentage: number;
    star3Percentage: number;
    star4Percentage: number;
    star5Percentage: number;
  };
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

export type SkillReviewDto = {
  reviewId: number;
  reviewerNickname: string;
  skillName: string;
  content: string;
  rating: number;
  createdDateTime: Date;
};

export type SkillInfo = {
  nickname: string;
  skillId: number;
  skillName: string;
  exchangeDuration: number;
  creditPrice: number;
  skillCategoryType: Exclude<Category, 'ALL'>;
};
