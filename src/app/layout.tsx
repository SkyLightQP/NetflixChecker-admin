import '@/style/global.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Providers } from '@/app/providers';
import { pretendard } from '@/font';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';
import { cn } from '@/utils/cn';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'NetflixChecker Admin',
  description: 'Admin page(private) of NetflixChecker'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, 'text-white dark')}>
        <Providers>
          <div className="w-full min-h-screen bg-gray-50">{children}</div>
          <ToastContainer position="top-right" />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
