import { FC, PropsWithChildren } from 'react';

export const SidebarHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className="pt-14 pb-16">{children}</div>;
};
