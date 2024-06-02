import { FC } from 'react';
import { Button, Input, Spacer } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

const Page: FC = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl">
          <FontAwesomeIcon icon={faScrewdriverWrench} size="sm" />
          &nbsp;관리자 페이지
        </h1>
        <Spacer y={6} />
        <Input className="w-80" type="email" label="이메일" />
        <Spacer y={4} />
        <Input className="w-80" type="password" label="비밀번호" />
        <Spacer y={4} />
        <Button color="primary" className="w-60">
          로그인
        </Button>
      </div>
    </div>
  );
};

export default Page;
