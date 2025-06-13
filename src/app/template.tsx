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
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/utils/fetch-api';
import Image from 'next/image';
import Title from '@/assets/title.png';

const SidebarTemplate: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pathname === '/public') return;

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

  if (pathname === '/login' || pathname === '/public') {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-row bg-black text-white">
      <Sidebar className="border-r-1 border-neutral-800 bg-neutral-950">
        <SidebarHeader>
          <h1 className="text-black font-bold text-2xl flex justify-center items-center">
            <Link href="/">
              <Image
                src={Title}
                alt="NetflixChecker"
                width={200}
                className="select-none"
              />
            </Link>
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
