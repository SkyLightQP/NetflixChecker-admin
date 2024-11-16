'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
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
import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/utils/fetch-api';

const SidebarTemplate: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { ok } = await api('/user/me', 'GET');
        if (!ok) {
          router.push('/login');
        }
      } catch (_) {
        router.push('/login');
      }
    };

    fetchData();
  }, []);

  const onLogoutClick = async () => {
    const { ok } = await api('/auth/logout', 'DELETE');
    if (ok) {
      router.push('/login');
    }
  };

  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-row">
      <Sidebar className="border-r-1 border-gray-200">
        <SidebarHeader>
          <h1 className="text-black font-bold text-2xl text-center">
            <Link href="/">NetflixChecker</Link>
          </h1>
        </SidebarHeader>
        <SidebarList>
          <Link href="/" className="block">
            <SidebarItem icon={faGrip}>대시보드</SidebarItem>
          </Link>
          <Link href="/deposit" className="block">
            <SidebarItem icon={faMoneyBillTransfer}>입금자 관리</SidebarItem>
          </Link>
          <Link href="/log" className="block">
            <SidebarItem icon={faReceipt}>로그</SidebarItem>
          </Link>
          <Divider className="ml-6 w-60" />
          <SidebarItem icon={faSignOut} onClick={onLogoutClick}>
            로그아웃
          </SidebarItem>
        </SidebarList>
      </Sidebar>
      <div className="px-16 py-14">{children}</div>
    </div>
  );
};

export default SidebarTemplate;
