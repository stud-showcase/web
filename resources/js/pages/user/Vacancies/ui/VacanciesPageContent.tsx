import { SearchBar } from "@/shared/components/SearchBar";
import { VacancyCard } from "@/entities/Vacancy";
import { FullVacancy } from "../types/FullVacancy";

export function VacanciesPageContent({
  vacancies,
}: {
  vacancies: FullVacancy[];
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
