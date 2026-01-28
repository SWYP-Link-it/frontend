const BASE_MENU_ITEMS = [
  { name: '홈', path: '/', requiredAuth: false },
  { name: '게시판', path: '/skills', requiredAuth: false },
  { name: '요청 관리', path: '/requests', requiredAuth: true },
  { name: '메세지', path: '/messages', requiredAuth: true },
];

export const LOGGED_IN_MENU_ITEMS = [
  ...BASE_MENU_ITEMS,
  { name: '프로필', path: '/profile', requiredAuth: true },
];

export const LOGGED_OUT_MENU_ITEMS = [
  ...BASE_MENU_ITEMS,
  { name: '로그인', path: '/login', requiredAuth: false },
];
