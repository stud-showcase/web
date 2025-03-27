import { Text } from "@/shared/ui/Text";
import { Heading } from "@/shared/ui/Heading";
import { Link } from "@inertiajs/react";
import { Project } from "@/shared/types/Project";
import { HiringBadge } from "@/features/HiringBadge";
import { StatusBadge } from "@/features/StatusBadge";
import { ChevronRightIcon } from "lucide-react";

export function SimplifiedProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="block">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 border-b">
        <div className="flex-1 space-y-1">
          <Heading level={4}>{project.title}</Heading>
          <Text className="line-clamp-1" variant="muted">
            {project.description}
          </Text>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-4 shrink-0">
          {project.isHiring && <HiringBadge />}
          <StatusBadge status={project.status} />
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </Link>
  );
}
