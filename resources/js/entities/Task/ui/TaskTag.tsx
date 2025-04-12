import { Badge } from "@/shared/ui/Badge";
import { Tag as TagIcon } from "lucide-react";

export function TaskTag({ value }: { value: string }) {
  return (
    <Badge variant="outline" className="gap-1">
      <TagIcon className="h-3 w-3" />
      {value}
    </Badge>
  );
}
