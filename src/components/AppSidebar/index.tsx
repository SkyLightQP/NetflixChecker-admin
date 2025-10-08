'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { AppSidebarHeader } from '@/components/AppSidebarHeader';
import { SIDEBAR_MENUS } from '@/constants/sidebar.constant';
import { LogOutIcon } from 'lucide-react';
import { api } from '@/lib/fetch-api';
import { useRouter } from 'next/navigation';

export const AppSidebar = () => {
  const router = useRouter();

  const onLogoutClick = async () => {
    const { ok } = await api('/auth/logout', 'DELETE');
    if (ok) {
      router.push('/login');
    }
  };

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {SIDEBAR_MENUS.map((menu) => (
                <SidebarMenuItem key={`${menu.name}-${menu.path}`}>
                  <SidebarMenuButton
                    tooltip={menu.name}
                    className="cursor-pointer"
                  >
                    <menu.icon />
                    <span>{menu.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="cursor-pointer"
                  onClick={onLogoutClick}
                >
                  <LogOutIcon />
                  <span>로그아웃</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
