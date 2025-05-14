import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { Task } from "@/entities/Task/model/Task";
import {
  TaskComplexityBadge,
  TaskDeadlineBadge,
  TaskMembersBadge,
  TaskTagBadge,
} from "@/entities/Task";

function Badges({ task }: { task: Task }) {
  return (
    <>
      <TaskMembersBadge maxMembers={task.maxMembers} />
      <TaskDeadlineBadge deadline={task.deadline} />
      <TaskComplexityBadge complexity={task.complexity} />
    </>
  );
}

function Content({ task }: { task: Task }) {
  return (
    <Text variant="small" className="line-clamp-2">
      {task.description}
    </Text>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags?.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

function Footer({ task }: { task: Task }) {
  return (
    <Button asChild size="sm">
      <Link href={`/tasks/${task.id}`}>
        Подробнее
        <ArrowRight />
      </Link>
    </Button>
  );
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <EntityCard
      title={task.title}
      subtitle={task.customer}
      badges={<Badges task={task} />}
      content={<Content task={task} />}
      tags={<Tags task={task} />}
      footer={<Footer task={task} />}
    />
  );
}
