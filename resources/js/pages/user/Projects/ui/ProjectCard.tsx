import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Project } from "@/entities/Project/model/Project";
import { ArrowRight, UserIcon, FolderIcon, UserPlus } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { StatusBadge } from "../../../../entities/Project/ui/StatusBadge";
import { ComplexityBadge, Task } from "@/entities/Task";
import { HiringBadge } from "@/entities/Project/ui/HiringBadge";
import { useAuth } from "@/shared/hooks/useAuth";
import { TaskTag } from "@/entities/Task";

function Badges({ project, task }: { project: Project; task: Task }) {
  return (
    <>
      {project.isHiring && <HiringBadge />}
      <StatusBadge status={project.status} />
      <ComplexityBadge complexity={task.complexity} />
    </>
  );
}

function Content({ project, task }: { project: Project; task: Task }) {
  return (
    <div className="space-y-3 mt-4">
      <div className="flex items-center gap-2">
        <FolderIcon className="h-4 w-4 text-muted-foreground" />
        <Text variant="muted">Задача: {task.title}</Text>
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

function Tags({ task }: { task: Task }) {
  return (
    <div className="flex flex-wrap gap-2">
      {task.tags.map((tag) => (
        <TaskTag value={tag} />
      ))}
    </div>
  );
}

function Footer({ project }: { project: Project }) {
  const { user } = useAuth();

  return (
    <>
      {project.isHiring && user && (
        <Button variant="outline" size="sm" className="md:flex-initial flex-1">
          <UserPlus />
          Вступить
        </Button>
      )}
      <Button asChild size="sm">
        <Link href={`/projects/${project.id}`} className="md:flex-initial flex-1">
          Подробнее
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </>
  );
}

export function ProjectCard({
  project,
  task,
}: {
  project: Project;
  task: Task;
}) {
  return (
    <EntityCard
      title={project.name}
      badges={<Badges project={project} task={task} />}
      content={<Content project={project} task={task} />}
      tags={<Tags task={task} />}
      footer={<Footer project={project} />}
    />
  );
}
