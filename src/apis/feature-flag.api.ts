import { api } from '@/lib/fetch-api';

export const getAllFeatureFlags = async () => {
  const { json } = await api<{ result: Record<string, string> | undefined }>(
    '/feature-flag',
    'GET'
  );
  return json?.result;
};

export const setFeatureFlag = async (key: string, value: string) => {
  const { ok } = await api(`/feature-flag`, 'POST', { key, value });

  if (!ok) {
    throw new Error('Failed to save feature flag');
  }
};
