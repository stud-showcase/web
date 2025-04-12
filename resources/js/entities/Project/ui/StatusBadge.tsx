import { ProjectStatus } from "@/entities/Project/types";
import { Badge } from "@/shared/ui/Badge";
import { CheckCircle, Clock, Settings } from "lucide-react";

const statusToBadge = {
  under_review: {
    name: "На рассмотрении",
    icon: <Clock className="w-4 h-4" />,
  },
  in_progress: {
    name: "В разработке",
    icon: <Settings className="w-4 h-4" />,
  },
  completed: {
    name: "Завершен",
    icon: <CheckCircle className="w-4 h-4" />,
  },
} as const;

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge variant="secondary" className="flex items-center gap-2">
      {statusToBadge[status].icon}
      {statusToBadge[status].name}
    </Badge>
  );
}
