'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/fetch-api';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  ArrowUpDownIcon,
  BotIcon,
  PlusIcon,
  RefreshCwIcon
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { AddDepositorDialog } from '@/components/Dialog/AddDepositorDialog';

interface DepositPayload {
  readonly id: number;
  readonly name: string;
  readonly cost: number;
  readonly date: string;
  readonly costMonth: number;
}

const columns: ColumnDef<DepositPayload>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          입금 날짜
          <ArrowUpDownIcon className="ml-0.5" />
        </Button>
      );
    }
  },
  {
    accessorKey: 'who',
    header: '이름'
  },
  {
    accessorKey: 'cost',
    header: '입금액',
    cell: ({ row }) => {
      return `${formatNumber(Number(row.getValue('cost')))} 원`;
    }
  },
  {
    accessorKey: 'costMonth',
    header: '입금 인정 기간',
    cell: ({ row }) => {
      const startDate = new Date(row.getValue('date'));
      const costMonth = Number(row.getValue('costMonth'));
      // Add costMonth months to startDate
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + costMonth);
      const endMonth = endDate.getMonth() + 1; // getMonth() is 0-based
      const endYear = endDate.getFullYear();
      return `${costMonth}개월 (~${endYear}년 ${endMonth}월까지)`;
    }
  }
];

const Page: FC = () => {
  const [rows, setRows] = useState<DepositPayload[]>([]);
  const [isDisableCrawling, setIsDisableCrawling] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  const fetchData = useCallback(async () => {
    const { json } = await api<{ result: DepositPayload[] }>('/deposit', 'GET');
    if (json !== null) {
      setRows(json.result as DepositPayload[]);
    }
  }, []);

  const onCrawlingClick = async () => {
    setIsDisableCrawling(true);
    await api('/deposit/crawl', 'POST');
    toast.info('수동 크롤링을 시작했습니다.');
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
      toast.warning('모든 항목을 입력해주세요.');
      return;
    }

    await api('/deposit', 'POST', rawFormData);
    toast.success('입금 정보를 추가했습니다.');
    await fetchData();
  };

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  return (
    <>
      <div className="flex space-x-2">
        <Button className="cursor-pointer" onClick={fetchData}>
          <RefreshCwIcon /> 새로고침
        </Button>
        <Button
          className="cursor-pointer"
          onClick={onCrawlingClick}
          disabled={isDisableCrawling}
        >
          <BotIcon /> 크롤링
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <PlusIcon /> 수동 추가
            </Button>
          </DialogTrigger>
          <AddDepositorDialog action={onAddClick} />
        </Dialog>
      </div>
      <div className="rounded-md border max-h-[calc(100vh-12rem)] overflow-y-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  입금 내역이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Page;
