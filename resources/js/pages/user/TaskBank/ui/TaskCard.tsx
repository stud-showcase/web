import { EntityCard } from "@/shared/ui/EntityCard";
import { Text } from "@/shared/ui/Text";
import { Task } from "@/entities/Task/model/Task";
import {
  TaskComplexity,
  TaskComplexityBadge,
  TaskDeadlineBadge,
  TaskMembersBadge,
  TaskTag,
  TaskTagBadge,
} from "@/entities/Task";

function Badges({
  taskMaxMembers,
  taskDeadline,
  taskComplexity,
}: {
  taskMaxMembers: number;
  taskDeadline: string;
  taskComplexity: TaskComplexity;
}) {
  return (
    <>
      <TaskMembersBadge maxMembers={taskMaxMembers} />
      <TaskDeadlineBadge deadline={taskDeadline} />
      <TaskComplexityBadge complexity={taskComplexity} />
    </>
  );
}

function Content({ taskDescription }: { taskDescription: string }) {
  return (
    <Text variant="small" className="line-clamp-3">
      {taskDescription}
    </Text>
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
          taskComplexity={task.complexity}
          taskDeadline={task.deadline}
          taskMaxMembers={task.maxMembers}
        />
      }
      content={<Content taskDescription={task.description} />}
      tags={task.tags.length > 0 && <Tags taskTags={task.tags} />}
      href={`/tasks/${task.id}`}
    />
  );
}
