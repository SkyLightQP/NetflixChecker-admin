import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import Link from 'next/link';

export const AppSidebarHeader = () => {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            className="data-[slot=sidebar-menu-button]:!p-1.5"
            asChild
          >
            <Link href="/">
              <Image src={Logo} alt="NetflixChecker Logo" width={22} />
              <span className="text-base font-semibold">
                NetflixChecker Admin
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
