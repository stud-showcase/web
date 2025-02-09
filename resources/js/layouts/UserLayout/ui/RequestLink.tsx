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

export function RequestLink() {
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
        <button className="tracking-wider bg-gradient-to-r from-[#1D71B8] to-[#1588E9] rounded-md px-6 py-2 font-semibold text-white">
          Оставить заявку
        </button>
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
