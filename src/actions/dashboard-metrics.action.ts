'use server';

import { api } from '@/utils/fetch-api';

export const getDashboardMetrics = async () => {
  const { json: depositCount } = await api('/metrics/deposit/count', 'GET');
  const { json: depositLatest } = await api('/metrics/deposit/latest', 'GET');
  const { json: codeCount } = await api('/metrics/code/count', 'GET');
  const { json: crawlingStatus } = await api('/metrics/crawling/status', 'GET');
  const { json: crawlingLatest } = await api('/metrics/crawling/latest', 'GET');

  return {
    depositCount: depositCount.result,
    depositLatest: depositLatest.result,
    codeCount: codeCount.result,
    crawlingStatus: crawlingStatus.result,
    crawlingLatest: crawlingLatest.result
  };
};
