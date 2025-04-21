import { Badge } from "@/shared/ui/Badge";
import { Users } from "lucide-react";

export function HiringBadge() {
  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Users className="w-3 h-3" />
      Набор открыт
    </Badge>
  );
}
