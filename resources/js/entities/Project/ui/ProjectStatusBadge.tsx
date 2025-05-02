import { ProjectStatus } from "@/entities/Project";
import { Badge } from "@/shared/ui/Badge";
import { CheckCircle, Clock, Settings } from "lucide-react";
import { ReactNode } from "react";

const statusIcons: Record<number, ReactNode> = {
  1: <Clock className="w-3 h-3" />,
  2: <Settings className="w-3 h-3" />,
  3: <CheckCircle className="w-3 h-3" />,
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
      {statusIcons[status.id]}
      {status.name}
    </Badge>
  );
}
