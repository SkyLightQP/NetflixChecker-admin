import { FC, HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface DashboardHeaderProps {
  readonly cost: number;
}

export const DashboardHeader: FC<
  HTMLAttributes<HTMLDivElement> & DashboardHeaderProps
> = ({ cost, className }) => {
  return (
    <div className={cn('mb-8', className)}>
      <h2 className="text-2xl">
        현재 1개월 당 구독 요금은{' '}
        <span className="font-bold">{cost.toLocaleString('ko-KR')} 원</span>{' '}
        입니다.
      </h2>
      <p className="text-lg text-neutral-400">
        아래에서 요약 정보를 확인하세요.
      </p>
    </div>
  );
};
