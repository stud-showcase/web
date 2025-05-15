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
import { Text } from "@/shared/ui/Text";
import { ExtendedProject } from "../model/ExtendedProject";

function Title({
  projectName,
  projectMembersCount,
  taskMaxMembers,
}: {
  projectName: string;
  projectMembersCount: number;
  taskMaxMembers: number;
}) {
  return (
    <div className="flex justify-between items-center gap-2">
      <span className="text-xl font-bold leading-none tracking-tight">
        {projectName}
      </span>
      <span className="text-sm flex gap-2 items-center">
        <Users className="w-4 h-4 " />
        {projectMembersCount}/{taskMaxMembers}
      </span>
    </div>
  );
}

function Badges({
  projectIsHiring,
  projectStatus,
  taskComplexity,
}: {
  projectIsHiring: boolean;
  projectStatus: ProjectStatus;
  taskComplexity: TaskComplexity;
}) {
  return (
    <>
      <ProjectHiringBadge isHiring={projectIsHiring} />
      <ProjectStatusBadge status={projectStatus} />
      <TaskComplexityBadge complexity={taskComplexity} />
    </>
  );
}

function Tags({ taskTags }: { taskTags: TaskTag[] }) {
  return taskTags.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

function Content({ projectAnnotation }: { projectAnnotation: string }) {
  return (
    <Text variant="small" className="line-clamp-3">
      {projectAnnotation}
    </Text>
  );
}

export function ProjectCard({ project }: { project: ExtendedProject }) {
  return (
    <EntityCard
      title={
        <Title
          projectName={project.name}
          projectMembersCount={project.members.length}
          taskMaxMembers={project.task.maxMembers}
        />
      }
      subtitle={project.task.title}
      content={
        project.annotation && <Content projectAnnotation={project.annotation} />
      }
      badges={
        <Badges
          projectIsHiring={project.isHiring}
          projectStatus={project.status}
          taskComplexity={project.task.complexity}
        />
      }
      tags={
        project.task.tags.length > 0 && <Tags taskTags={project.task.tags} />
      }
      href={`/projects/${project.id}`}
    />
  );
}
