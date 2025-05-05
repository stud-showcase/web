import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { FiltersItemsLayout } from "@/layouts/FiltersItemsLayout";
import { VacanciesPageFilterPanel } from "./VacanciesPageFilterPanel";
import { VacanciesPageContent } from "./VacanciesPageContent";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { VacanciesFilters } from "../model/VacanciesFilters";
import { TaskTag } from "@/entities/Task";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";
import { useState } from "react";
import { defaultVacanciesFilters } from "../consts/defaultVacanciesFilters";

type Props = {
  availableFilters: {
    tags: TaskTag[];
  };
  filters: VacanciesFilters;
  vacancies: ServerPaginatedData<ExtendedVacancy>;
};

export default function VacanciesPage(props: Props) {
  const { vacancies, availableFilters, filters: appliedFilters } = props;

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
            filtersSlot={<VacanciesPageFilterPanel tags={availableFilters.tags} />}
          />
        </VacanciesFiltersContext.Provider>
      </UserLayout>
    </>
  );
}
