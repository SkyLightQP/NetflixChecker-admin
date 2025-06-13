'use client';

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <HeroUIProvider>
      <ToastProvider
        toastOffset={24}
        toastProps={{
          radius: 'md'
        }}
        placement="top-center"
      />
      {children}
    </HeroUIProvider>
  );
};
