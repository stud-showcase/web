import { EntityCard } from "@/shared/ui/EntityCard";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { project } from "@/shared/mocks";
import { Button } from "@/shared/ui/Button";
import {
  UserPlus
} from "lucide-react";
import { ExpandableText } from "@/shared/ui/ExpandableText";

// TODO: сделать везде адаптив для тэгов и статусов
// TODO: сделать отправку заявки с вакансией
export function VacancyCard({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <EntityCard
      title={vacancy.name}
      subtitle={vacancy.project.name}
      content={<ExpandableText text={vacancy.description} />}
      footer={
        <Button variant={"outline"} size="sm">
          <UserPlus />
          Подать заявку
        </Button>
      }
      href={`/projects/${project.id}`}
    />
  );
}
