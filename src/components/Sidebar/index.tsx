import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export const Sidebar: FC<PropsWithChildren<HTMLAttributes<HTMLDivElement>>> = ({
  children,
  className
}) => {
  return (
    <div className={cn('h-screen min-w-72 bg-white', className)}>
      {children}
    </div>
  );
};
