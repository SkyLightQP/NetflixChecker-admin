'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/fetch-api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Page: FC = () => {
  const router = useRouter();

  const login = async (formData: FormData) => {
    const rawFormData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    const { ok, json } = await api<{ message: string; error: string }>(
      '/auth/login',
      'POST',
      rawFormData
    );

    if (!ok && json !== null) {
      toast.error(json.message || json.error);
      return;
    }

    router.push('/');
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <form action={login} className="flex flex-col items-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>NetflixChecker</CardTitle>
            <CardDescription>로그인하기</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="foobar@acme.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">비밀번호</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="cursor-pointer">
              로그인
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default Page;
