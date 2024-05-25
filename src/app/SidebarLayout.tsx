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

export const SidebarLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-row">
      <Sidebar>
        <SidebarHeader>
          <h1 className="text-black font-bold text-2xl text-center">
            NetflixChecker
          </h1>
        </SidebarHeader>
        <SidebarList>
          <SidebarItem icon={faGrip}>대시보드</SidebarItem>
          <SidebarItem icon={faMoneyBillTransfer}>입금자 관리</SidebarItem>
          <SidebarItem icon={faReceipt}>로그</SidebarItem>
          <Divider className="ml-6 w-60" />
          <SidebarItem icon={faSignOut}>로그아웃</SidebarItem>
        </SidebarList>
      </Sidebar>
      <div className="px-16 py-14">{children}</div>
    </div>
  );
};
