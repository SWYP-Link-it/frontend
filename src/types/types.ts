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
