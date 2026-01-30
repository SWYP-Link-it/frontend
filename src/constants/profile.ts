// UI에서 사용하는 고정 불변 상수들
export const CATEGORIES = [
  'IT·개발',
  '디자인·크리에이티브',
  '영상·사진·편집',
  '마케팅·콘텐츠',
  '커리어·취업',
  '외국어',
  '대학·전공',
  '재테크·경제',
  '운동',
  '음악',
  '기타',
];

export const PROFICIENCY_LEVELS = [
  { label: '상', desc: '네이티브 수준이에요', value: '상' },
  { label: '중', desc: '능숙하게 활용 가능해요', value: '중' },
  { label: '하', desc: '기초적인 수준이에요', value: '하' },
] as const;

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
