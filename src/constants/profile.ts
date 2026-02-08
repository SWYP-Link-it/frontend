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
      { start: '00:00', end: '00:30' },
      { start: '00:30', end: '01:00' },
      { start: '01:00', end: '01:30' },
      { start: '01:30', end: '02:00' },
      { start: '02:00', end: '02:30' },
      { start: '02:30', end: '03:00' },
      { start: '03:00', end: '03:30' },
      { start: '03:30', end: '04:00' },
      { start: '04:00', end: '04:30' },
      { start: '04:30', end: '05:00' },
      { start: '05:00', end: '05:30' },
      { start: '05:30', end: '06:00' },
    ],
  },
  {
    label: '오전 06시 ~ 11시',
    slots: [
      { start: '06:00', end: '06:30' },
      { start: '06:30', end: '07:00' },
      { start: '07:00', end: '07:30' },
      { start: '07:30', end: '08:00' },
      { start: '08:00', end: '08:30' },
      { start: '08:30', end: '09:00' },
      { start: '09:00', end: '09:30' },
      { start: '09:30', end: '10:00' },
      { start: '10:00', end: '10:30' },
      { start: '10:30', end: '11:00' },
      { start: '11:00', end: '11:30' },
      { start: '11:30', end: '12:00' },
    ],
  },
  {
    label: '오후 12시 ~ 17시',
    slots: [
      { start: '12:00', end: '12:30' },
      { start: '12:30', end: '13:00' },
      { start: '13:00', end: '13:30' },
      { start: '13:30', end: '14:00' },
      { start: '14:00', end: '14:30' },
      { start: '14:30', end: '15:00' },
      { start: '15:00', end: '15:30' },
      { start: '15:30', end: '16:00' },
      { start: '16:00', end: '16:30' },
      { start: '16:30', end: '17:00' },
      { start: '17:00', end: '17:30' },
      { start: '17:30', end: '18:00' },
    ],
  },
  {
    label: '오후 18시 ~ 24시',
    slots: [
      { start: '18:00', end: '18:30' },
      { start: '18:30', end: '19:00' },
      { start: '19:00', end: '19:30' },
      { start: '19:30', end: '20:00' },
      { start: '20:00', end: '20:30' },
      { start: '20:30', end: '21:00' },
      { start: '21:00', end: '21:30' },
      { start: '21:30', end: '22:00' },
      { start: '22:00', end: '22:30' },
      { start: '22:30', end: '23:00' },
      { start: '23:00', end: '23:30' },
      { start: '23:30', end: '00:00' },
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
