import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { VacanciesTable } from "./VacanciesTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { useFilters } from "@/shared/hooks/useFilters";
import { VacanciesFilters } from "../model/VacanciesFilters";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";

type Props = {
  vacancies: ServerPaginatedData<ExtendedVacancy>;
  filters: VacanciesFilters;
};

const defaultVacanciesFilters: VacanciesFilters = {
  search: undefined,
};

export default function VacanciesPage(props: Props) {
  const { vacancies, filters: appliedFilters } = props;

  const { filters, setFilters, handleSearch } = useFilters<VacanciesFilters>(
    defaultVacanciesFilters,
    appliedFilters
  );

  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Вакансии</Heading>
        <VacanciesFiltersContext.Provider value={{ filters, setFilters }}>
          <VacanciesTable vacancies={vacancies} handleSearch={handleSearch} />
        </VacanciesFiltersContext.Provider>
      </AdminLayout>
    </>
  );
}
