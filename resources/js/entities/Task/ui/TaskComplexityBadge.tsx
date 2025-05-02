import { TaskComplexity } from "@/entities/Task";
import { Badge } from "@/shared/ui/Badge";

const complexityVariants: Record<
  number,
  "success" | "warning" | "destructive"
> = {
  1: "success",
  2: "warning",
  3: "destructive",
};

export function TaskComplexityBadge({
  complexity,
}: {
  complexity: TaskComplexity;
}) {
  return (
    <Badge variant={complexityVariants[complexity.id]}>{complexity.name}</Badge>
  );
}
