'use client';

import { FC } from 'react';
import { Button, Input, Spacer } from '@heroui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/utils/fetch-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Title from '@/assets/title.png';

const Page: FC = () => {
  const router = useRouter();

  const login = async (formData: FormData) => {
    const rawFormData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    const { ok, json } = await api<{ message: string }>(
      '/auth/login',
      'POST',
      rawFormData
    );
    if (!ok && json !== null) {
      toast(json.message);
      return;
    }

    router.push('/');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl flex items-center flex-col space-y-1">
          <FontAwesomeIcon icon={faScrewdriverWrench} size="sm" />
          <Image src={Title} alt="NetflixChecker" width={240} />
        </h1>
        <Spacer y={6} />
        <form action={login} className="flex flex-col items-center">
          <Input className="w-80" type="email" label="이메일" name="email" />
          <Spacer y={4} />
          <Input
            className="w-80"
            type="password"
            label="비밀번호"
            name="password"
          />
          <Spacer y={4} />
          <Button type="submit" color="primary" className="w-60">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
