import { EntityCard } from "@/shared/ui/EntityCard";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { ExpandableText } from "@/shared/ui/ExpandableText";

export function VacancyCard({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <EntityCard
      title={vacancy.name}
      subtitle={vacancy.project.name}
      content={<ExpandableText text={vacancy.description} />}
      href={`/projects/${vacancy.project.id}`}
    />
  );
}
