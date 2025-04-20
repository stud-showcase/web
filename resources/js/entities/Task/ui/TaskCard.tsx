import { CardWrapper } from "@/shared/components/CardWrapper";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { ArrowRight, Briefcase, Calendar, ClipboardCheck, UserIcon, Users } from "lucide-react";
import { Task } from "@/entities/Task/types";
import { ComplexityBadge } from "./ComplexityBadge";
import { TaskTag } from "./TaskTag";

function Badges({ task }: { task: Task }) {
  return (
    <>
      <Badge variant="outline" className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        {task.maxMembers} {task.maxMembers === 1 ? "участник" : "участника"}
      </Badge>
      <Badge variant="secondary" className="flex items-center gap-1">
        <Calendar className="w-4 h-4" />
        {task.deadline.toLocaleDateString()}
      </Badge>
      <ComplexityBadge complexity={task.complexity} />
    </>
  );
}

function Content({ task }: { task: Task }) {
  return (
    <>
      <div className="flex gap-2 items-center mt-4">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
        <Text variant="muted">Заказчик: {task.customer.name}</Text>
      </div>
      <Text className="mt-3 line-clamp-3">{task.description}</Text>
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags.map((tag) => <TaskTag value={tag} />);
}

function Footer({ task }: { task: Task }) {
  return (
    <>
      <Button variant="outline" size="sm" className="md:flex-initial flex-1">
        <ClipboardCheck />
        Взять
      </Button>
      <Button asChild size="sm">
        <Link href={`/tasks/${task.id}`}>
          Подробнее
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </>
  );
}

export function TaskCard({ task }: { task: Task }) {
  return (
    <CardWrapper
      title={task.title}
      badges={<Badges task={task} />}
      content={<Content task={task} />}
      tags={<Tags task={task} />}
      footer={<Footer task={task} />}
    />
  );
}
