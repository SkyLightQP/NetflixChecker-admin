import {
  BanknoteArrowUpIcon,
  LayoutDashboardIcon,
  ScrollTextIcon,
  Settings2Icon
} from 'lucide-react';

export const SIDEBAR_MENUS = [
  {
    name: '대시보드',
    icon: LayoutDashboardIcon,
    path: '/'
  },
  {
    name: '입금 관리',
    icon: BanknoteArrowUpIcon,
    path: '/deposit'
  },
  {
    name: '로그',
    icon: ScrollTextIcon,
    path: '/log'
  },
  {
    name: '설정',
    icon: Settings2Icon,
    path: '/settings'
  }
];
