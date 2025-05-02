import { Users } from "lucide-react";
import { Badge } from "@/shared/ui/Badge";

export function TaskMembersBadge({ maxMembers }: { maxMembers: number }) {
  return (
    <Badge variant="outline" className="flex items-center gap-1 w-fit">
      <Users className="w-3 h-3" />
      {maxMembers} {maxMembers === 1 ? "участник" : "участника"}
    </Badge>
  );
}
