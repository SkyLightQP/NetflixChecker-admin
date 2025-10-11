'use client';

import { FC } from 'react';
import { api } from '@/lib/fetch-api';
import { toast } from 'sonner';
import { FilmIcon, KeyRoundIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
      toast.warning((json as { message: string }).message);
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
      <h1 className="font-bold text-3xl flex space-x-0.5 mb-5">
        <FilmIcon />
        <KeyRoundIcon />
      </h1>
      <form action={login} className="grid gap-2">
        <Input
          className="w-80"
          type="password"
          name="password"
          placeholder="비밀번호"
        />
        <Button type="submit" color="primary" className="w-full cursor-pointer">
          들어가기
        </Button>
      </form>
    </>
  );
};
