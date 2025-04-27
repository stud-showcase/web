import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { ArrowRight, FolderIcon, UserPlus, Users } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { Vacancy } from "@/entities/Vacancy";
import { Project } from "@/entities/Project";
import { Task } from "@/entities/Task";
import { useAuth } from "@/shared/hooks/useAuth";

function Content({
  vacancy,
  task,
  project,
}: {
  vacancy: Vacancy;
  task: Task;
  project: Project;
}) {
  return (
    <>
      {vacancy.description && (
        <Text variant="small" className="line-clamp-2">
          {vacancy.description}
        </Text>
      )}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <FolderIcon className="h-3 w-3 text-muted-foreground" />
          <Text variant="muted">Задача: {task.title}</Text>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3 text-muted-foreground" />
          <Text variant="muted">Проект: {project.name}</Text>
        </div>
      </div>
    </>
  );
}

function Footer({ project }: { project: Project }) {
  const { user } = useAuth();

  return (
    <>
      {project.isHiring && user && (
        <Button variant="outline" size="sm" className="flex-1">
          <UserPlus />
          Вступить
        </Button>
      )}
      <Button asChild size="sm" className="flex-1">
        <Link href={`/projects/${project.id}`}>
          Подробнее
          <ArrowRight />
        </Link>
      </Button>
    </>
  );
}

export function VacancyCard({
  vacancy,
  project,
  task,
}: {
  vacancy: Vacancy;
  project: Project;
  task: Task;
}) {
  return (
    <EntityCard
      title={vacancy.title}
      content={<Content vacancy={vacancy} task={task} project={project} />}
      footer={<Footer project={project} />}
    />
  );
}
