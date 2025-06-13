'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { SectionTitle } from '@/components/Paragraph/SectionTitle';
import {
  Button,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure
} from '@heroui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faRefresh, faRobot } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/utils/fetch-api';
import { toast } from 'react-toastify';
import { AddDepositorModal } from '@/components/Modal/AddDepositorModal';

interface DepositorType {
  readonly id: number;
  readonly name: string;
  readonly cost: number;
  readonly date: string;
  readonly costMonth: number;
}

const columns = [
  {
    key: 'date',
    label: '입금 날짜'
  },
  {
    key: 'who',
    label: '이름'
  },
  {
    key: 'cost',
    label: '금액'
  },
  {
    key: 'costMonth',
    label: '입금 인정 날짜'
  }
];

const Page: FC = () => {
  const [rows, setRows] = useState<DepositorType[]>([]);
  const [isDisableCrawling, setIsDisableCrawling] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const fetchData = useCallback(async () => {
    const { json } = await api<{ result: DepositorType[] }>('/deposit', 'GET');
    if (json !== null) {
      setRows(json.result as DepositorType[]);
    }
  }, []);

  const onCrawlingClick = async () => {
    setIsDisableCrawling(true);
    await api('/deposit/crawl', 'POST');
    toast('크롤링 요청을 보냈습니다...');

    setTimeout(() => {
      setIsDisableCrawling(false);
    }, 1000 * 10);
  };

  const onAddClick = async (formData: FormData) => {
    const rawFormData = {
      date: formData.get('date'),
      who: formData.get('name'),
      cost: Number(formData.get('cost')),
      costMonth: Number(formData.get('costMonth'))
    };

    if (
      rawFormData.date === '' ||
      rawFormData.who === '' ||
      rawFormData.cost === 0 ||
      rawFormData.costMonth === 0
    ) {
      toast('모든 항목을 입력해주세요.', {
        type: 'error'
      });
      return;
    }

    await api('/deposit', 'POST', rawFormData);
    toast('입금자가 추가되었습니다.');
    onClose();
    await fetchData();
  };

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  return (
    <>
      <SectionTitle className="flex justify-between">
        <span>입금자 관리</span>
        <div className="space-x-2">
          <Button color="primary" onClick={fetchData}>
            <FontAwesomeIcon icon={faRefresh} />
          </Button>
          <Button
            color="primary"
            startContent={<FontAwesomeIcon icon={faRobot} />}
            onClick={onCrawlingClick}
            disabled={isDisableCrawling}
            isLoading={isDisableCrawling}
          >
            크롤링
          </Button>
          <Button
            color="primary"
            startContent={<FontAwesomeIcon icon={faPlus} />}
            onClick={onOpen}
          >
            수동 추가
          </Button>
        </div>
      </SectionTitle>
      <Table
        isHeaderSticky
        aria-label="입금자 정보 표"
        className="w-[calc(100vw-26rem)] max-h-[calc(100vh-14rem)] overflow-y-auto"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="입금 기록이 없습니다." items={rows}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => {
                const calculatedMonth =
                  (new Date(getKeyValue(item, 'date')).getMonth() +
                    Number(getKeyValue(item, columnKey))) %
                  12;
                switch (columnKey) {
                  case 'cost':
                    return (
                      <TableCell>
                        {Number(getKeyValue(item, columnKey)).toLocaleString()}{' '}
                        원
                      </TableCell>
                    );
                  case 'costMonth':
                    return (
                      <TableCell>
                        {getKeyValue(item, columnKey)}달 (~{' '}
                        {calculatedMonth === 0 ? 12 : calculatedMonth}
                        월까지)
                      </TableCell>
                    );
                  default:
                    return (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    );
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AddDepositorModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        action={onAddClick}
      />
    </>
  );
};

export default Page;
