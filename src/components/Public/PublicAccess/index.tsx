'use client';

import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { addToast, Button, Input, Spacer } from '@heroui/react';
import { api } from '@/utils/fetch-api';

interface PublicAccessProps {
  readonly setLogin: (isLogin: boolean) => void;
}

export const PublicAccess: FC<PublicAccessProps> = ({ setLogin }) => {
  const login = async (formData: FormData) => {
    const rawFormData = {
      password: formData.get('password')
    };

    const { ok, json } = await api<unknown>(
      '/auth/public/login',
      'POST',
      rawFormData
    );
    if (!ok && json !== null) {
      addToast({
        title: (json as { message: string }).message,
        color: 'warning'
      });
      return;
    }

    setLogin(true);
    window.localStorage.setItem(
      'NetflixChecker_Public',
      (json as { token: string }).token
    );
  };

  return (
    <>
      <h1 className="font-bold text-3xl">
        <FontAwesomeIcon icon={faFilm} size="sm" />
        &nbsp;
      </h1>
      <Spacer y={6} />
      <form action={login} className="flex flex-col items-center">
        <Input
          className="w-80"
          type="password"
          label="비밀번호"
          name="password"
        />
        <Spacer y={4} />
        <Button type="submit" color="primary" className="w-full">
          들어가기
        </Button>
      </form>
    </>
  );
};
