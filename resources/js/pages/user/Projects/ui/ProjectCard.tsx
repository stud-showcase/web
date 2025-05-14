import { Link } from "@inertiajs/react";
import { Button } from "@/shared/ui/Button";
import { ArrowRight, Users } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { ProjectStatusBadge, ProjectHiringBadge } from "@/entities/Project";
import { TaskComplexityBadge, Task, TaskTagBadge } from "@/entities/Task";
import { Text } from "@/shared/ui/Text";
import { ExtendedProject } from "../model/ExtendedProject";

function Title({ project }: { project: ExtendedProject }) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-xl font-bold leading-none tracking-tight">
        {project.name}
      </span>
      <span className="text-sm flex gap-2 items-center">
        <Users className="w-4 h-4 " />
        {project.members.length}/{project.task.maxMembers}
      </span>
    </div>
  );
}

function Badges({ project }: { project: ExtendedProject }) {
  return (
    <>
      <ProjectHiringBadge isHiring={project.isHiring} />
      <ProjectStatusBadge status={project.status} />
      <TaskComplexityBadge complexity={project.task.complexity} />
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags?.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

export function Content({ project }: { project: ExtendedProject }) {
  if (project.annotation) {
    return <Text variant="small">{project.annotation}</Text>;
  }
  return;
}

function Footer({ project }: { project: ExtendedProject }) {
  return (
    <Button asChild size="sm">
      <Link href={`/projects/${project.id}`}>
        Подробнее
        <ArrowRight />
      </Link>
    </Button>
  );
}

export function ProjectCard({ project }: { project: ExtendedProject }) {
  return (
    <EntityCard
      title={<Title project={project} />}
      subtitle={project.task.title}
      content={<Content project={project} />}
      badges={<Badges project={project} />}
      tags={<Tags task={project.task} />}
      footer={<Footer project={project} />}
    />
  );
}
