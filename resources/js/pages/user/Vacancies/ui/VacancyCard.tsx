import { Link } from "@inertiajs/react";
import { ArrowRight, UserPlus } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { Task, TaskTagBadge } from "@/entities/Task";
import { Text } from "@/shared/ui/Text";
import { useAuth } from "@/shared/hooks/useAuth";

function Tags({ task }: { task: Task }) {
  return task.tags?.map((tag) => <TaskTagBadge tag={tag} key={tag.id} />);
}

function Content({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <Text variant="small" className="line-clamp-1">
      {vacancy.description}
    </Text>
  );
}

function Footer({ vacancy }: { vacancy: ExtendedVacancy }) {
  const { user } = useAuth();

  return (
    <>
      {user && vacancy.canJoin && (
        <Button variant="outline" size="sm" className="flex-1">
          <UserPlus />
          Вступить
        </Button>
      )}
      <Button asChild size="sm">
        <Link href={`/projects/${vacancy.project.id}`} className="flex-1">
          Подробнее
          <ArrowRight />
        </Link>
      </Button>
    </>
  );
}

export function VacancyCard({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <EntityCard
      title={vacancy.name}
      subtitle={vacancy.project.name}
      content={<Content vacancy={vacancy} />}
      tags={<Tags task={vacancy.task} />}
      footer={<Footer vacancy={vacancy} />}
    />
  );
}
