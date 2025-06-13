'use client';

import { HeroUIProvider } from '@heroui/react';
import { FC, PropsWithChildren } from 'react';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return <HeroUIProvider> {children}</HeroUIProvider>;
};
