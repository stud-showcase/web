import { Badge } from "@/shared/ui/Badge";
import { Tag as TagIcon } from "lucide-react";
import { TaskTag } from "../model/TaskTag";

export function TaskTagBadge({ tag }: { tag: TaskTag }) {
  return (
    <Badge variant="outline" className="gap-1">
      <TagIcon className="h-3.5 w-3.5" />
      {tag.name}
    </Badge>
  );
}
