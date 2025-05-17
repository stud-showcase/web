import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { VacanciesPageContent } from "./VacanciesPageContent";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { VacanciesFilters } from "../model/VacanciesFilters";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";
import { useState } from "react";
import { defaultVacanciesFilters } from "../consts/defaultVacanciesFilters";

type Props = {
  filters: VacanciesFilters;
  vacancies: ServerPaginatedData<ExtendedVacancy>;
};

export default function VacanciesPage(props: Props) {
  const { vacancies, filters: appliedFilters } = props;

  const [filters, setFilters] = useState<VacanciesFilters>({
    ...defaultVacanciesFilters,
    ...appliedFilters,
  });

  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <UserLayout>
        <VacanciesFiltersContext.Provider value={{ filters, setFilters }}>
          <FiltersItemsLayout
            heading="Вакансии"
            contentSlot={<VacanciesPageContent vacancies={vacancies} />}
          />
        </VacanciesFiltersContext.Provider>
      </UserLayout>
    </>
  );
}
