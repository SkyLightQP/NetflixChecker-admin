import { FC, PropsWithChildren } from 'react';

export const SidebarHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div className="pt-10 pb-16">{children}</div>;
};
