'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { SectionTitle } from '@/components/Paragraph/SectionTitle';
import { Code } from '@nextui-org/code';
import { Button } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/utils/fetch-api';

const Page: FC = () => {
  const [logs, setLogs] = useState<string[]>(['로그가 없습니다.']);

  const fetchData = useCallback(async () => {
    const { json } = await api<{ result: string[] }>('/metrics/logs', 'GET');
    if (json !== null) {
      setLogs(json.result);
    }
  }, []);

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  return (
    <>
      <SectionTitle className="flex justify-between">
        <span>로그</span>
        <div>
          <Button color="primary" onClick={fetchData}>
            <FontAwesomeIcon icon={faRefresh} />
          </Button>
        </div>
      </SectionTitle>
      <Code className="w-[calc(100vw-26rem)] h-[calc(100vh-20rem)] overflow-auto">
        {logs.map((log, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={`log-${index}`}>{log}</p>
        ))}
      </Code>
    </>
  );
};

export default Page;
