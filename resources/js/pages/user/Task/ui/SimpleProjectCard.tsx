import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import {
  Project,
  ProjectHiringBadge,
  ProjectStatusBadge,
} from "@/entities/Project";
import { ChevronRightIcon } from "lucide-react";

export function SimpleProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b">
        <div className="flex-1 space-y-1">
          <Text variant="large">{project.name}</Text>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 shrink-0">
          <ProjectHiringBadge isHiring={project.isHiring} />
          <ProjectStatusBadge status={project.status} />
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}
