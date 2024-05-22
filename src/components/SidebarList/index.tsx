import { FC, PropsWithChildren } from 'react';

export const SidebarList: FC<PropsWithChildren> = ({ children }) => {
  return <ul className="space-y-4">{children}</ul>;
};
