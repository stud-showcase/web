import { ProjectStatus } from "@/entities/Project/model/ProjectStatus";
import { Badge } from "@/shared/ui/Badge";
import { CheckCircle, Clock, Settings } from "lucide-react";

const statusToBadge = {
  under_review: {
    name: "На рассмотрении",
    icon: <Clock className="w-3 h-3" />,
  },
  in_progress: {
    name: "В разработке",
    icon: <Settings className="w-3 h-3" />,
  },
  completed: {
    name: "Завершен",
    icon: <CheckCircle className="w-3 h-3" />,
  },
} as const;

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      {statusToBadge[status].icon}
      {statusToBadge[status].name}
    </Badge>
  );
}
