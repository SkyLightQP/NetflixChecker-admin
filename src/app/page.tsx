'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BanknoteIcon,
  BinaryIcon,
  CalendarIcon,
  CircleCheckIcon,
  PersonStandingIcon,
  UserIcon
} from 'lucide-react';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  PAYMENT_DAYS,
  SUBSCRIBE_COST,
  TOTAL_PEOPLE
} from '@/constants/dashboard.constant';
import { formatNumber } from '@/lib/utils';
import { getDashboardMetrics } from '@/actions/dashboard-metrics.action';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const Page = () => {
  const [metrics, setMetrics] = useState({
    depositCount: 0,
    depositLatest: '',
    codeCount: 0,
    codeCountByMonth: 0,
    crawlingStatus: '',
    crawlingLatest: ''
  });
  const [loading, setLoading] = useState(true);
  const month = new Date().getMonth() + 1;

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getDashboardMetrics();
        setMetrics({
          depositCount: data.depositCount || 0,
          depositLatest: data.depositLatest || '',
          codeCount: data.codeCount || 0,
          codeCountByMonth: data.codeCountByMonth || 0,
          crawlingStatus: data.crawlingStatus || '',
          crawlingLatest: data.crawlingLatest || ''
        });
        setLoading(false);
      } catch {
        toast.error('대시보드를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <>
        <Alert className="text-lg [&>svg]:size-6">
          <BanknoteIcon />
          <AlertTitle className="ml-0.5">
            <p>&nbsp;</p>
          </AlertTitle>
        </Alert>

        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
          {Array.from({ length: 3 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card className="@container/card" key={`skeleton-card-${index}`}>
              <CardHeader>
                <CardDescription className="flex items-center">
                  <Skeleton className="h-4 w-full max-w-[300px]" />
                </CardDescription>
                <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
                  <Skeleton className="h-4 w-full max-w-[400px]" />
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  <Skeleton className="h-4 w-full max-w-[100px]" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <Alert className="text-lg [&>svg]:size-6">
        <BanknoteIcon />
        <AlertTitle className="ml-0.5">
          1개월 당 구독 요금은{' '}
          <span className="tabular-nums">{formatNumber(SUBSCRIBE_COST)}</span>{' '}
          원 입니다.
        </AlertTitle>
      </Alert>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center">
              <UserIcon className="size-4 mr-0.5" />
              입금자 수
            </CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
              {metrics.depositCount} / {TOTAL_PEOPLE} 명
            </CardTitle>
            <CardAction>
              <Badge variant="outline">{month}월</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              정기 결제일은 {PAYMENT_DAYS} 일 입니다.
            </div>
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center">
              <PersonStandingIcon className="size-4 mr-0.5" />
              최근 입금자
            </CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
              {metrics.depositLatest}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">{month}월</Badge>
            </CardAction>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center">
              <BinaryIcon className="size-4 mr-0.5" />
              인증코드 발급 회수
            </CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
              {metrics.codeCountByMonth} 번
            </CardTitle>
            <CardAction>
              <Badge variant="outline">{month}월</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              전체 인증코드 발급 회수 : {metrics.codeCount} 번
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center">
              <CircleCheckIcon className="size-4 mr-0.5" />
              최근 크롤링 상태
            </CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
              <Badge className="text-sm">
                {metrics.crawlingStatus === 'O' ? '성공' : '실패'}
              </Badge>
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center">
              <CalendarIcon className="size-4 mr-0.5" />
              최근 크롤링 시각
            </CardDescription>
            <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
              {metrics.crawlingLatest}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Page;
