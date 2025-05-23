import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { DataTable } from "@/shared/ui/DataTable";
import { columns } from "./columns";
import { useContext } from "react";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";

export function VacanciesTable({
  vacancies,
  handleSearch,
}: {
  vacancies: ServerPaginatedData<ExtendedVacancy>;
  handleSearch: (route: string, value: string) => void;
}) {
  const { filters } = useContext(VacanciesFiltersContext);

  return (
    <DataTable
      data={vacancies}
      rowRoute="/admin/vacancies"
      columns={columns}
      search={filters.search ?? ""}
      onSearch={(value) => handleSearch("/admin/vacancies", value)}
    />
  );
}
