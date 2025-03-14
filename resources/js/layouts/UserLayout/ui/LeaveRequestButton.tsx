import { LeaveRequestWrapper } from "@/features/LeaveRequestWrapper";
import { Button } from "@/shared/ui/Button";

export function LeaveRequestButton() {
  return (
    <LeaveRequestWrapper>
      <Button className="border-2 border-primary text-primary bg-background hover:bg-accent">
        Оставить заявку
      </Button>
    </LeaveRequestWrapper>
  );
}
