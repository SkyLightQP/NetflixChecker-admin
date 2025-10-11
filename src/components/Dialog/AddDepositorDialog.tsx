import { FC } from 'react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddDepositorDialogProps {
  readonly action: (formData: FormData) => void;
}

export const AddDepositorDialog: FC<AddDepositorDialogProps> = ({ action }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>입금 내역 추가하기</DialogTitle>
        <DialogDescription>
          수동으로 입금 내역을 추가할 수 있습니다.
        </DialogDescription>
      </DialogHeader>
      <form action={action}>
        <div className="flex flex-col gap-5">
          <div className="grid gap-2">
            <Label htmlFor="date">입금 날짜</Label>
            <Input
              id="date"
              name="date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">이름</Label>
            <Input id="name" name="name" type="text" required autoFocus />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cost">입금액</Label>
            <Input id="cost" name="cost" type="number" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="costMonth">입금 인정 기간</Label>
            <Input id="costMonth" name="costMonth" type="text" required />
          </div>
        </div>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              취소
            </Button>
          </DialogClose>
          <Button type="submit" className="cursor-pointer">
            추가
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
