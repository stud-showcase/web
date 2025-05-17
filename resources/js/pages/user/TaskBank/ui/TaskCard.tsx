import { EntityCard } from "@/shared/ui/EntityCard";
import { Task } from "@/entities/Task/model/Task";
import {
  TaskComplexity,
  TaskComplexityBadge,
  TaskDeadlineBadge,
  TaskMembersBadge,
  TaskTag,
  TaskTagBadge,
} from "@/entities/Task";
import { ExpandableText } from "@/shared/ui/ExpandableText";

function Badges({
  maxMembers,
  deadline,
  complexity,
}: {
  maxMembers: number;
  deadline: string;
  complexity: TaskComplexity;
}) {
  return (
    <>
      <TaskMembersBadge maxMembers={maxMembers} />
      <TaskDeadlineBadge deadline={deadline} />
      <TaskComplexityBadge complexity={complexity} />
    </>
  );
}

function Tags({ taskTags }: { taskTags: TaskTag[] }) {
  return taskTags.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <EntityCard
      title={task.title}
      subtitle={task.customer}
      badges={
        <Badges
          complexity={task.complexity}
          deadline={task.deadline}
          maxMembers={task.maxMembers}
        />
      }
      content={<ExpandableText text={task.description} maxLength={160} />}
      tags={task.tags.length > 0 && <Tags taskTags={task.tags} />}
      href={`/tasks/${task.id}`}
    />
  );
}
