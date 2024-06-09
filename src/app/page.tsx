import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SectionTitle } from '@/components/Paragraph/SectionTitle';
import { getDashboardMetrics } from '@/actions/dashboard-metrics.action';
import { SUBSCRIBE_COST } from '@/constants/dashboard.constant';

const Page = async () => {
  const {
    depositCount,
    depositLatest,
    codeCount,
    crawlingStatus,
    crawlingLatest
  } = await getDashboardMetrics();

  return (
    <>
      <SectionTitle>대시보드</SectionTitle>
      <DashboardHeader cost={SUBSCRIBE_COST} />
      <div className="space-y-5">
        <div className="flex flex-row space-x-4">
          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <p className="text-tiny uppercase font-bold">5월</p>
              <h4 className="font-bold text-large">입금 현황</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">{depositCount} / 3</p>
            </CardBody>
          </Card>

          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <p className="text-tiny uppercase font-bold">5월</p>
              <h4 className="font-bold text-large">최근 입금자</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">{depositLatest}</p>
            </CardBody>
          </Card>

          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <p className="text-tiny uppercase font-bold">5월</p>
              <h4 className="font-bold text-large">인증코드 발급 회수</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">{codeCount} 번</p>
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-row space-x-4">
          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <h4 className="font-bold text-large">최근 크롤링 성공 여부</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">{crawlingStatus}</p>
            </CardBody>
          </Card>

          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <h4 className="font-bold text-large">최근 크롤링 시각</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">{crawlingLatest}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
