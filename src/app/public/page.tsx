'use client';

import { FC, useState } from 'react';
import { PublicAccess } from '@/components/Public/PublicAccess';
import { PublicVerify } from '@/components/Public/PublicVerify';

const Page: FC = () => {
  const [isLogin, setLogin] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-center items-center lg:bg-neutral-950 bg-black pb-10">
      <div className="w-[390px] h-screen bg-black flex flex-col items-center justify-center">
        {isLogin ? <PublicVerify /> : <PublicAccess setLogin={setLogin} />}
      </div>
    </div>
  );
};

export default Page;
