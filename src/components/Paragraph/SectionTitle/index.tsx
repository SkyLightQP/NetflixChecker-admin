import { FC, PropsWithChildren } from 'react';

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h1 className="font-bold text-3xl mb-8">{children}</h1>;
};
