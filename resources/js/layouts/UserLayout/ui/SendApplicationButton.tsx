import { SendApplicationModal } from "@/features/SendApplicationModal";
import { Button } from "@/shared/ui/Button";

export function SendApplicationButton() {
  return (
    <SendApplicationModal>
      <Button className="border-2 border-primary text-primary bg-background hover:bg-accent">
        Оставить заявку
      </Button>
    </SendApplicationModal>
  );
}
