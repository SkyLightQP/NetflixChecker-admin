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

export const AppSidebar = () => {
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
                <SidebarMenuButton className="cursor-pointer">
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
