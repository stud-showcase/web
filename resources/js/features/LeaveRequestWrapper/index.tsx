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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оставить заявку на проект</DialogTitle>
          <DialogDescription>
            Заполните форму чтобы оставить заявку на проект
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Оставить заявку</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
