import { Text } from "@/shared/ui/Text";
import { Link } from "@inertiajs/react";
import { UsersIcon, FolderIcon, ArrowRight } from "lucide-react";
import { CardWrapper } from "@/features/CardWrapper";
import { Vacancy } from "@/shared/types/Vacancy";
import { Button } from "@/shared/ui/Button";

export function VacancyCard({ vacancy }: { vacancy: Vacancy }) {
  return (
    <CardWrapper
      title={vacancy.vacancyTitle}
      content={
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FolderIcon className="h-4 w-4 text-muted-foreground" />
              <Text variant="muted">
                <span className="font-semibold">Задача:</span>{" "}
                {vacancy.taskTitle}
              </Text>
            </div>
            <div className="flex items-center gap-2">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <Text variant="muted">
                <span className="font-semibold">Проектная команда:</span>{" "}
                {vacancy.projectTeam}
              </Text>
            </div>
          </div>
        </div>
      }
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            className="md:flex-initial flex-1"
          >
            Вступить в команду
          </Button>
          <Button asChild size="sm">
            <Link
              href={`/projects/${vacancy.projectId}`}
              className="flex items-center justify-center gap-1 md:flex-initial flex-1"
            >
              Подробнее
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </>
      }
    />
  );
}
