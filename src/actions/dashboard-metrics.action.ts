'use server';

import { api } from '@/utils/fetch-api';

export const getDashboardMetrics = async () => {
  const { json: depositCount } = await api<{ result: number }>(
    '/metrics/deposit/count',
    'GET'
  );
  const { json: depositLatest } = await api<{ result: string }>(
    '/metrics/deposit/latest',
    'GET'
  );
  const { json: codeCount } = await api<{ result: number }>(
    '/metrics/code/count',
    'GET'
  );
  const { json: crawlingStatus } = await api<{ result: string }>(
    '/metrics/crawling/status',
    'GET'
  );
  const { json: crawlingLatest } = await api<{ result: string }>(
    '/metrics/crawling/latest',
    'GET'
  );

  return {
    depositCount: depositCount?.result,
    depositLatest: depositLatest?.result,
    codeCount: codeCount?.result,
    crawlingStatus: crawlingStatus?.result,
    crawlingLatest: crawlingLatest?.result
  };
};
