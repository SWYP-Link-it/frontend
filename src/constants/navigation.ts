import { HomeIcon } from '../components/icons/HomeIcon';
import { MessageIcon } from '../components/icons/MessageIcon';
import { RequestIcon } from '../components/icons/RequestIcon';
import { SkillIcon } from '../components/icons/SkillIcon';
import { UserIcon } from '../components/icons/UserIcon';

const BASE_MENU_ITEMS = [
  { name: '홈', path: '/', requiredAuth: false, icon: HomeIcon },
  {
    name: '게시판',
    path: '/skills',
    requiredAuth: false,
    icon: SkillIcon,
  },
  {
    name: '요청 관리',
    path: '/requests',
    requiredAuth: true,
    icon: RequestIcon,
  },
  {
    name: '메세지',
    path: '/messages',
    requiredAuth: true,
    icon: MessageIcon,
  },
];

export const LOGGED_IN_MENU_ITEMS = [
  ...BASE_MENU_ITEMS,
  {
    name: '프로필',
    path: '/profile',
    requiredAuth: true,
    icon: UserIcon,
  },
];

export const LOGGED_OUT_MENU_ITEMS = [
  ...BASE_MENU_ITEMS,
  {
    name: '로그인',
    path: '/login',
    requiredAuth: false,
    icon: UserIcon,
  },
];
