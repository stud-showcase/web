import { TaskComplexity } from "@/shared/types/Task";
import { Badge } from "@/shared/ui/Badge";

const complexityToBadge = {
  easy: { name: "Легкий", variant: "success" },
  medium: { name: "Средний", variant: "warning" },
  hard: { name: "Сложный", variant: "destructive" },
} as const;

export function ComplexityBadge({
  complexity,
}: {
  complexity: TaskComplexity;
}) {
  return (
    <Badge variant={complexityToBadge[complexity].variant}>
      {complexityToBadge[complexity].name}
    </Badge>
  );
}
