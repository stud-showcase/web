import { LeaveRequest } from "@/features/LeaveRequest";
import { Button } from "@/shared/ui/Button";

export function LeaveRequestButton() {
  return (
    <LeaveRequest>
      <Button className="border-2 border-primary text-primary bg-background hover:bg-accent">
        Оставить заявку
      </Button>
    </LeaveRequest>
  );
}
