import { FC } from 'react';
import { SectionTitle } from '@/components/Paragraph/SectionTitle';
import { Code } from '@nextui-org/code';

const Page: FC = () => {
  return (
    <>
      <SectionTitle>로그</SectionTitle>
      <Code className="w-[calc(100vw-26rem)]">
        <p>준비중</p>
      </Code>
    </>
  );
};

export default Page;
