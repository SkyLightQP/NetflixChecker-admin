import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, LiHTMLAttributes, PropsWithChildren } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { cn } from '@/utils/cn';

interface SidebarItemProps {
  readonly icon: IconProp;
}

/* eslint-disable react/jsx-props-no-spreading */
export const SidebarItem: FC<
  PropsWithChildren<LiHTMLAttributes<never> & SidebarItemProps>
> = ({ children, icon, className, ...props }) => {
  return (
    <li
      className={cn(
        className,
        'text-black font-bold text-lg py-3 px-6 mx-4 hover:bg-gray-950 hover:text-white rounded-lg cursor-pointer transition'
      )}
      {...props}
    >
      <FontAwesomeIcon icon={icon} className="w-8 mr-2" /> {children}
    </li>
  );
};
