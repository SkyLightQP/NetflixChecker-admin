export const api = async (
  path: string,
  method: string,
  body?: Record<string, unknown>,
  options?: Record<string, unknown>
): Promise<{ ok: boolean; json: any }> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body),
    ...options
  });
  const json = await response.json();

  return {
    ok: response.ok,
    json
  };
};
