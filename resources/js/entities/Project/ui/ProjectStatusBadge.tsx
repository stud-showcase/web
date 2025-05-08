import { ProjectStatus } from "@/entities/Project";
import { Badge } from "@/shared/ui/Badge";
import { CheckCircle, Clock, Settings } from "lucide-react";
import { ReactNode } from "react";

const statusIcons: Record<number, ReactNode> = {
  1: <Clock className="w-3.5 h-3.5" />,
  2: <Settings className="w-3.5 h-3.5" />,
  3: <CheckCircle className="w-3.5 h-3.5" />,
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1 w-fit">
      {statusIcons[status.id]}
      {status.name}
    </Badge>
  );
}
