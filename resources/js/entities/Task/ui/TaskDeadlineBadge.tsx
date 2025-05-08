import { Badge } from "@/shared/ui/Badge";
import { Calendar } from "lucide-react";

export function TaskDeadlineBadge({ deadline }: { deadline: string }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Calendar className="w-3.5 h-3.5" />
      {deadline}
    </Badge>
  );
}
