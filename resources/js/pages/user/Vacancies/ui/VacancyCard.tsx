import { EntityCard } from "@/shared/ui/EntityCard";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { project } from "@/shared/mocks";
import { ExpandableText } from "@/shared/ui/ExpandableText";

export function VacancyCard({ vacancy }: { vacancy: ExtendedVacancy }) {
  return (
    <EntityCard
      title={vacancy.name}
      subtitle={vacancy.project.name}
      content={<ExpandableText text={vacancy.description} />}
      href={`/projects/${project.id}`}
    />
  );
}
