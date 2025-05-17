import { Users } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import {
  ProjectStatusBadge,
  ProjectHiringBadge,
  ProjectStatus,
} from "@/entities/Project";
import {
  TaskComplexityBadge,
  TaskTagBadge,
  TaskComplexity,
  TaskTag,
} from "@/entities/Task";
import { ExtendedProject } from "../model/ExtendedProject";
import { ExpandableText } from "@/shared/ui/ExpandableText";

function Title({
  name,
  membersCount,
  maxMembers,
}: {
  name: string;
  membersCount: number;
  maxMembers: number;
}) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-xl font-bold leading-none tracking-tight">
        {name}
      </span>
      <span className="text-sm flex gap-2 items-center">
        <Users className="w-4 h-4 " />
        {membersCount}/{maxMembers}
      </span>
    </div>
  );
}

function Badges({
  isHiring,
  status,
  complexity,
}: {
  isHiring: boolean;
  status: ProjectStatus;
  complexity: TaskComplexity;
}) {
  return (
    <>
      <ProjectHiringBadge isHiring={isHiring} />
      <ProjectStatusBadge status={status} />
      <TaskComplexityBadge complexity={complexity} />
    </>
  );
}

function Tags({ taskTags }: { taskTags: TaskTag[] }) {
  return taskTags.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

export function ProjectCard({ project }: { project: ExtendedProject }) {
  return (
    <EntityCard
      title={
        <Title
          name={project.name}
          membersCount={project.members.length}
          maxMembers={project.task.maxMembers}
        />
      }
      subtitle={project.task.title}
      content={
        project.annotation && <ExpandableText text={project.annotation} maxLength={160} />
      }
      badges={
        <Badges
          isHiring={project.isHiring}
          status={project.status}
          complexity={project.task.complexity}
        />
      }
      tags={
        project.task.tags.length > 0 && <Tags taskTags={project.task.tags} />
      }
      href={`/projects/${project.id}`}
    />
  );
}
