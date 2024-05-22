import '@/style/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { pretendard } from '@/font';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FC, PropsWithChildren } from 'react';
import { SidebarLayout } from '@/app/SidebarLayout';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'NetflixChecker Admin',
  description: 'Admin page(private) of NetflixChecker'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <Providers>
          <SidebarLayout>{children}</SidebarLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
