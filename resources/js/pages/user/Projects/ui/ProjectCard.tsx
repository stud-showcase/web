import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Project } from "@/entities/Project/model/Project";
import { ArrowRight, UserPlus, Users } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { StatusBadge } from "../../../../entities/Project/ui/StatusBadge";
import { ComplexityBadge, Task } from "@/entities/Task";
import { HiringBadge } from "@/entities/Project/ui/HiringBadge";
import { useAuth } from "@/shared/hooks/useAuth";
import { TaskTag } from "@/entities/Task";

function Title({ project }: { project: Project; task: Task }) {
  return (
    <div className="flex justify-between items-center">
      {project.name}
      <span className="text-sm flex gap-2 items-center">
        <Users className="w-4 h-4 " />
        {project.members.length}/10
      </span>
    </div>
  );
}

function Badges({ project, task }: { project: Project; task: Task }) {
  return (
    <>
      {project.isHiring && <HiringBadge />}
      <StatusBadge status={project.status} />
      <ComplexityBadge complexity={task.complexity} />
    </>
  );
}

function Content({ project }: { project: Project; task: Task }) {
  return (
    <>
      {project.abstract && (
        <Text variant="small" className="line-clamp-2">
          {project.abstract}
        </Text>
      )}
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags.map((tag) => <TaskTag value={tag} />);
}

function Footer({ project }: { project: Project }) {
  const { user } = useAuth();

  return (
    <div className="flex gap-2 flex-1">
      {project.isHiring && user && (
        <Button variant="outline" size="sm" className="flex-1">
          <UserPlus className="w-4 h-4" />
          Вступить
        </Button>
      )}
      <Button asChild size="sm" className="flex-1">
        <Link href={`/projects/${project.id}`}>
          Подробнее
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
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
      badges={<Badges project={project} task={task} />}
      content={<Content project={project} task={task} />}
      tags={<Tags task={task} />}
      footer={<Footer project={project} />}
    />
  );
}
