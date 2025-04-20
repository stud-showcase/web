import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { UsersIcon, FolderIcon, ArrowRight, UserPlus } from "lucide-react";
import { CardWrapper } from "@/shared/components/CardWrapper";
import { Vacancy } from "../types";
import { Button } from "@/shared/ui/Button";
import { Task } from "@/entities/Task";
import { Project } from "@/entities/Project";

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
    <CardWrapper
      title={vacancy.title}
      content={
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FolderIcon className="h-4 w-4 text-muted-foreground" />
              <Text variant="muted">Задача: {task.title}</Text>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <Text variant="muted">Проект: {project.name}</Text>
            </div>
          </div>
        </div>
      }
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            className="md:flex-initial flex-1"
          >
            <UserPlus />
            Вступить
          </Button>
          <Button asChild size="sm">
            <Link href={`/projects/${project.id}`}>
              Подробнее
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </>
      }
    />
  );
}
