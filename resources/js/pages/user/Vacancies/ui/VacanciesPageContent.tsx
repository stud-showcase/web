import { SearchBar } from "@/features/SearchBar";
import { mockVacancies } from "../mocks";
import { VacancyCard } from "./VacancyCard";

export function VacanciesPageContent() {
  return (
    <>
      <SearchBar />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockVacancies.map((vacancy) => (
          <VacancyCard vacancy={vacancy} />
        ))}
      </div>
    </>
  );
}
