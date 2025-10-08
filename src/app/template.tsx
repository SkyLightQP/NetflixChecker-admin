'use client';

import { FC, PropsWithChildren, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { api } from '@/lib/fetch-api';
import { AppSidebar } from '@/components/AppSidebar';
import { Header } from '@/components/Header';

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

  if (pathname === '/login' || pathname === '/public') {
    return <>{children}</>;
  }

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)'
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <Header title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-7 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarTemplate;
