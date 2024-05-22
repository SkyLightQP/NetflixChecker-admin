import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, PropsWithChildren } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface SidebarItemProps {
  readonly icon: IconProp;
}

export const SidebarItem: FC<PropsWithChildren<SidebarItemProps>> = ({
  children,
  icon
}) => {
  return (
    <li className="text-black font-bold text-lg py-3 px-6 mx-4 hover:bg-gray-950 hover:text-white rounded-lg cursor-pointer transition">
      <FontAwesomeIcon icon={icon} className="mr-2" /> {children}
    </li>
  );
};
