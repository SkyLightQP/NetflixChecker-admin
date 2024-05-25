import { FC, HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

export const SectionTitle: FC<
  PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>
> = ({ children, className }) => {
  return (
    <h1 className={cn('font-bold text-3xl mb-8', className)}>{children}</h1>
  );
};
