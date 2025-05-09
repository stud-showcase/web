import { Badge } from "@/shared/ui/Badge";
import { Users, XCircle } from "lucide-react";

export function ProjectHiringBadge({ isHiring }: { isHiring: boolean }) {
  return (
    <Badge variant="outline" className="flex items-center gap-1 w-fit">
      {isHiring ? (
        <>
          <Users className="w-3.5 h-3.5" />
          Набор открыт
        </>
      ) : (
        <>
          <XCircle className="w-3.5 h-3.5" />
          Набор закрыт
        </>
      )}
    </Badge>
  );
}
