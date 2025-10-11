'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/fetch-api';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RefreshCwIcon } from 'lucide-react';
import { toast } from 'sonner';

const Page: FC = () => {
  const [logs, setLogs] = useState<string[]>(['로그가 없습니다.']);
  const logRef = useRef<HTMLTextAreaElement | null>(null);

  const fetchData = useCallback(async () => {
    const { json } = await api<{ result: string[] }>('/metrics/logs', 'GET');
    if (json !== null) {
      setLogs(json.result);

      if (logRef.current) {
        logRef.current.scrollTop = logRef.current.scrollHeight;
      }
    }
  }, []);

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  return (
    <>
      <div className="flex justify-end">
        <Button
          className="cursor-pointer"
          onClick={() => {
            fetchData().then(() => toast.success('로그 새로고침 완료'));
          }}
        >
          <RefreshCwIcon />
          <span>새로고침</span>
        </Button>
      </div>
      <Textarea
        ref={logRef}
        className="h-[calc(100vh-20rem)] overflow-auto disabled:text-black disabled:opacity-100"
        value={logs.join('\n')}
        disabled
      />
    </>
  );
};

export default Page;
