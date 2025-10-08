import '@/style/global.css';

import type { Metadata } from 'next';
import { pretendard } from '@/font';
import { FC, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'NetflixChecker Admin',
  description: 'Admin page(private) of NetflixChecker'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className)}>
        <div className="w-full min-h-screen bg-gray-50">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
