import { SearchBar } from "@/shared/ui/SearchBar";
import { VacancyCard } from "./VacancyCard";
import { ExtendedVacancy } from "../model/ExtendedVacancy";

export function VacanciesPageContent({
  vacancies,
}: {
  vacancies: ExtendedVacancy[];
}) {
  return (
    <>
      <SearchBar />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.map(({ vacancy, project, task }) => (
          <VacancyCard vacancy={vacancy} project={project} task={task} />
        ))}
      </div>
    </>
  );
}
