import { Badge } from "@/shared/ui/Badge";
import { Calendar } from "lucide-react";

export function TaskDeadlineBadge({ deadline }: { deadline: Date }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Calendar className="w-3 h-3" />
      {deadline.toLocaleDateString()}
    </Badge>
  );
}
