'use client';

import { FC, useState } from 'react';
import { api } from '@/lib/fetch-api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const PublicVerify: FC = () => {
  const [code, setCode] = useState<
    { link: string; text: string } | undefined
  >();

  const onStartClick = async () => {
    const { ok, json } = await api<unknown>(
      '/public/code',
      'GET',
      undefined,
      undefined,
      window.localStorage.getItem('NetflixChecker_Public') || ''
    );
    if (!ok && json !== null) {
      toast.warning((json as { message: string }).message);
      return;
    }

    setCode(json as { link: string; text: string });
  };

  return (
    <>
      <p className="text-center text-lg font-semibold">
        넷플릭스에서
        <span className="bg-red-500 py-1 px-1.5 rounded-lg mx-1 text-white">
          이메일로 받기
        </span>
        를 누른 후
        <br />
        <span className="py-1 px-1.5 rounded-lg bg-black mx-1 text-white">
          인증하기
        </span>
        를 누르면 완료 버튼이 나와요.
      </p>
      {code && (
        <div className="flex justify-center mt-4">
          <p className="text-sm text-center text-gray-400">{code.text}</p>
        </div>
      )}
      <div className="space-y-2 flex justify-center flex-col mt-6">
        <Button
          type="button"
          className={cn('w-80 cursor-pointer', !code && 'hidden')}
          asChild
        >
          <a href={code?.link}>완료하기</a>
        </Button>
        <Button
          type="button"
          className="w-80 cursor-pointer"
          onClick={onStartClick}
          disabled={code !== undefined}
        >
          인증하기
        </Button>
      </div>
    </>
  );
};
