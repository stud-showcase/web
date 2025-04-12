import { Link } from "@inertiajs/react";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Project } from "@/shared/types/Project";
import { ArrowRight, UserIcon, FolderIcon, Users } from "lucide-react";
import { CardWrapper } from "@/features/CardWrapper";
import { StatusBadge } from "@/features/StatusBadge";
import { ComplexityBadge } from "@/features/ComplexityBadge";
import { HiringBadge } from "@/features/HiringBadge";
import { useAuth } from "@/shared/hooks/useAuth";
import { Tag } from "@/features/Tag";

function Badges({ project }: { project: Project }) {
  return (
    <>
      {project.isHiring && <HiringBadge />}
      <StatusBadge status={project.status} />
      <ComplexityBadge complexity={project.task.complexity} />
    </>
  );
}

function Content({ project }: { project: Project }) {
  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2">
        <FolderIcon className="h-4 w-4 text-muted-foreground" />
        <Text variant="muted">Задача: {project.task.title}</Text>
      </div>
      {project.mentor && (
        <div className="flex items-center gap-2">
          <UserIcon className="h-4 w-4 text-muted-foreground" />
          <Text variant="muted">Наставник: {project.mentor}</Text>
        </div>
      )}
      {project.abstract && (
        <Text className="line-clamp-3">{project.abstract}</Text>
      )}
    </div>
  );
}

function Tags({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.task.tags.map((tag) => (
        <Tag value={tag} />
      ))}
    </div>
  );
}

function Footer({ project }: { project: Project }) {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {project.isHiring && isLoggedIn && (
        <Button variant="outline" size="sm" className="md:flex-initial flex-1">
          Вступить в команду
        </Button>
      )}
      <Button asChild size="sm">
        <Link
          href={`/projects/${project.id}`}
          className="flex items-center justify-center gap-1 md:flex-initial flex-1"
        >
          Подробнее
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <CardWrapper
      title={project.name}
      badges={<Badges project={project} />}
      content={<Content project={project} />}
      tags={<Tags project={project} />}
      footer={<Footer project={project} />}
    />
  );
}
