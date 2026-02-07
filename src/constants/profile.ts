// UI에서 사용하는 고정 불변 상수들
export const REGION_MAP: Record<string, string> = {
  서울: 'SEOUL',
  경기도: 'GYEONGGI',
  강원도: 'GANGWON',
  충청도: 'CHUNGCHEONG',
  경상도: 'GYEONGSANG',
  전라도: 'JEOLLA',
  제주도: 'JEJU',
};

export const WEEKDAY_MAP: Record<string, string> = {
  월: 'MON',
  화: 'TUE',
  수: 'WED',
  목: 'THU',
  금: 'FRI',
  토: 'SAT',
  일: 'SUN',
};

export const PROFICIENCY_MAP: Record<string, string> = {
  상: 'HIGH',
  중: 'MEDIUM',
  하: 'LOW',
};

export const SKILL_CATEGORY_MAP: Record<string, string> = {
  개발: 'DEVELOPMENT',
  디자인: 'DESIGN',
  편집: 'EDITING',
  마케팅: 'MARKETING',
  외국어: 'LANGUAGE',
  재테크: 'FINANCE',
  운동: 'SPORTS',
  음악: 'MUSIC',
  기타: 'ETC',
};

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const TIME_SECTIONS = [
  {
    label: '오전 00시 ~ 05시',
    slots: [
      '00:00',
      '00:30',
      '01:00',
      '01:30',
      '02:00',
      '02:30',
      '03:00',
      '03:30',
      '04:00',
      '04:30',
      '05:00',
      '05:30',
    ],
  },
  {
    label: '오전 06시 ~ 11시',
    slots: [
      '06:00',
      '06:30',
      '07:00',
      '07:30',
      '08:00',
      '08:30',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
    ],
  },
  {
    label: '오후 12시 ~ 17시',
    slots: [
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
    ],
  },
  {
    label: '오후 18시 ~ 24시',
    slots: [
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
      '22:00',
      '22:30',
      '23:00',
      '23:30',
    ],
  },
];
export const PROFICIENCY_OPTIONS = [
  {
    value: 'HIGH',
    label: '상',
    description: '실무 경험이 있으며, 노하우를 공유할 수 있어요.',
  },
  {
    value: 'MEDIUM',
    label: '중',
    description: '기본 기능을 이해하고, 간단한 작업이 가능해요.',
  },
  {
    value: 'LOW',
    label: '하',
    description: '기초 개념을 알고 있고, 배우면서 사용 중이에요.',
  },
];

export const EXCHANGE_TYPE_LABELS: Record<string, string> = {
  ONLINE: '온라인 가능',
  OFFLINE: '오프라인 가능',
  BOTH: '온라인 + 오프라인 가능',
};

export const REGION_LABELS: Record<string, string> = {
  SEOUL: '서울',
  GYEONGGI: '경기도',
  GANGWON: '강원도',
  CHUNGCHEONG: '충청도',
  GYEONGSANG: '경상도',
  JEOLLA: '전라도',
  JEJU: '제주도',
};

export const PROFICIENCY_LABELS: Record<string, string> = {
  HIGH: '상',
  MEDIUM: '중',
  LOW: '하',
};
