import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Heading } from "@/shared/ui/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui/Breadcrumb";
import { TaskComplexityBadge, TaskTagBadge } from "@/entities/Task";
import { ProjectHiringBadge, ProjectStatusBadge } from "@/entities/Project";
import { useAuth } from "@/shared/hooks/useAuth";
import { JoinProjectModal } from "./JoinProjectModal";
import { UserPlus, Settings, Link as LinkIcon } from "lucide-react";
import { ExtendedProject } from "../model/ExtendedProject";

export function HeaderSection({ project }: { project: ExtendedProject }) {
  const { user } = useAuth();

  const isProjectCreator = () => {
    return project.members.find(
      (member) => user?.id === member.id && member.isCreator
    );
  };

  const isProjectMentor = () => {
    return user?.id === project.mentor?.id;
  };

  return (
    <header className="border-b pb-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/projects">Проекты</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Heading level={1}>{project.name}</Heading>
          <div className="flex flex-row w-full sm:w-auto gap-3">
            <Button
              variant="outline"
              asChild
              className="flex-1 sm:flex-none"
              size="sm"
            >
              <Link href={`/tasks/${project.task.id}`}>
                <LinkIcon /> К задаче
              </Link>
            </Button>
            {user && (isProjectCreator() || isProjectMentor()) && (
              <Button
                variant="secondary"
                className="flex-1 sm:flex-none"
                asChild
                size="sm"
              >
                <Link href={`/projects/${project.id}/controlPanel`}>
                  <Settings />
                  Настройки
                </Link>
              </Button>
            )}
            {user && project.canJoin && (
              <JoinProjectModal
                projectId={project.id}
                vacancies={project.vacancies}
              >
                <Button className="flex-1 sm:flex-none" size="sm">
                  <UserPlus />
                  Вступить
                </Button>
              </JoinProjectModal>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <TaskComplexityBadge complexity={project.task.complexity} />
          <ProjectStatusBadge status={project.status} />
          <ProjectHiringBadge isHiring={project.isHiring} />
          {project.task.tags.length > 0 &&
            project.task.tags.map((tag) => (
              <TaskTagBadge tag={tag} key={tag.id} />
            ))}
        </div>
      </div>
    </header>
  );
}
