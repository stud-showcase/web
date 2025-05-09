import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { ArrowRight, UserPlus, Users } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import {
  ProjectStatusBadge,
  ProjectHiringBadge,
  Project,
} from "@/entities/Project";
import { TaskComplexityBadge, Task, TaskTagBadge } from "@/entities/Task";
import { useAuth } from "@/shared/hooks/useAuth";
import { Text } from "@/shared/ui/Text";

function Title({ project, task }: { project: Project; task: Task }) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-xl font-bold leading-none tracking-tight">
        {project.name}
      </span>
      <span className="text-sm flex gap-2 items-center">
        <Users className="w-4 h-4 " />
        {project.members.length}/{task.maxMembers}
      </span>
    </div>
  );
}

function Badges({ project, task }: { project: Project; task: Task }) {
  return (
    <>
      <ProjectHiringBadge isHiring={project.isHiring} />
      <ProjectStatusBadge status={project.status} />
      <TaskComplexityBadge complexity={task.complexity} />
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags?.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

export function Content({ project }: { project: Project }) {
  if (project.annotation) {
    return <Text variant="small">{project.annotation}</Text>;
  }
  return;
}

function Footer({ project }: { project: Project }) {
  const { user } = useAuth();

  return (
    <>
      {/* TODO: заменить на canJoin */}
      {false && (
        <Button variant="outline" size="sm">
          <UserPlus />
          Вступить
        </Button>
      )}
      <Button asChild size="sm">
        <Link href={`/projects/${project.id}`}>
          Подробнее
          <ArrowRight />
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
      title={<Title project={project} task={task} />}
      subtitle={task.title}
      content={<Content project={project} />}
      badges={<Badges project={project} task={task} />}
      tags={<Tags task={task} />}
      footer={<Footer project={project} />}
    />
  );
}
