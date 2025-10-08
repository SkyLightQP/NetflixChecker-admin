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

const Page = async () => {
  // TODO: Using API in metrics.

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
              2 / {TOTAL_PEOPLE} 명
            </CardTitle>
            <CardAction>
              <Badge variant="outline">10월</Badge>
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
              홍길동 (1,000 원)
            </CardTitle>
            <CardAction>
              <Badge variant="outline">10월</Badge>
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
              10 번
            </CardTitle>
            <CardAction>
              <Badge variant="outline">10월</Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              전체 인증코드 발급 회수 : 20 번
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
              <Badge className="text-sm">성공</Badge>
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
              2025-01-01 00:00:00
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </>
  );
};

export default Page;
