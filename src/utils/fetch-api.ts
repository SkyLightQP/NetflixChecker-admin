export const api = async <T>(
  path: string,
  method: string,
  body?: Record<string, unknown>,
  options?: Record<string, unknown>,
  token?: string
): Promise<{ ok: boolean; json: T | null }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    signal: AbortSignal.timeout(1000 * 3),
    credentials: 'include',
    cache: 'no-cache',
    body: JSON.stringify(body),
    ...options
  });

  let json;
  try {
    json = await response.json();
  } catch (e) {
    json = null;
  }

  return {
    ok: response.ok,
    json
  };
};
