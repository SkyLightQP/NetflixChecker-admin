import { FC } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';

interface AddDepositorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  action: (formData: FormData) => void;
}

export const AddDepositorModal: FC<AddDepositorModalProps> = ({
  isOpen,
  onOpenChange,
  action
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              입금자 추가하기
            </ModalHeader>
            <form action={action}>
              <ModalBody>
                <Input
                  name="date"
                  label="날짜"
                  type="date"
                  variant="bordered"
                  defaultValue={new Date().toISOString().slice(0, 10)}
                />
                <Input
                  name="name"
                  label="이름"
                  type="text"
                  variant="bordered"
                  autoFocus
                />
                <Input
                  name="cost"
                  label="금액"
                  type="number"
                  variant="bordered"
                />
                <Input
                  name="costMonth"
                  label="입금 인정 날짜"
                  type="text"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  취소
                </Button>
                <Button type="submit" color="primary">
                  추가
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
