import { FC } from 'react';
import { Metadata } from 'next';
import Page from './page';

export const metadata: Metadata = {
  title: '인증코드 확인하기'
};

const Layout: FC = () => {
  return <Page />;
};

export default Layout;
