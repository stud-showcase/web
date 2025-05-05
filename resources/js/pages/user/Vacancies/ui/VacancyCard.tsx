import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { ArrowRight, FolderIcon, UserPlus, Users } from "lucide-react";
import { EntityCard } from "@/shared/ui/EntityCard";
import { Button } from "@/shared/ui/Button";
import { useAuth } from "@/shared/hooks/useAuth";
import { ExtendedVacancy } from "../model/ExtendedVacancy";

function Content({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="flex items-center gap-2">
        <FolderIcon className="h-3 w-3 text-muted-foreground" />
        <Text variant="muted">Задача: {vacancy.taskTitle}</Text>
      </div>
      <div className="flex items-center gap-2">
        <Users className="w-3 h-3 text-muted-foreground" />
        <Text variant="muted">Проект: {vacancy.project.name}</Text>
      </div>
    </div>
  );
}

function Footer({ vacancy }: { vacancy: ExtendedVacancy }) {
  const { user } = useAuth();

  return (
    <>
      {/* TODO: vacancy.project.isHiring  */}
      {true && user && (
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
      content={<Content vacancy={vacancy} />}
      footer={<Footer vacancy={vacancy} />}
    />
  );
}
