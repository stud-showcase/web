import { UserLayout } from "@/layouts/UserLayout";
import { Head } from "@inertiajs/react";
import { VacanciesPageContent } from "./VacanciesPageContent";
import { ExtendedVacancy } from "../model/ExtendedVacancy";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { VacanciesFilters } from "../model/VacanciesFilters";
import { VacanciesFiltersContext } from "../context/VacanciesFiltersContext";
import { useState } from "react";
import { defaultVacanciesFilters } from "../consts/defaultVacanciesFilters";
import { Container } from "@/shared/ui/Container";
import { Heading } from "@/shared/ui/Heading";

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
          <Container withVerticalPaddings>
            <Heading level={1}>Вакансии</Heading>
            <VacanciesPageContent vacancies={vacancies} />
          </Container>
        </VacanciesFiltersContext.Provider>
      </UserLayout>
    </>
  );
}
