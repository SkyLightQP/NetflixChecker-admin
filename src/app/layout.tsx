import '@/style/global.css';

import type { Metadata } from 'next';
import { pretendard } from '@/font';
import { FC, PropsWithChildren } from 'react';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'NetflixChecker Admin',
  description: 'Admin page(private) of NetflixChecker'
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <div className="w-full min-h-screen bg-gray-50">{children}</div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
};

export default RootLayout;
