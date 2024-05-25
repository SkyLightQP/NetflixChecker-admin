import { FC, PropsWithChildren } from 'react';

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return <div className="h-screen min-w-72 bg-white">{children}</div>;
};
