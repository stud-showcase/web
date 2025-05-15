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
      <div className="flex flex-col md:flex-row justify-between gap-3 py-3 border-b">
        <Text variant="large">{project.name}</Text>

        <div className="grid grid-cols-[120px_120px_auto] items-center gap-4 text-left">
          <div>
            <ProjectHiringBadge isHiring={project.isHiring} />
          </div>
          <div>
            <ProjectStatusBadge status={project.status} />
          </div>
          <ChevronRightIcon className="h-5 w-5 justify-self-end" />
        </div>
      </div>
    </Link>
  );
}
