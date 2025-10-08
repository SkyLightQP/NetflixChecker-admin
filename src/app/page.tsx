import { getDashboardMetrics } from '@/actions/dashboard-metrics.action';

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
      <p>sad</p>
    </>
  );
};

export default Page;
