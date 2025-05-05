import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Task } from "@/entities/Task/model/Task";
import { TaskComplexityBadge, TaskDeadlineBadge, TaskMembersBadge, TaskTagBadge } from "@/entities/Task";
import { useAuth } from "@/shared/hooks/useAuth";

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
    <>
      {task.description && (
        <Text variant="small" className="line-clamp-2">
          {task.description}
        </Text>
      )}
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags.map((tag) => <TaskTagBadge value={tag} />);
}

function Footer({ task }: { task: Task }) {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <Button variant="outline" size="sm" className="flex-1">
          <ClipboardCheck />
          Взять задачу
        </Button>
      )}
      <Button asChild size="sm" className="flex-1">
        <Link href={`/tasks/${task.id}`}>
          Подробнее
          <ArrowRight />
        </Link>
      </Button>
    </>
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
