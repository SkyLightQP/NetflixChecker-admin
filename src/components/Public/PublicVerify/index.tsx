'use client';

import { FC, useState } from 'react';
import { addToast, Button } from '@heroui/react';
import { api } from '@/utils/fetch-api';
import { cn } from '@/utils/cn';

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
      addToast({
        title: (json as { message: string }).message,
        color: 'warning'
      });
      return;
    }

    setCode(json as { link: string; text: string });
  };

  return (
    <>
      <p className="text-center text-lg font-semibold">
        넷플릭스에서
        <span className="bg-red-100 py-1 px-1.5 rounded-lg mx-1">
          이메일로 받기
        </span>
        를 누른 후
        <br />
        <span className="py-1 px-1.5 rounded-lg bg-blue-100 mx-1">
          시작하기
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
          color="primary"
          className={cn('w-80', !code && 'hidden')}
          as="a"
          href={code?.link}
        >
          완료하기
        </Button>
        <Button
          type="button"
          color={code ? 'default' : 'primary'}
          className="w-80"
          onPress={onStartClick}
          isDisabled={code !== undefined}
        >
          시작하기
        </Button>
      </div>
    </>
  );
};
