'use client';

import { FC } from 'react';
import { Button, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

const NotFound: FC = () => {
  const router = useRouter();

  return (
    <div className="h-full w-[calc(100vw-26rem)] flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-lg font-bold">존재하지 않는 페이지입니다</h1>
        <Spacer y={2} />
        <Button color="primary" onClick={() => router.back()}>
          돌아가기
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
