import { SearchBar } from "@/features/SearchBar";
import { mockVacancies } from "../mocks";
import { VacancyCard } from "./VacancyCard";

export function VacanciesPageContent() {
  return (
    <>
      <SearchBar />
      <div className="mt-6 space-y-6">
        {mockVacancies.map((vacancy) => (
          <VacancyCard vacancy={vacancy} />
        ))}
      </div>
    </>
  );
}
