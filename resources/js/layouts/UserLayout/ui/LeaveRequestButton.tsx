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

export function LeaveRequestButton() {
  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) router.push({ url: "#leave-a-request" });
    else router.push({ url: window.location.pathname });
  };

  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={window.location.hash === "#leave-a-request"}
    >
      <DialogTrigger asChild>
        <Button variant={"outline-accent"}>Оставить заявку</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Оставить заявку на проект</DialogTitle>
          <DialogDescription>
            Заполните форму чтобы оставить заявку на проект
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Отправить заявку</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
