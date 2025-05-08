import { Link } from "@inertiajs/react";
import { ArrowRight, UserPlus } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { Task, TaskTagBadge } from "@/entities/Task";

function Tags({ task }: { task: Task }) {
  return task.tags.map((tag) => <TaskTagBadge tag={tag} />);
}

function Footer({ vacancy }: { vacancy: ExtendedVacancy }) {
  const { user } = useAuth();

  return (
    <>
      {vacancy.project.isHiring && user && (
        <Button variant="outline" size="sm" className="flex-1">
          <UserPlus />
          Вступить
        </Button>
      )}
      <Button asChild size="sm" className="flex-1">
        <Link href={`/projects/${vacancy.project.id}`}>
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
      tags={<Tags task={vacancy.task} />}
      footer={<Footer vacancy={vacancy} />}
    />
  );
}
