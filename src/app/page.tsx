import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { DashboardHeader } from '@/components/DashboardHeader';
import { SectionTitle } from '@/components/Paragraph/SectionTitle';

const Home = () => {
  return (
    <>
      <SectionTitle>대시보드</SectionTitle>
      <DashboardHeader cost={10000} />
      <div className="space-y-5">
        <div className="flex flex-row space-x-4">
          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <p className="text-tiny uppercase font-bold">5월</p>
              <h4 className="font-bold text-large">입금 현황</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">0 / 4</p>
            </CardBody>
          </Card>

          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <p className="text-tiny uppercase font-bold">5월</p>
              <h4 className="font-bold text-large">최근 입금자</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">홍길동 (4,250 원)</p>
            </CardBody>
          </Card>

          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <p className="text-tiny uppercase font-bold">5월</p>
              <h4 className="font-bold text-large">인증코드 발급 회수</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">4 번</p>
            </CardBody>
          </Card>
        </div>

        <div className="flex flex-row space-x-4">
          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <h4 className="font-bold text-large">최근 크롤링 성공 여부</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">X</p>
            </CardBody>
          </Card>

          <Card className="w-60 p-2">
            <CardHeader className="pb-0 pt-2 flex-col items-start">
              <h4 className="font-bold text-large">최근 크롤링 시각</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
              <p className="text-lg">2024. 01. 01. 12:02</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
