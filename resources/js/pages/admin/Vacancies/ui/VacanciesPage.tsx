import { AdminLayout } from "@/layouts/AdminLayout";
import { Heading } from "@/shared/ui/Heading";
import { Head } from "@inertiajs/react";
import { VacanciesTable } from "./VacanciesTable";
import { ServerPaginatedData } from "@/shared/types/ServerPaginatedData";
import { ExtendedVacancy } from "../model/ExtendedVacancy";

type Props = {
  vacancies: ServerPaginatedData<ExtendedVacancy>;
  filters: any;
  availableFilters: any;
};

export default function VacanciesPage(props: Props) {
  const { vacancies, availableFilters, filters: appliedFilters } = props;
  console.log(vacancies);

  return (
    <>
      <Head>
        <title>Вакансии</title>
      </Head>
      <AdminLayout>
        <Heading level={1}>Вакансии</Heading>
        <VacanciesTable vacancies={vacancies} />
      </AdminLayout>
    </>
  );
}
