import { Button } from "@/shared/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/Dialog";
import { ReactNode } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { SendApplicationForm } from "./SendApplicationForm";

export function SendApplicationModal({ children }: { children: ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-11/12 overflow-y-auto h-[95vh] custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Оставить заявку</DialogTitle>
          <DialogDescription>
            Заполните форму для подачи заявки
          </DialogDescription>
        </DialogHeader>
        <SendApplicationForm />
        <DialogFooter>
          <div className="flex flex-col gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Отменить</Button>
            </DialogClose>
            <Button type="submit" form="leave-request-form">
              Отправить
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
