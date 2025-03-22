import { TaskComplexity } from "@/shared/types/Task";
import { Badge } from "@/shared/ui/Badge";

const complexityToVariant = {
  easy: "success",
  medium: "warning",
  hard: "destructive",
} as const;

const complexityToName = {
  easy: "Легкий",
  medium: "Средний",
  hard: "Сложный",
} as const;

export function ComplexityBadge({
  complexity,
}: {
  complexity: TaskComplexity;
}) {
  return (
    <Badge variant={complexityToVariant[complexity]}>
      {complexityToName[complexity]}
    </Badge>
  );
}
