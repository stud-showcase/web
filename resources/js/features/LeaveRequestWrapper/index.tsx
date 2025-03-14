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
import { router } from "@inertiajs/react";
import { ReactNode } from "react";
import { LeaveRequestForm } from "./ui/LeaveRequestForm";
import { DialogClose } from "@radix-ui/react-dialog";

export function LeaveRequestWrapper({ children }: { children: ReactNode }) {
  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) router.push({ url: "#leave-request" });
    else router.push({ url: window.location.pathname });
  };

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={window.location.hash === "#leave-request"}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl w-11/12 overflow-y-auto h-[95vh] custom-scrollbar">
        <DialogHeader>
          <DialogTitle>Оставить заявку</DialogTitle>
          <DialogDescription>
            Заполните форму для подачи заявки
          </DialogDescription>
        </DialogHeader>
        <LeaveRequestForm />
        <DialogFooter>
          <div className="flex flex-col gap-2 sm:flex-row">
            <DialogClose asChild>
              <Button variant="outline">Отменить</Button>
            </DialogClose>
            <Button type="submit" form="leave-request-form">
              Оставить заявку
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
