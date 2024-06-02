'use client';

import { FC, PropsWithChildren } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { SidebarHeader } from '@/components/SidebarHeader';
import { SidebarList } from '@/components/SidebarList';
import { SidebarItem } from '@/components/SidebarItem';
import {
  faGrip,
  faMoneyBillTransfer,
  faReceipt,
  faSignOut
} from '@fortawesome/free-solid-svg-icons';
import { Divider } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarTemplate: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-row">
      <Sidebar className="border-r-1 border-gray-200">
        <SidebarHeader>
          <h1 className="text-black font-bold text-2xl text-center">
            <Link href="/public">NetflixChecker</Link>
          </h1>
        </SidebarHeader>
        <SidebarList>
          <Link href="/public" className="block">
            <SidebarItem icon={faGrip}>대시보드</SidebarItem>
          </Link>
          <Link href="/deposit" className="block">
            <SidebarItem icon={faMoneyBillTransfer}>입금자 관리</SidebarItem>
          </Link>
          <Link href="/log" className="block">
            <SidebarItem icon={faReceipt}>로그</SidebarItem>
          </Link>
          <Divider className="ml-6 w-60" />
          <SidebarItem icon={faSignOut}>로그아웃</SidebarItem>
        </SidebarList>
      </Sidebar>
      <div className="px-16 py-14">{children}</div>
    </div>
  );
};

export default SidebarTemplate;
