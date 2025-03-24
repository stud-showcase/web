import { CardWrapper } from "@/features/CardWrapper";
import { AuthContext } from "@/shared/state";
import { Badge } from "@/shared/ui/Badge";
import { Button } from "@/shared/ui/Button";
import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { useContext } from "react";
import { Task } from "@/shared/types/Task";
import { ComplexityBadge } from "@/features/ComplexityBadge";

function Badges({ task }: { task: Task }) {
  return (
    <>
      <Badge variant="outline" className="flex items-center gap-1">
        <Users className="w-4 h-4" />
        {task.max_members} {task.max_members === 1 ? "участник" : "участника"}
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
      <Text variant="muted" className="flex gap-1 mt-4">
        <span className="font-medium">Заказчик:</span>
        {task.customer.name}
      </Text>
      <Text className="mt-4 line-clamp-3">{task.description}</Text>
    </>
  );
}

function Tags({ task }: { task: Task }) {
  return task.tags.map((tag) => (
    <Badge key={tag} variant="outline">
      {tag}
    </Badge>
  ));
}

function Footer({ task }: { task: Task }) {
  const isLoggedIn = useContext(AuthContext);

  return (
    <>
      {isLoggedIn && (
        <Button variant="outline" size="sm" className="md:flex-initial flex-1">
          Взять задачу
        </Button>
      )}
      <Button asChild size="sm">
        <Link
          href={`/tasks/${task.id}`}
          className="flex items-center justify-center gap-1 md:flex-initial flex-1"
        >
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
