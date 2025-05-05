import { SearchBar } from "@/shared/ui/SearchBar";
import { VacancyCard } from "./VacancyCard";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { useContext } from "react";
import { sendVacanciesFilters } from "../util/sendVacanciesFilters";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";
import { DataPagination } from "@/shared/ui/DataPagination";

export function VacanciesPageContent({
  vacancies,
}: {
  vacancies: ServerPaginatedData<ExtendedVacancy>;
}) {
  const { filters, setFilters } = useContext(VacanciesFiltersContext);

  const handleSearch = () => {
    sendVacanciesFilters(filters);
  };

  const handleChange = (value: string) => {
    setFilters({ ...filters, search: value });
  };

  console.log(vacancies)

  return (
    <>
      <SearchBar
        value={filters.search}
        onChange={handleChange}
        onSearch={handleSearch}
      />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {vacancies.data.map((vacancy) => (
          <VacancyCard vacancy={vacancy} key={vacancy.id} />
        ))}
      </div>
      <DataPagination paginatedData={vacancies} className="mt-6" />
    </>
  );
}
